import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @Input() progreso = 50;
  @Input() btnClass = 'btn-primary';

  @Output() enviarValor: EventEmitter<number> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  cambiarProgreso( valor: number ): void | number {
    if ( this.progreso >= 100 && valor > 0 ) {
      this.enviarValor.emit(100);
      return this.progreso = 100;
    }

    if ( this.progreso <= 0 && valor < 0 ) {
      this.enviarValor.emit(0);
      return this.progreso = 0;
    }

    this.progreso += valor;
    this.enviarValor.emit( this.progreso );
  }

  onChange( valor: number ): void {
    if ( valor >= 100 ) {
      this.progreso = 100;
    } else if ( valor <= 0 ){
      this.progreso = 0;
    } else {
      this.progreso = valor;
    }

    this.enviarValor.emit( this.progreso );
  }

}
