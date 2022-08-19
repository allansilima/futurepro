import { Contract } from "./contract";
import { Associated } from "./associated";
import { Media } from "./media";
import { Inspector } from "./inspector";

export class InspectionDTO {
    id: number;
    status: string;
    myAccount: boolean;
    utilization: string;
    typeVehicle: string;
    brand: string;
    model: string;
    yearFuel: string;
    plate: string;
    chassis: string;
    renavam: string;
    color: string;
    plan: string;
    inputValue: string;
    monthlyValue: string;
    feeValue: string;
    readAndAgree: boolean;
    media: Media[];
    associated: Associated;
    inspector: Inspector;
    contract: Contract;

    constructor() {
    }
}