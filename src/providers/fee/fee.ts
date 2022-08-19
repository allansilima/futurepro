import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';
import { YearFuel } from '../../shared/models/yearFuel';

@Injectable()
export class FeeProvider  extends ApiProvider {

  constructor(public http: HttpClient) {
    super();
  }

  getFee(yearFuel: YearFuel, special: boolean) {
    let param = 'model_code=' + (yearFuel.attributes.model_code) + '&' +
      'model_year=' + yearFuel.attributes.model_year + '&' +
      'fuel_type=' + yearFuel.attributes.fuel_type + '&' +
      'special='+ special;
    
    this.apiUrl = this.API_URL_FEES.concat(param);
    return this.http.get<any>(this.apiUrl);
  }
}
