import { CountriesService } from './../../services/countries.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../Interfaces/country.Interfaces';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country? : Country;

  // No se hacen verificaciones de HTML en el contructor, esto ya que no se ha creado el HTML
  // para eso esta el implements OnInit, se usa para hacer una verificacion de HTML,
  // mostrar loading, una pantalla en el cual diga espere mientra carga una info y verificar que exita un dato, etc.
  // para eso se usa el OnInit, dentro de esta método verificamos la existencia de un dato, o cargamos una ventana de loading, etc.
  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private countriesService: CountriesService,
  ) { }

  ngOnInit(): void {
    // this.activatedRoute.params // esto es un Observable<Params>
    // .subscribe( (params: any) => {  // no debemos usar el ANY
    //   console.log( { params: params.id } ) // angular no sabe que exite la propiedad id dentro de params (que es parte del core de angular) PARAMS
       // entoces la ponemos entre llaves y comillas simples
    // })

    // this.activatedRoute.params // esto es un Observable<Params>
    // .subscribe( (params) => {
    //   console.log( { params: params['id'] } )
    // })



    //Mas limpio aun desestructurar la llave que se llama id de los parametros
    // el codigo se puedo mejorar utilizando los pipe, del Observable, ver linea 53
    // this.activatedRoute.params // esto es un Observable<Params>
    // .subscribe( ({id}) => {
    //   this.searchCountry(id);
    //   // Esto es un Observable Hell (head), que es un Observable dentro de otro Observable, donde el resultado del primer Observable
    //   // es necesario para el segundo Observable
    //   // EVITARLO
    //   // this.countriesService.searchCountryByAlphaCode(id)
    //   //   .subscribe ( country => {
    //   //     console.log({ country });
    //   //   });
    //     console.log( { params: id } )
    // });


    this.activatedRoute.params // esto es un Observable<Params>
    .pipe(
      switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode(id)), // lo cambia Country[]
    )
    .subscribe( country  => { // Country[]

      // si no conuntry es vacio lo redirecciona al HOME
      if( !country ){
        return this.router.navigateByUrl('');
      }
      // console.log( { country } );
      // console.log( 'TENEMOS UN PAIS' );
      return this.country = country;

    });
  }

  searchCountry (code : string ){
    this.countriesService.searchCountryByAlphaCode(code)
      .subscribe ( country => {
        console.log({ country });
      });

  }

}
