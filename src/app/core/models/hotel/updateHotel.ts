export interface updateHotel{
    id?:string,
    name?: string;
    destination?: string;
    startDate?: Date;
    endDate?: Date;
    numberOfPeople?: number;
    room?: string;
    description?: string;
    location?: string;
    hotelServices?: string;
    price?: number;
    imageurl?: string;
    state?: boolean;
}