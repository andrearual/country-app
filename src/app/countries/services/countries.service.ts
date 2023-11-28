import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { Country } from '../Interfaces/country.Interfaces';
import { CacheStore } from '../Interfaces/cache-store-interfaces';
import { Region } from '../Interfaces/region.type';

@Injectable({providedIn: 'root'})
// si el servicio esta en el root, (es de forma global) todo el mundo lo puede acceder,
//pero se puede definir scope
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital:   { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion:    { region: '', countries: [] },
  }

  constructor(private http: HttpClient) {
    this.loadToLocalStorage();
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore',JSON.stringify(this.cacheStore));
  }

  private loadToLocalStorage () {
    if ( !localStorage.getItem('cacheStoreKriss') ) return;
      this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')! );
  }

  // INFO link tabla
  searchCountryByAlphaCode (code :string): Observable<Country | null> {
    const url = `${ this.apiUrl }/alpha/${ code }`;
    return this.http.get<Country[]>(url)
    .pipe(
      map( countries => countries.length > 0 ? countries[0]: null),
      catchError( () => of(null))
    );
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
    .pipe(
      catchError ( () => of([])),
      //delay(2000),
    );
  }
  // REFACTORIZAR EL FUENTE DE : searchCapital, searchCountry y searchRegion
  searchCapital (term :string): Observable<Country[]> {
    //return this.http.get(`${ this.apiUrl }/capital/${ term }`);
    const url = `${ this.apiUrl }/capital/${ term }`;
    // es un Observable, yo puedo disparar operadores de rjx de nuevo, extenciones reactivas
    return this.getCountriesRequest(url)
      .pipe(
        //al tener los mismo nombres no hace falta hacer = {term: term, countries: countries}
        tap(countries => this.cacheStore.byCapital = {term, countries} ),
        tap ( () => this.saveToLocalStorage()),
      );
  }
  searchCountry (term :string): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${ term }`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountries = { term, countries } ),
        tap ( () => this.saveToLocalStorage()),
        );
  }
  searchRegion (region :Region): Observable<Country[]> {
    const url = `${ this.apiUrl }/region/${ region }`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = { region, countries } ),
        tap ( () => this.saveToLocalStorage()),
      );
  }
}
