import { Plans } from "./plans";

export class Price {
    id: number;
    name: string;
    min: number;
    max: number;
    plans: Plans;

    constructor() { }
}