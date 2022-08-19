import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

@Injectable()
export class YearFuelProvider extends ApiProvider {

  constructor(private http: HttpClient) {
    super();
  }

  getYearsFuels(modelCode: string) {
    this.apiUrl = this.API_URL_YEARS_FUELS.concat(modelCode)
    return this.http.get<any[]>(this.apiUrl);
  }
}
