import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Countries } from 'src/app/enums/Countries.enum';
import { COUNTRY_MULTIPLIERS } from 'src/app/models/Countries';
import { GetterShipment } from 'src/app/models/GetterShipment';
import { Shipment } from 'src/app/models/Shipment';
import { ShipmentService } from 'src/app/services/shipment.service';
import { OrderModalComponent } from '../order-modal/order-modal.component';

@Component({
  selector: 'app-list-order',
  templateUrl: './list.order.component.html',
  styleUrls: ['./list.order.component.css']
})
export class ListOrderComponent implements OnInit {

  shipments: GetterShipment[] = [];

  constructor(
    private shipmentService: ShipmentService,
    private orderModal: OrderModalComponent) {}

    ngOnInit() {
      this.shipmentService.getAllShipments().subscribe(shipments => {
      this.shipments = shipments;
      });
    
      this.orderModal.shipmentCreated.subscribe((shipment: GetterShipment) => {
        this.shipments.push(shipment); // add the new shipment to the array
      });      
    }
    
    calculateCost(weight: string, country: string): Observable<number> {
      return this.shipmentService.getAllShipments().pipe(
        map(shipments => {
          const shipment = shipments.find(s => s.destination === country);
          if (!shipment) {
            throw new Error(`No shipment found for country: ${country}`);
          }
          let costCountry: string = shipment.destination;
          const countryMultiplier = COUNTRY_MULTIPLIERS[costCountry];
          let weightInKg = 0;
          if (weight === "BASIC") {
            weightInKg = 1;
          } else if (weight === "HUMBLE") {
            weightInKg = 2;
          } else if (weight === "DELUXE") {
            weightInKg = 5;
          } else if (weight === "PREMIUM") {
            weightInKg = 8;
          }
          return 200 + weightInKg * countryMultiplier;
        })
      );
    }
    
}
