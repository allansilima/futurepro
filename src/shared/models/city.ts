import { State } from "./state";

export class City {
    id: number;
    name: string;
    state: State;

    constructor() { 
        this.state = new State();
    }
}