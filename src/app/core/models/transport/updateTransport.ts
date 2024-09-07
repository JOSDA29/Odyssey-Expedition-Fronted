export interface updateTransport {
    transportID?:string,
    transporttype?: string;
    company?: string;
    origin?: string;
    destination?: string;
    arrivalDate?: Date;
    departureDate?: Date;
    numberOfPeople?: number;
    price?: number;
    state?: boolean;
    trackNumber?: number;
}