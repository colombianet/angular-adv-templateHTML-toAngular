import { Component, OnInit } from '@angular/core';
import { AccountsServicesService } from '../../services/accounts-services.service';

@Component({
  selector: 'app-accounts-settings',
  templateUrl: './accounts-settings.component.html',
  styles: [
  ]
})
export class AccountsSettingsComponent implements OnInit {

  public selectors: NodeListOf<Element>;

  constructor( private accountsServicesService: AccountsServicesService ) { }

  ngOnInit(): void {
    this.accountsServicesService.setCheck();
  }

  changeTheme( theme: string ): void {
    this.accountsServicesService.changeTheme( theme );
  }

}
