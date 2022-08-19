import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';
import { Observable } from 'rxjs';
import { Inspection } from '../../shared/models/inspection';
import { InspectionDTO } from '../../shared/models/inspectionDTO';

@Injectable()
export class InspectionProvider extends ApiProvider {

  constructor(public http: HttpClient) {
    super();
  }

  insert(inspection: Inspection): Observable<any> {
    this.apiUrl = this.API_URL_INSPECTIONS;

    this.body = JSON.parse(JSON.stringify(this.inspectionToDTO(inspection)));
    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this.http.post<any>(this.apiUrl, this.body);
  }

  update(inspection: Inspection): Observable<any> {
    this.apiUrl = this.API_URL_INSPECTIONS.concat('/' + inspection.id.toString);

    this.body = JSON.parse(JSON.stringify(this.inspectionToDTO(inspection)));
    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this.http.put<any>(this.apiUrl, this.body);
  }

  getInspections(login: string) {
    this.apiUrl = this.API_URL_INSPECTIONS_LIST.concat(login);
    return this.http.get<any[]>(this.apiUrl);
  }

  inspectionToDTO(inspection: Inspection) {
    let inspecitionDTO: InspectionDTO = new InspectionDTO();

    inspecitionDTO.id = inspection.id;
    inspecitionDTO.status = inspection.status;
    inspecitionDTO.myAccount = inspection.myAccount;
    inspecitionDTO.utilization = inspection.utilization;
    inspecitionDTO.typeVehicle = inspection.typeVehicle;
    inspecitionDTO.brand = inspection.brand.attributes.name;
    inspecitionDTO.model = inspection.model.attributes.model;
    inspecitionDTO.yearFuel = inspection.yearFuel.attributes.model_year + ' / ' + inspection.yearFuel.attributes.fuel_type;
    inspecitionDTO.plate = inspection.plate.toLocaleUpperCase();
    inspecitionDTO.chassis = inspection.chassis.toLocaleUpperCase();
    inspecitionDTO.renavam = inspection.renavam.toLocaleUpperCase();
    inspecitionDTO.color = inspection.color.toLocaleUpperCase();
    inspecitionDTO.plan = inspection.plan;
    inspecitionDTO.inputValue = inspection.inputValue;
    inspecitionDTO.monthlyValue = inspection.monthlyValue;
    inspecitionDTO.feeValue = inspection.feeValue;
    inspecitionDTO.readAndAgree = inspection.readAndAgree;
    inspecitionDTO.media = inspection.media;
    inspecitionDTO.associated = inspection.associated;
    inspecitionDTO.inspector = inspection.inspector;
    inspecitionDTO.contract = inspection.contract;

    return inspecitionDTO;
  }
}
