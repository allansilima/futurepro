import { Contract } from "./contract";
import { Associated } from "./associated";
import { Model } from "./model";
import { YearFuel } from "./yearFuel";
import { Brand } from "./brand";
import { Media } from "./media";
import { Inspector } from "./inspector";

export class Inspection {
    id: number;
    status: string;
    myAccount: boolean;
    utilization: string;
    typeVehicle: string;
    brand: Brand;
    model: Model;
    yearFuel: YearFuel;
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

    constructor() { }
}