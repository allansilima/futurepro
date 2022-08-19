import { AttributesInspectionList } from "./attributesInspectionList";

export interface InspectionList {
    id: string;
    type: string;
    attributes: AttributesInspectionList;
}