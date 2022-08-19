import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider {

//  API_URL_USERS = "https://futuremotors-staging.herokuapp.com/api/v1/users/";
  API_URL_USERS = "https://backoffice.futuremotors.com.br/api/v1/users/";
  API_URL_BRANDS = "https://vistoriaweb.morenwm.com/api/v1/brands?vehicle_type=";
  API_URL_CARS = "https://vistoriaweb.morenwm.com/api/v1/cars?brand_code=";
  API_URL_YEARS_FUELS = "https://vistoriaweb.morenwm.com/api/v1/car_years?model_code=";
  API_URL_PRICES = "https://vistoriaweb.morenwm.com/api/v1/prices?";
  API_URL_FEES = "https://vistoriaweb.morenwm.com/api/v1/fees?";
  API_URL_INSPECTIONS = "https://vistoriaweb.morenwm.com/api/v1/inspections";
  API_URL_INSPECTIONS_LIST = "https://vistoriaweb.morenwm.com/api/v1/inspections?inspector_login=";
  API_URL_ZIPCODE = "https://viacep.com.br/ws/";

  httpOptions = { headers: new HttpHeaders({ 'Authorization': 'stagingtest' /*, 'Access-Control-Allow-Origin': '*' */ }) };
//  httpOptionsBackOffice = { headers: new HttpHeaders({ 'Authorization': 'stagingtest' /*, 'Access-Control-Allow-Origin': '*' */ }) };
  httpOptionsBackOffice = { headers: new HttpHeaders({ 'Authorization': 'Uj22qP7aQLiVr6' /*, 'Access-Control-Allow-Origin': '*' */ }) };

  apiUrl: any;
  body: any;

  /*
  public handleError(error: HttpErrorResponse) {
    let errorMessage: any = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error;
    }
    return errorMessage;
  }
  */
}
