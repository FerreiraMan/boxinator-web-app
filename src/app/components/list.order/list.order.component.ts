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
  filteredShipments: GetterShipment[] = [];
  ShipmentStatus = ShipmentStatus;

  constructor(
    private shipmentService: ShipmentService,
    private orderModal: OrderModalComponent) {}

    ngOnInit() {
      this.shipmentService.getAllShipments().subscribe(shipments => {
      this.shipments = shipments;
      this.filteredShipments = shipments;
      });
    
      this.orderModal.shipmentCreated.subscribe((shipment: GetterShipment) => {
        this.shipments.push(shipment);
        this.filterShipments();
      });    
    }

    filterShipments(status?: string) {
      if (!status) {
        this.filteredShipments = this.shipments;
      } else if (status === 'created') {
        this.filteredShipments = this.shipments.filter(shipment => shipment.status === ShipmentStatus.CREATED);
      } else if (status === 'cancelled') {
        this.filteredShipments = this.shipments.filter(shipment => shipment.status === ShipmentStatus.CANCELLED);
      }
    }    

    cancelShipment(id: number, shipment: GetterShipment) {
      if (shipment.status === ShipmentStatus.CREATED) {
        shipment.status = ShipmentStatus.CANCELLED;
        this.shipmentService.updateShipment(id, shipment).subscribe(updatedShipment => {
          console.log("Shipment cancelled:", updatedShipment);
          this.filterShipments();
        });
      } else {
        Swal.fire("Unable to cancel shipment! Only possible when in CREATED status.")
      }
    } 
  }
