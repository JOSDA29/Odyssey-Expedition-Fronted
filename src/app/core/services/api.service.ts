import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../features/client-profile/models/profile-info.model';
import { Login } from '../../features/home/models/login-modal-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:10240'; 

  constructor(
    private http: HttpClient,
  ) { }

  getFlights(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:/flights`);
  }

  
  getUserInfo(userEmail: string): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/client/getByEmail/${userEmail}`);
  }

  login(email: string, password: string): Observable<Login> {
    return this.http.post<Login>( `${this.apiUrl}/auth`,{ email, password });
  }
}
