import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from '../../shared/models/state';
import { EmitterOrgan } from '../../shared/models/emitterOrgan';
import { TypeVehicle } from '../../shared/models/typeVehicle';
import { Utilization } from '../../shared/models/utilization';

@Injectable()
export class DataUtilsProvider {

  constructor(private http: HttpClient) { }

  getStates() {
    return this.http.get<State[]>('assets/data/states.json');
  }

  getEmittersOrgans() {
    return this.http.get<EmitterOrgan[]>('assets/data/emittersOrgans.json');
  }

  getTypesVehicles() {
    return this.http.get<TypeVehicle[]>('assets/data/typesVehicles.json');
  }

  getUtilizations() {
    return this.http.get<Utilization[]>('assets/data/utilizations.json');
  }
}
