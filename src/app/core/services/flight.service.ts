import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private readonly apiUrl = 'http://localhost:3000/flights';

  constructor(private http: HttpClient) {}

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.apiUrl);
  }

  getFlightById(id: string): Observable<Flight> {
    return this.http.get<Flight>(`${this.apiUrl}/${id}`);
  }
}
