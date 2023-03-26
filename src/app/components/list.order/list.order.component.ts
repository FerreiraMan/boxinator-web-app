import { Component, OnInit } from '@angular/core';
import { Shipment } from 'src/app/models/Shipment';
import { ShipmentService } from 'src/app/services/shipment.service';
import { OrderModalComponent } from '../order-modal/order-modal.component';

@Component({
  selector: 'app-list-order',
  templateUrl: './list.order.component.html',
  styleUrls: ['./list.order.component.css']
})
export class ListOrderComponent implements OnInit {

  shipments: Shipment[] = [];

  constructor(
    private shipmentService: ShipmentService,
    private orderModal: OrderModalComponent) {}

    ngOnInit() {
      this.shipmentService.getAllShipments().subscribe(shipments => {
        this.shipments = shipments;
      });
    
      this.orderModal.shipmentCreated.subscribe((shipment: Shipment) => {
        this.shipments.push(shipment); // add the new shipment to the array
      });      
    }
    
  calculateCost(shipment: Shipment) {
    // logic to calculate the cost based on the weight and destination of the shipment
  }
}
