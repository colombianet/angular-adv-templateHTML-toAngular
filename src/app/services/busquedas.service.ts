import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient ) { }

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

  // Toma 1 array y por cada elemento del mismo, lo transformo en una instancia de mi modelo de usuarios para poder ver la foto
  private transformarUsuarios( resultados: any[] ): Usuario[] {
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.google, user.role, user.img, user.uid)
      );
  }

  buscar( tipo: 'usuarios' | 'medicos' | 'hospitales', busqueda: string ): any {

    const url = `${ base_url}/todo/coleccion/${ tipo }/${ busqueda}`;
    return this.http.get<any[]>( url, this.headers)
      .pipe(
        map( (resp: any) => {
          switch ( tipo ) {

            case 'usuarios':
              return this.transformarUsuarios( resp.resultados );

            default:
              return [];

        }
      })

    );
  }

}
