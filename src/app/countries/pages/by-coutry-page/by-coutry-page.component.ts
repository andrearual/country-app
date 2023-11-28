import { Country } from '../../Interfaces/country.Interfaces';
import { CountriesService } from './../../services/countries.service';
import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-by-coutry-page',
  templateUrl: './by-coutry-page.component.html',
  styles: [
  ]
})
export class ByCoutryPageComponent implements OnInit {

  public countries: Country[] = [];
  public inicialvalues :string ='';

  constructor(private countriesService : CountriesService) { }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.inicialvalues = this.countriesService.cacheStore.byCountries.term;
  }


  searchCountry (term: string) : void {
    this.countriesService.searchCountry(term)
    .subscribe( countries =>
    // si no se subcribe el servicio, nunca se van a recibir notificaciones
    // por ejemplo si uno no se subcribe a un canal X de YouTube, nunca nos llegaran las notificaciones
    // no retorna valores
      this.countries = countries
    );
  }

}
