import { AttributesModel } from "./attributesModel";

export class Model {
    id: string;
    type: string;
    attributes: AttributesModel;

    constructor() {
        this.attributes = new AttributesModel();
    }
}