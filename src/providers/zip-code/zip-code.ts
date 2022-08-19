import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

@Injectable()
export class ZipeCodeProvider extends ApiProvider {

  constructor(public http: HttpClient) {
    super();
  }

  getAddress(zipcode: string) {
    this.apiUrl = this.API_URL_ZIPCODE.concat(zipcode).concat('/json/');
    return this.http.get<any>(this.apiUrl);
  }
}
