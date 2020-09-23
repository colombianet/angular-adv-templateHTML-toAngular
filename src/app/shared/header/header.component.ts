import { Component, OnInit } from '@angular/core';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public imgUrl = '';
  public usuario: Usuario;

  constructor( private usuarioService: UsuarioService ) {
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
  }

  logout(): void {
    this.usuarioService.logout();
  }

}
