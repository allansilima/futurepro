import { FieldMessage } from "./fieldMessage";

export class ValidationError {
    status: string;
    data: FieldMessage[] = [];

    constructor() {
    }

    public getErrors(): FieldMessage[] {
        return this.data;
    }

    public addError(field: string, message: string) {
        this.data.push(new FieldMessage(field, message));
    }
}