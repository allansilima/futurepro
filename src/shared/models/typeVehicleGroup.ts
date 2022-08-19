import { TypeVehicle } from "./typeVehicle";

export class TypeVehicleGroup {
    group: number;
    typesVehicles: TypeVehicle[];

    constructor() { 
        this.typesVehicles = [];
    }
}