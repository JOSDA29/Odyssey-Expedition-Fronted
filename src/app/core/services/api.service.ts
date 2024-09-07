import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../features/client-profile/models/profile-info.model';
import { Login } from '../../features/home/models/login-modal-model';
import { RegisterForm } from '../../features/register/models/register-form-info.model';
import { updateClient } from '../../features/client-profile/models/update-info.model';
import { HotelCreate } from '../models/hotel/createHotel';
import { updateHotel } from '../models/hotel/updateHotel';
import { CreateTransport } from '../models/transport/createTransport';
import { updateTransport } from '../models/transport/updateTransport';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:10240'; 

  constructor(
    private http: HttpClient,
  ) { }


  iaResponse(prompt: string, history: { text: string, isClient: boolean }[]): Observable<any> {
    const requestBody = {
      prompt,
      history: history.map(msg => ({ role: msg.isClient ? 'user' : 'model', parts: msg.text }))
    };
    return this.http.post<any>(`${this.apiUrl}/chat`, requestBody);
  }
  
  ////////////////Client/////////////////////////////
  
  Register(name:string, lastName: string, email:string, password: string): Observable<RegisterForm> {
    return this.http.post<RegisterForm>(`${this.apiUrl}/client/register`,{name,lastName,email,password});
  }

  login(email: string, password: string): Observable<Login> {
    return this.http.post<Login>( `${this.apiUrl}/auth`,{ email, password });
  }

  getUserInfo(): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/client/getByEmail`);
  }
  
  updateImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, 'image.png'); 
    return this.http.post<any>(`${this.apiUrl}/client/uploadImage`, formData);
  }

  updateIdClient(id: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/client/insertId`,{id});
  }
  changeState(state: boolean):Observable<boolean>{
    return this.http.put<boolean>(`${this.apiUrl}/client/ChangeState`,{state});
  }

  getFlights(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8000/flights`);
  }

  updateClient(name?: string,lastName?: string,phoneNumber?: string | undefined):Observable<updateClient>{
    return this.http.put<updateClient>(`${this.apiUrl}/client/update`,{name,lastName,phoneNumber})
  }
  
  ////////////////////Adviser/////////////////////////

  getAdviser():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/adviser/getByEmail`);
  }
      ////////////hotel////////////////////
      createHotel(dataHotel: HotelCreate): Observable<HotelCreate> {
        return this.http.post<HotelCreate>(`${this.apiUrl}/hotel/create`, dataHotel);
      }
         
        /////GetHotels/////////////
  getHotels():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/hotel/getAll`);
  }

      ///////////GetById///////////
getHotelById(id:string): Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/hotel/getById/${id}`);
}

  
        //////////////////////UpdateHotel/////////////
  updateHotel(dataUpdateHotel:updateHotel):Observable<updateHotel>{
    return this.http.put<updateHotel>(`${this.apiUrl}/hotel/update`,dataUpdateHotel);
  }
  
  ////////////UpdateImageHotel////////////////////
  updateImageHotel(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // La clave 'file' debe coincidir con la que espera el backend
    return this.http.put<any>(`${this.apiUrl}/hotel/uploadImage`, formData);
}
     

////////////////GetAllTransport////////////////////////////
  getAllTransport():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/transport/filter`)
    }

    filterTransport(filters: any): Observable<any> {
      let params = new HttpParams();
      
      // Añade los parámetros de filtrado a la URL
      for (const key in filters) {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          params = params.set(key, filters[key]);
        }
      }
      return this.http.get<any>(`${this.apiUrl}/transport/filter`, { params });
    }

  createTransport(data: CreateTransport):Observable<CreateTransport>{
    return this.http.post<CreateTransport>(`${this.apiUrl}/transport/create`,data);
  }

  //////////////UpdateTransport/////////////////
  updateTransport(dataUpdateTransport: updateTransport):Observable<updateTransport>{
    return this.http.put<updateTransport>(`${this.apiUrl}/transport/update`,dataUpdateTransport)
  }

  //////////////////Admin/////////////////////////////
  getAdmin(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/admin/getByEmail`);
  }


  ///////////////////////Filtre///////////////////////


  filterHotels(filters: any): Observable<any> {
    let params = new HttpParams();
    
    // Añade los parámetros de filtrado a la URL
    for (const key in filters) {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        params = params.set(key, filters[key]);
      }
    }
    
    return this.http.get<any>(`${this.apiUrl}/hotel/filter`, { params });
  }


}
