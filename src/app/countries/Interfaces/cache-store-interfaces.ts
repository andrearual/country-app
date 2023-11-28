import { Country } from './country.Interfaces';
import { Region } from './region.type';

export interface CacheStore {
  byCapital:  TermCoutries;
  byCountries: TermCoutries;
  byRegion:   RegionCoutries;
}

export interface TermCoutries {
  term:       string;
  countries:  Country[];
}

export interface RegionCoutries {
  region:     Region; // la primera vez no tiene valor seleccionado, por eso se pone opccional ?
  countries: Country [];
}
