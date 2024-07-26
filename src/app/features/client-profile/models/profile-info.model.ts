export interface Client {
  clientid?: string;
  email: string;
  firstname: string;
  image?: {
    type: string;
    data: number[];
  };
  lastname: string;
  password?: string; // Puede que no necesites este campo
  phone: string;
}
