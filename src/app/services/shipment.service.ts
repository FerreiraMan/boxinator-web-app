import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Shipment } from '../models/Shipment';
import { GetterShipment } from '../models/GetterShipment';

const { apiUsers } = environment;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://boxinator-web-app-vert.vercel.app',
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

  updateShipment(id: number, shipment: GetterShipment): Observable<GetterShipment> {
    const url = `${apiUsers}/user/shipments/${id}`;
    return this.http.put<GetterShipment>(url, shipment, { withCredentials: true });
  }

  getShipmentById(id: number): Observable<Shipment> {
    const url = `${apiUsers}/user/shipments/${id}`;
    return this.http.get<Shipment>(url, httpOptions);
  }
  
  getAllShipments(): Observable<GetterShipment[]> {
    const url = `${apiUsers}/user/shipments`;
    return this.http.get<GetterShipment[]>(url, { withCredentials: true });
  }

  getAllCompletedShipments(): Observable<Shipment> {
    const url = `${apiUsers}/user/shipments/complete`;
    return this.http.get<Shipment>(url, httpOptions);
  }

  getAllCancelledShipments(): Observable<Shipment> {
    const url = `${apiUsers}/user/shipments/cancelled`;
    return this.http.get<Shipment>(url, { withCredentials: true });
  }
}
