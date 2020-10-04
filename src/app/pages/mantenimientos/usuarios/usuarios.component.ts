import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { UsuarioService } from 'src/app/services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';

import { Usuario } from '../../../models/usuario.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  // Variables que devuelve el endpoint
  public total = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  // Para la paginación
  public desde = 0;
  public cargando = true;
  // Variable bandera para saber si se elimino desde la tabla paginado o del listado resultado como búsqueda por el input
  public buscando = false;
  // Búsqueda por input o campo de texto
  public termino = '';
  // Variable usada para evitar la fuga de memoria
  public imgSubs: Subscription;

  constructor( private usuarioService: UsuarioService, private busquedasService: BusquedasService,
               public modalImagenService: ModalImagenService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.avisoNuevaImagen
      .pipe(
        // Retardo necesario para que renderice con los datos actualizados (nuevos datos)
        delay(100)
      )
      .subscribe( resp => {
      this.cargarUsuarios();
    });
  }

  cargarUsuarios(): void {
    this.cargando = true;

    this.usuarioService.getUsuarios( this.desde )
      .subscribe( ({ total, usuarios}) => {
        this.total = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
        this.buscando = false;
      });
  }

  abrirModal( usuario: Usuario ): void {
    const id = usuario.uid;
    const img = usuario.img;
    this.modalImagenService.mostrarModal( 'usuarios', id, img );
  }

  cambiarPagina( valor: number ): void {

    this.desde += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.total ) {
      this.desde -= valor;
    }

    this.cargarUsuarios();

  }

  buscar( busqueda: string ): Usuario[] {

    this.termino = busqueda;

    if ( busqueda.length === 0 ) {
      return;
    }

    this.ejecutarBusqueda();

  }

  ejecutarBusqueda(): void {
    this.busquedasService.buscar( 'usuarios', this.termino )
      .subscribe( resp => {
        // Buscando por input o campo de texto
        this.buscando = true;
        this.usuarios = resp;
      });
  }

  borrarUsuario( usuario: Usuario ): void | Promise<SweetAlertResult<unknown>> {

    if ( usuario.uid === this.usuarioService.uid ) {
      return Swal.fire('Error', 'No te puedes eliminar a ti mismo', 'error');
    }

    Swal.fire({
      title: 'Eliminando usuario',
      text: `Estás a punto de eliminar a ${ usuario.nombre }`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, continuar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuario( usuario )
          .subscribe( () => {
            // Si la eliminación se hizo de la búsqueda del input q actualice este listado y si no q muestre result de paginación
            if ( this.buscando ) {
              this.total -= 1;
              this.ejecutarBusqueda();
            } else {
              this.cargarUsuarios();
            }
            Swal.fire('Eliminado', `Eliminaste a: ${ usuario.nombre }`, 'success');
          });
      }
    });
  }

  cambiarRole( usuario: Usuario ): void {
    this.usuarioService.actualizarRoleUsuario( usuario )
      .subscribe( resp => {
      });
  }

}
