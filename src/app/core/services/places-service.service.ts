import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private readonly apiUrl = 'https://api.opencagedata.com/geocode/v1/json';
  private readonly apiKey = '9b18b8bbbd934c0e89165d46fcc2e5e0'; // Sustituye con tu clave de API

  constructor(private http: HttpClient) {}

  searchPlaces(query: string): Observable<any[]> {
    const params = new HttpParams()
      .set('q', query)
      .set('key', this.apiKey);

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => response.results || [])
    );
  }
}
