import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Hospital } from '../models/hospital.model';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  constructor( private http: HttpClient ) { }

  getHospitales() {

    const url = `${ base_url }/hospitales`;
    return this.http.get( url, this.headers )
      .pipe(
        map( (resp: { ok: boolean, hospitales: Hospital[] }) => {
          return resp.hospitales;
        })
      );
  }
}
