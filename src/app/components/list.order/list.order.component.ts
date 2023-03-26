import { Component, OnInit } from '@angular/core';
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
    
  calculateCost(shipment: GetterShipment) {
    // logic to calculate the cost based on the weight and destination of the shipment
  }
}
