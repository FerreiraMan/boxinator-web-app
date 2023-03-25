import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Shipment } from '../models/Shipment';

const { apiUsers } = environment;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  constructor(
    private http: HttpClient
  ) {}

  createShipment(shipment: Shipment): Observable<Shipment> {
    const url = `${apiUsers}/user/shipments`;
    return this.http.post<Shipment>(url, shipment, { withCredentials: true });
  }

  updateShipment(id: number, shipment: Shipment): Observable<Shipment> {
    const url = `${apiUsers}/user/shipments/${id}`;
    return this.http.put<Shipment>(url, shipment, httpOptions);
  }

  getShipmentById(id: number): Observable<Shipment> {
    const url = `${apiUsers}/user/shipments/${id}`;
    return this.http.get<Shipment>(url, httpOptions);
  }
  
  getAllShipments(): Observable<Shipment> {
    const url = `${apiUsers}/user/shipments`;
    return this.http.get<Shipment>(url, httpOptions);
  }

  getAllCompletedShipments(): Observable<Shipment> {
    const url = `${apiUsers}/user/shipments/complete`;
    return this.http.get<Shipment>(url, httpOptions);
  }

  getAllCancelledShipments(): Observable<Shipment> {
    const url = `${apiUsers}/user/shipments/cancelled`;
    return this.http.get<Shipment>(url, httpOptions);
  }

}
