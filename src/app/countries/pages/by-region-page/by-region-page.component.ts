import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../Interfaces/country.Interfaces';
import { Region } from '../../Interfaces/region.type';

//type Region = 'Africa'|'America'|'Asia'|'Europe'|'Oceania'; // se puede usar type cuendo son valore fijos, no se expanden

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit{

  public countries : Country[] = [];
  public regions: Region[] = ['Africa','America','Asia','Europe','Oceania'];
  public selectedRegion?: Region;
  //public inicialValue: Region = '';

  constructor(private countriesService: CountriesService) { }
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchRegion (region : Region): void {

    this.selectedRegion = region;

    this.countriesService.searchRegion(region)
      .subscribe ( countries =>
        // si no se subcribe el servicio, nunca se van a recibir notificaciones
        // por ejemplo si uno no se subcribe a un canal X de YouTube, nunca nos llegaran las notificaciones
        // no retorna valores
        this.countries = countries)
  }
}
