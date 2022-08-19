import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YearFuel } from '../../shared/models/yearFuel';
import { ApiProvider } from '../api/api';

@Injectable()
export class PriceProvider extends ApiProvider {

  constructor(public http: HttpClient) {
    super();
  }

  getPrices(yearFuel: YearFuel) {
    let param = 'model_code=' + (yearFuel.attributes.model_code) + '&' +
      'model_year=' + yearFuel.attributes.model_year + '&' +
      'fuel_type=' + yearFuel.attributes.fuel_type;
    
    this.apiUrl = this.API_URL_PRICES.concat(param);
    return this.http.get<any>(this.apiUrl);
  }
}
