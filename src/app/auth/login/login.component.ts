import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { FormBuilder, Validators } from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service';

// Declaro esta variable ya que la función de la misma proviene de un script(en el index) y de antemano angular la desonoce
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls : ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [ false ]
  });

  constructor( private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService, private ngZone: NgZone ) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login(): void {

    this.formSubmitted = true;

    if ( this.loginForm.invalid ) {
      return;
    }

    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {
        if ( this.loginForm.get('remember').value ) {
          localStorage.setItem('email', this.loginForm.get('email').value );
        } else {
          localStorage.removeItem('email');
        }

        // Navegar al dashboard
        this.router.navigateByUrl('/');

      }, err => Swal.fire('Error en el Login', err.error.message, 'error') );
  }

  validarCampo( campo: string ): boolean {

    if ( this.loginForm.get( campo ).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  renderButton(): void {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });

    this.startApp();
  }

  startApp(): void {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '642990330516-e39l40mjn2ie0j0oomknfovf2k265smu.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  }

  attachSignin(element): void {
  this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.usuarioService.loginGoogle( id_token ).subscribe( resp => {

          this.ngZone.run( () => {
            // Navegar al dashboard
            this.router.navigateByUrl('/');
          });

        });
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
