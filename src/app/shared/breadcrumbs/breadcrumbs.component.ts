import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, Data } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string;
  public tituloSub$: Subscription;

  constructor( private router: Router ) {
    this.tituloSub$ = this.setTitle()
          .subscribe( data => {
            this.titulo = data.titulo;
            document.title = `AdminPro - ${ this.titulo }`;
          });
  }

  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe();
  }

  setTitle(): Observable<Data> {
    return this.router.events
      .pipe(
        filter( evento => evento instanceof ActivationEnd ),
        filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null),
        map( (evento: ActivationEnd) => evento.snapshot.data ) );
  }

}
