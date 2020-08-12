import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountsServicesService {

  private linkTheme = document.querySelector('#theme');


  constructor() {
    const url = localStorage.getItem('theme') || `assets/css/colors/purple-dark.css`;
    this.linkTheme.setAttribute('href', url);
  }

  changeTheme( theme: string ): void {
    const url = `assets/css/colors/${ theme }.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.setCheck();
  }

  setCheck(): void {
    const selectors = document.querySelectorAll('.selector');

    selectors.forEach( elem => {
      elem.classList.remove('working');
      const theme = this.linkTheme.getAttribute('data-theme');
      const urlTheme = `assets/css/colors/${ theme }.css`;
      const currentTheme = this.linkTheme.getAttribute('href');
      if ( urlTheme === currentTheme ) {
        elem.classList.add('working');
      }
    });
  }
}
