import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { GetUsuarios } from '../interfaces/get-usuarios.interface';

import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor( private http: HttpClient, private router: Router, private ngZone: NgZone ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(): object {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  googleInit(): void {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '642990330516-e39l40mjn2ie0j0oomknfovf2k265smu.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      });
    });
  }

  logout(): void {
    localStorage.removeItem('token');

    this.auth2 = gapi.auth2.getAuthInstance();
    this.auth2.signOut().then( () => {
      // Como esto se hace con librería de tercero(en este caso google), angular pierde el control por un momento
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renew`, this.headers )
      .pipe(
      // Esto regresa observable, hay usuarios q no tienen imagen => a esos asigno '' por validacion en modelo ('imagenurl')
      // 1.- Guardo en LS
      // 2.- transformo en boolean para q el guard haga su trabajo
      // 3.- En caso q haya error, lo atrapo, devolviendo un observable q resuelva false y el guard impida acceso
        map( (resp: any) => {
          const { email, google, img = '', nombre, role, uid } = resp.usuario;
          this.usuario = new Usuario( nombre, email, '', google, role, img, uid );

          localStorage.setItem( 'token', resp.token );
          return true;
        }),
        catchError( error => of(false))
      );
  }

  crearUsuario( registerForm: RegisterForm ): Observable<object> {
    return this.http.post( `${ base_url }/usuarios`, registerForm );
  }

  getUsuarios( desde: number ): Observable<GetUsuarios> {
    const url = `${ base_url }/usuarios?desde=${ desde }`;
    return this.http.get<GetUsuarios>( url, this.headers)
      .pipe(
        map( resp => {

          const usuarios = resp.usuarios.map(
            user => new Usuario(user.nombre, user.email, '', user.google, user.role, user.img, user.uid)
          );

          return {
            total: resp.total,
            usuarios
          };

        })
      );
  }

  actualizarDatosUsuario( data: { nombre: string, email: string, role: string } ): Observable<object>{

    data = {
      ...data,
      role : this.usuario.role
    };

    return this.http.put( `${ base_url }/usuarios/${ this.uid }`, data, this.headers );

  }

  deleteUsuario( usuario: Usuario ): Observable<object> {
    const url = `${ base_url }/usuarios/${ usuario.uid }`;
    return this.http.delete( url, this.headers );
  }

  login( loginForm: LoginForm ): Observable<object> {

    return this.http.post( `${ base_url }/login`, loginForm )
      .pipe(
        tap( (resp: { ok: boolean, token: string }) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  loginGoogle( token ): Observable<object> {

    return this.http.post( `${ base_url }/login/google`, { token } )
      .pipe( tap( (resp: any) => {
        localStorage.setItem('token', resp.token);
      }));

  }

  actualizarRoleUsuario( usuario: Usuario ): Observable<object>{

    return this.http.put( `${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers );

  }

}
