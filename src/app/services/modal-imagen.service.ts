import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal = true;
  public tipo;
  public img;
  public id;
  // Esto es usado para al actualizar una imagen de usuario-hospital-medico, se haga un retardo y renderice con los datos nuevos
  public avisoNuevaImagen: EventEmitter<string> = new EventEmitter();

  get ocultarModal(): boolean {
    return this._ocultarModal;
  }

  constructor() { }

  mostrarModal( tipo: 'usuarios' | 'hospitales' | 'medicos', id: string, img = 'noImg' ): void {
    this._ocultarModal = false;
    this.id = id;
    this.tipo = tipo;

    if ( img.includes('https') ) {
      this.img = img;
    } else {
      // localhost:3000/api/upload/usuarios/f16a4418-544d-40c8-b5d0-57d0201dd8c6.jpg
      this.img = `${ base_url }/upload/${ tipo }/${ img }`;
    }
  }

  cerrarModal(): void {
    this._ocultarModal = true;
  }
}
