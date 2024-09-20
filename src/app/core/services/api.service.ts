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
import { RegisterProveedor } from '../models/proveedor/proveedor';
import { UpdateProveedor } from '../models/proveedor/proveedorUpdate';
import { updatePaquete } from '../models/paquetes/updatePaquetes';
import { createPaquete } from '../models/paquetes/crearPaquete';
import { authGoogle } from '../models/authGoogle/authGogle';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:10240'; 

  constructor(
    private http: HttpClient,
  ) { }

  ///////////// AUTH /////////////

  login(email: string, password: string): Observable<Login> {
    return this.http.post<Login>(`${this.apiUrl}/auth`, { email, password });
  }

  ///////////// CLIENT /////////////

  iaResponse(prompt: string, history: { text: string, isClient: boolean }[]): Observable<any> {
    const requestBody = {
      prompt,
      history: history.map(msg => ({ role: msg.isClient ? 'user' : 'model', parts: msg.text }))
    };
    return this.http.post<any>(`${this.apiUrl}/chat`, requestBody);
  }

  updateImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, 'image.png'); 
    return this.http.post<any>(`${this.apiUrl}/client/uploadImage`, formData);
  }

  Register(name: string, lastName: string, email: string, password: string): Observable<RegisterForm> {
    return this.http.post<RegisterForm>(`${this.apiUrl}/client/register`, { name, lastName, email, password });
  }

  getUserInfo(): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/client/getByEmail`);
  }

  updateIdClient(id: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/client/insertId`, { id });
  }

  changeState(state: boolean): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/client/ChangeState`, { state });
  }

  updateClient(name?: string, lastName?: string, phoneNumber?: string | undefined): Observable<updateClient> {
    return this.http.put<updateClient>(`${this.apiUrl}/client/update`, { name, lastName, phoneNumber });
  }

  ///////////// ADMIN /////////////

  getAdmin(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/getByEmail`);
  }

  ///////////// ADVISER /////////////

  getAdviser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/adviser/getByEmail`);
  }

  ///////////// HOTEL /////////////

  createHotel(dataHotel: HotelCreate): Observable<HotelCreate> {
    return this.http.post<HotelCreate>(`${this.apiUrl}/hotel/create`, dataHotel);
  }

  updateHotel(dataUpdateHotel: updateHotel): Observable<updateHotel> {
    return this.http.put<updateHotel>(`${this.apiUrl}/hotel/update`, dataUpdateHotel);
  }

  updateImageHotel(file: File, id: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id.toString());
    return this.http.put<any>(`${this.apiUrl}/hotel/uploadImage`, formData);
  }

  ///////////// TRANSPORT /////////////

  createTransport(data: CreateTransport): Observable<CreateTransport> {
    return this.http.post<CreateTransport>(`${this.apiUrl}/transport/create`, data);
  }

  updateTransport(dataUpdateTransport: updateTransport): Observable<updateTransport> {
    return this.http.put<updateTransport>(`${this.apiUrl}/transport/update`, dataUpdateTransport);
  }

  updateImageTransport(file: File, id: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id.toString()); 
    return this.http.put<any>(`${this.apiUrl}/transport/uploadImage`, formData);
  }

  ///////////// PROVEEDOR /////////////

  registerProveedor(data: RegisterProveedor): Observable<RegisterProveedor> {
    return this.http.post<RegisterProveedor>(`${this.apiUrl}/supplier/register`, data);
  }

  updateProveedor(data: UpdateProveedor): Observable<UpdateProveedor> {
    return this.http.put<UpdateProveedor>(`${this.apiUrl}/supplier/update`, data);
  }

  updateChangeState(data: UpdateProveedor): Observable<UpdateProveedor> {
    return this.http.put<UpdateProveedor>(`${this.apiUrl}/supplier/changeState`, data);
  }

  ///////////// PAQUETES /////////////

  updatePaquetes(data: updatePaquete): Observable<updatePaquete>{
    return this.http.put<updatePaquete>(`${this.apiUrl}/package/update`, data)
  }

  createPaquete(data: createPaquete): Observable<createPaquete> {
    return this.http.post<createPaquete>(`${this.apiUrl}/package/create`, data);
  }

  updateImagePaquete(file: File, id: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id.toString()); 
    return this.http.put<any>(`${this.apiUrl}/package/updateImage`, formData);
  }
  
  addPaqueteHotel(dataHotel: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/package/addHotel`, dataHotel)
  }

  addPaqueteTransporte(dataHotel: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/package/addTransport`, dataHotel)
  }

  getService(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/package/getServices`, { params: { id } });
  }
  

  ///////////// FILTERS /////////////
  
  filterHotels(filters: any): Observable<any> {
    let params = new HttpParams();
    for (const key in filters) {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        params = params.set(key, filters[key]);
      }
    }
    return this.http.get<any>(`${this.apiUrl}/hotel/filter`, { params });
  }

  filterTransport(filters: any): Observable<any> {
    let params = new HttpParams();
    for (const key in filters) {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        params = params.set(key, filters[key]);
      }
    }
    return this.http.get<any>(`${this.apiUrl}/transport/filter`, { params });
  }

  filterPaquetes(filters: any): Observable<any> {
    let params = new HttpParams();
    for (const key in filters) {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        params = params.set(key, filters[key]);
      }
    }
    return this.http.get<any>(`${this.apiUrl}/package/filter`, { params });
  }
  

  filterProveedores(filters: any): Observable<any> {
    let params = new HttpParams();
    for (const key in filters) {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        params = params.set(key, filters[key]);
      }
    }
    return this.http.get<any>(`${this.apiUrl}/supplier/filter`, { params });
  }

  authGoogle(profile: authGoogle): Observable<authGoogle> {
    return this.http.post<authGoogle>(`${this.apiUrl}/auth-google`,profile)
  }


  transation(data: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/transaction/create`,data);
  }

}