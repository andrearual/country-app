import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../../Interfaces/country.Interfaces';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: [
    ` img {
      width :25px
      } `
  ]
})
export class CountryTableComponent {

  @Input()
  public countries: Country[] =[];

}
