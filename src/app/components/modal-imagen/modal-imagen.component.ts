import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any;

  constructor( private modalImagenService: ModalImagenService, private fileuploadService: FileUploadService ) { }

  ngOnInit(): void {
  }

  cerrarModal(): void {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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
  // El servicio tiene los datos del médico, usuario u hospital a actualizar
  const id = this.modalImagenService.id;
  const tipo = this.modalImagenService.tipo;

  this.fileuploadService.actualizarImagen( this.imagenSubir, tipo, id )
    .then( resp => {
      Swal.fire('Actualizado', `Imagen actualizada con éxito`, 'success');

      // Esta emisión es para q al actualizar la img, haga un retardo y muestre la página con los datos actualizados
      this.modalImagenService.avisoNuevaImagen.emit(resp);
      this.cerrarModal();
    })
    .catch( err => {
      console.log(err);
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    });
}

}
