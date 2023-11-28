import { Country } from '../../Interfaces/country.Interfaces';
import { CountriesService } from './../../services/countries.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit{

  public countries :  Country []  = [];
  public isLoading:   boolean     = false;
  public inicialValue:string      = '';

  constructor(private countriesService: CountriesService){  }


  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.inicialValue =this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital(term : string) : void {
    this.isLoading = true;
    // si no se subcribe el servicio, nunca se van a recibir notificaciones
    // por ejemplo si uno no se subcribe a un canal X de YouTube, nunca no sllegaran las notificaciones
    this.countriesService.searchCapital( term )
      .subscribe(countrie => {
        this.countries = countrie;
        this.isLoading = false;
      });
    // console.log('desde ByCapitalPage');
    // console.log({ term });
  }

}
