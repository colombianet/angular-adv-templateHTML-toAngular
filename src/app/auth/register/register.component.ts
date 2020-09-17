import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['', Validators.required ],
    email: ['', [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    password2: ['', Validators.required ],
    terminos: [false]
  }, { validators: this.passwordsIguales( 'password', 'password2' ) } );

  constructor( private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router ) { }

  ngOnInit(): void {
  }

  crearUsuario(): void {

    this.formSubmitted = true;
    console.log(this.registerForm);

    if ( this.registerForm.invalid ) {
      return;
    }

    // Hacer el posteo
    this.usuarioService.crearUsuario( this.registerForm.value )
                        .subscribe( resp => {
                          // Navegar al dashboard
                          this.router.navigateByUrl('/');
                        }, err => Swal.fire('Error al crear usuario', err.error.message, 'error')
                        );

  }

  validarCampo( campo: string ): boolean {

    if ( this.registerForm.get( campo ).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  contrasenasNoValidas(): boolean {
    const pass1 = this.registerForm.get('password');
    const pass2 = this.registerForm.get('password2');

    let invalid: boolean;
    if ( ( pass1.invalid || pass2.invalid ) || ( pass1.value !== pass2.value) ) {
      invalid = true;
    }


    if ( invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  aceptarterminos( campo: string ): boolean {

    return ( !this.registerForm.get( campo ).value ) && this.formSubmitted;
  }

  passwordsIguales( pass1Name: string, pass2Name: string ) {
    return ( formGroup: FormGroup ) => {

      const controlPass1 = formGroup.get(pass1Name);
      const controlPass2 = formGroup.get(pass2Name);

      if ( controlPass1.value === controlPass2.value ) {
        controlPass2.setErrors( null );
      } else {
        controlPass2.setErrors( { noEsIgual: true } );
      }

    };
  }

}
