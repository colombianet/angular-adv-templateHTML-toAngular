import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Router } from '@angular/router';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor( private http: HttpClient, private router: Router, private ngZone: NgZone ) {
    this.googleInit();
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
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      // Esto regresa observable:
      // 1.- Guardo en LS
      // 2.- transformo en boolean para q el guard haga su trabajo
      // 3.- En caso q haya error, lo atrapo, devolviendo un observable q resuelva false y el guard impida acceso
        tap( (resp: any) => {
          localStorage.setItem( 'token', resp.token );
        }),
        map( resp => true ),
        catchError( error => of(false))
      );
  }

  crearUsuario( registerForm: RegisterForm ): Observable<object> {
    return this.http.post( `${ base_url }/usuarios`, registerForm );
  }

  login( loginForm: LoginForm ): Observable<object> {
    return this.http.post( `${ base_url }/login`, loginForm )
      .pipe( tap( (resp: { ok: boolean, token: string }) => {
        localStorage.setItem('token', resp.token);
      }));
  }

  loginGoogle( token ): Observable<object> {
    return this.http.post( `${ base_url }/login/google`, { token } )
      .pipe( tap( (resp: any) => {
        localStorage.setItem('token', resp.token);
      }));
  }
}
