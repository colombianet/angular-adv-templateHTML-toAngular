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

        // Si la imagen es de google
        if ( this.img.includes('https') ) {
            return this.img;
        }

        // Muestra la que le haya asignado el usuario o una por defecto
        if ( this.img ) {
            return `${ base_url }/upload/usuarios/${ this.img }`;
        } else {
            return `${ base_url }/upload/usuarios/no-image`;
        }

    }

    get getNombre(): string {
        return this.nombre;
    }
}
