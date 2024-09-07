export interface HotelData {
    name: string;
    destination: string;
    startDate: Date;
    endDate: Date;
    numberOfPeople: number;
    room: string;
    description: string;
    location: string;
    services: string;
    price: number;
    imageurl?: string | undefined;
    state: boolean;
}   
  