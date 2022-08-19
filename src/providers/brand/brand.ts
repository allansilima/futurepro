import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

@Injectable()
export class BrandProvider extends ApiProvider {

  constructor(private http: HttpClient) {
    super();
  }

  getBrands(type: string) {
    this.apiUrl = this.API_URL_BRANDS.concat(type);
    return this.http.get<any[]>(this.apiUrl);
  }
}
