import { environment } from '../../environments/environment';
const base_url = environment.base_url;

export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public google?: boolean,
        public role?: string,
        public img?: string,
        public uid?: string
    ) {}

    get imagenUrl(): string {

        if ( !this.img ) {
            return `${ base_url }/upload/usuarios/no-image`;
        } else if ( this.img.includes('https') ) {
            // Si la imagen es de google
            return this.img;
        } else if ( this.img ) {
            // Muestra la que le haya asignado el usuario o una por defecto
            return `${ base_url }/upload/usuarios/${ this.img }`;
        } else {
            return `${ base_url }/upload/usuarios/no-image`;
        }

    }

    get getNombre(): string {
        return this.nombre;
    }
}
