import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../features/client-profile/models/profile-info.model';
import { Login } from '../../features/home/models/login-modal-model';
import { RegisterForm } from '../../features/register/models/register-form-info.model';
import { updateClient } from '../../features/client-profile/models/update-info.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:10240'; 

  constructor(
    private http: HttpClient,
  ) { }

  getFlights(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8000/flights`);
  }

  Register(name:string, lastName: string, email:string, password: string): Observable<RegisterForm> {
    return this.http.post<RegisterForm>(`${this.apiUrl}/client/register`,{name,lastName,email,password});
  }
  
  login(email: string, password: string): Observable<Login> {
    return this.http.post<Login>( `${this.apiUrl}/auth`,{ email, password });
  }

  getUserInfo(): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/client/getByEmail`);
  }

  updateClient(name?: string,lastName?: string,phoneNumber?: string | undefined):Observable<updateClient>{
    return this.http.put<updateClient>(`${this.apiUrl}/client/update`,{name,lastName,phoneNumber})
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
}
