import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string = '', tipo: 'usuarios' | 'medicos' | 'hospitales' ): string {
    if ( img ) {
        return `${ base_url }/upload/${ tipo }/no-image`;
    } else if ( img.includes('https') ) {
        // Si la imagen es de google
        return img;
    } else if ( img ) {
        // Muestra la que le haya asignado el usuario o una por defecto
        return `${ base_url }/upload/${ tipo }/${ img }`;
    } else {
        return `${ base_url }/upload/usuarios/no-image`;
    }
  }

}
