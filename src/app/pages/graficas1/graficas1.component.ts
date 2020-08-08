import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: [
  ]
})
export class Graficas1Component implements OnInit {

  public labels1 = ['Pan', 'Refresco', 'Tacos'];
  public data = [
    [10, 29, 49]
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
