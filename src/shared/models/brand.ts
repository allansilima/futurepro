import { AttributesBrand } from "./attributesBrand";

export class Brand {
    id: string;
    type: string;
    attributes: AttributesBrand;

    constructor() {
        this.attributes = new AttributesBrand();
     }
}