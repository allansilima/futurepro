import { AttributesYearFuel } from "./attributesYearFuel";

export class YearFuel {
    id: string;
    type: string;
    attributes: AttributesYearFuel;

    constructor() {
        this.attributes = new AttributesYearFuel();
    }
}