import { Address } from "./address";

export class Associated {
    id: number;
    cpfCnpj: string;
    name: string;
    fantasy: string;
    type: string;
    rg: string;
    emitterOrgan: string;
    emitterOrganState: string;
    cnh: number;
    categoryCnh?: string;
    birthdate: Date;
    phone: string;
    cellphone1: string;
    cellphone1Whatsapp: boolean;
    cellphone2: string;
    cellphone2Whatsapp: boolean;
    email: string;
    genre: string;
    address: Address;

    constructor() {
        this.address = new Address();
    }
}
