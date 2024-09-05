export interface updateHotel{
    id:number,
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
    state?: boolean;
}