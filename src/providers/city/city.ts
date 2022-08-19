import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CityProvider {

  private API_URL = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/52/municipios";

  constructor(public http: HttpClient) {
  }

  getCities() {
    return this.http.get<any>(this.API_URL);
  }

}
