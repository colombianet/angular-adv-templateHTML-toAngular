import { Component, OnInit } from '@angular/core';

import { HospitalService } from '../../../services/hospital.service';

import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];

  constructor( private hospitalService: HospitalService ) { }

  ngOnInit(): void {
    this.hospitalService.getHospitales()
      .subscribe( resp => {
        this.hospitales = resp;
      });
  }

}
