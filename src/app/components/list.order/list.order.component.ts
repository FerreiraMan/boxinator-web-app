import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShipmentStatus } from 'src/app/enums/ShipmentStatus.enum';
import { GetterShipment } from 'src/app/models/GetterShipment';
import { ShipmentService } from 'src/app/services/shipment.service';
import Swal from 'sweetalert2';
import { OrderModalComponent } from '../order-modal/order-modal.component';

@Component({
  selector: 'app-list-order',
  templateUrl: './list.order.component.html',
  styleUrls: ['./list.order.component.css']
})
export class ListOrderComponent implements OnInit {

  shipments: GetterShipment[] = [];

  ShipmentStatus = ShipmentStatus; // make sure to assign it to a class property

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

    cancelShipment(id: number, shipment: GetterShipment) {
      if (shipment.status === ShipmentStatus.CREATED) {
        shipment.status = ShipmentStatus.CANCELLED;
        this.shipmentService.updateShipment(id, shipment).subscribe(updatedShipment => {
          console.log("Shipment cancelled:", updatedShipment);
        });
      } else {
      Swal.fire("Unable to cancel shipment! Only possible when in CREATED status.")
      }
    } 
  }
