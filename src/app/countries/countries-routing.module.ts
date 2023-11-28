import { CountryPageComponent } from './pages/country-page/country-page.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCoutryPageComponent } from './pages/by-coutry-page/by-coutry-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';

const routes: Routes =[
  {
    path : 'by-capital',
    component: ByCapitalPageComponent
  },
  {
    path : 'by-country',
    component: ByCoutryPageComponent
  },
  {
    path : 'by-region',
    component: ByRegionPageComponent
  },
  {
    path : 'by/:id', // <= este nombre ('id') ese es el nombre con el que voy a recuperar el valor de ID
    component: CountryPageComponent
  },
  {
    path: '**',
    // ** redirectTo: 'home'
    redirectTo: 'by-capital'
  }
]
@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ],
  providers: [],
})
// Se importa el archivos de routing en , para que angular sepa que lo puede utilizar.
export class CountriesRoutingModule {
}
