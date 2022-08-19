import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

@Injectable()
export class ModelProvider extends ApiProvider {

  constructor(private http: HttpClient) {
    super();
  }

  getModels(brandCode: string) {
    this.apiUrl = this.API_URL_CARS.concat(brandCode)
    return this.http.get<any[]>(this.apiUrl);
  }
}
