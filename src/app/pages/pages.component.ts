import { Component, OnInit } from '@angular/core';
import { AccountsServicesService } from '../services/accounts-services.service';

declare function chargeThemePages(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  year = new Date().getFullYear();

  constructor( private accountsServicesService: AccountsServicesService ) { }

  ngOnInit(): void {
    chargeThemePages();
  }

}
