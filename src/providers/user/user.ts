import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../../shared/models/account';
import { ApiProvider } from '../api/api';

@Injectable()
export class UserProvider extends ApiProvider {

  constructor(private http: HttpClient) {
    super();
  }

  signIn(login: string, password: string): Observable<any> {
    this.apiUrl = this.API_URL_USERS.concat('sign_in');
    this.body = JSON.parse(JSON.stringify({ 'login': login.toLocaleLowerCase(), 'password': password }));

    return this.http.post<any>(this.apiUrl, this.body, this.httpOptionsBackOffice);
  }

  redefinePassword(email: string): Observable<any> {
    this.apiUrl = this.API_URL_USERS.concat('remember_password');
    this.body = JSON.parse(JSON.stringify({ 'email': email }));

    return this.http.post<any>(this.apiUrl, this.body, this.httpOptionsBackOffice);
  }

  createAccount(account: Account): Observable<any> {
    this.apiUrl = this.API_URL_USERS.concat('sign_up');
    this.body = JSON.parse(JSON.stringify(account));

    return this.http.post<any>(this.apiUrl, this.body, this.httpOptionsBackOffice);
  }

  findByCpfCnpj(cpfCnpj: any): Observable<any> {
    this.apiUrl = this.API_URL_USERS.concat('find_by_cpf');
    this.body = JSON.parse(JSON.stringify({ 'cpf': cpfCnpj }));

    return this.http.post<any>(this.apiUrl, this.body, this.httpOptionsBackOffice);
  }
}
