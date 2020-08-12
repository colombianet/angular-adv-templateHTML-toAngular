import { Component, OnInit, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input() titulo = 'Sin título';
  @Input('labels') doughnutChartLabels: Label[] = ['Label1', 'Label2', 'Label3'];
  @Input('data') doughnutChartData: MultiDataSet = [ [350, 450, 100] ];

  public colors: Color[] = [
    { backgroundColor: ['green', 'blue', 'purple']}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
