export class Staff {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    constructor(id: string, name: string, email: string, phone: string, address: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }
}
