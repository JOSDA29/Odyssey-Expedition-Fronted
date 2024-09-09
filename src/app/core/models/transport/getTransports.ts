export interface getTransport {
    transportID:string,
    transporttype: string;
    company: string;
    origin: string;
    destination: string;
    arrivaldate: string;
    departuredate: string;
    numberOfPeople: number;
    price: number;
    state: boolean;
    trackNumber: number;
    imageurl:string,
    nights?:number;
}