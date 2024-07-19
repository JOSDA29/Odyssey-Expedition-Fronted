// profile-info.model.ts
export interface Client {
  clientid: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  image: {
    type: string;
    data: number[];
  };
}
