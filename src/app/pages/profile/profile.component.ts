import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public usuario: Usuario;
  public perfilForm: FormGroup;
  public formSubmitted = false;
  public btnClass: string;
  public imagenSubir: File;
  public imgTemp: any;

  constructor( private fb: FormBuilder, private usuarioService: UsuarioService, private fileuploadService: FileUploadService ) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required],
      email: [ this.usuario.email, [ Validators.required, Validators.email ] ]
    });
  }

  actualizarUsuario(): void {
    this.formSubmitted = true;

    if ( this.perfilForm.invalid ) {
      return;
    }

    this.usuarioService.actualizarDatosUsuario( this.perfilForm.value )
    .subscribe( ( resp: Usuario ) => {
      // Aquí la actualización fue exitosa:
      // Extraigo los datos del formulario y los asigno a mi modelo de usuario y como estos son objetos y en JS se
      // pasan por referencia, cuando esto se lleve a cabo, se mostrará en el header y el sidebar los datos nuevos
      const { nombre, email } = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;

      Swal.fire('Actualizado', 'Usuario actualizado con éxito', 'success');
    }, err => {
      Swal.fire('Error', err.error.message, 'error' );
    });

  }

  addClassBtn(): string {

    if ( this.perfilForm.valid || !this.formSubmitted) {
      this.btnClass = 'btn-success';
    } else if ( this.perfilForm.invalid && this.formSubmitted ) {
      this.btnClass = 'btn-warning';
    }

    return this.btnClass;
  }

  // Este método ayuda con la vista previa de la imagen que el usuario quiere asignar
  cambiarImagen( archivo: File ): void {
    this.imagenSubir = archivo;

    if ( !archivo ) {
      return this.imagenSubir = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( archivo );
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };

  }

  subirImagen(): void {
    this.fileuploadService.actualizarImagen( this.imagenSubir, 'usuarios', this.usuario.uid )
      .then( resp => {
        this.usuario.img = resp;
        Swal.fire('Actualizado', `Imagen actualizada con éxito`, 'success');
      })
      .catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }

}
