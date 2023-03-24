import { Component } from '@angular/core';
import { ShipmentService } from 'src/app/services/shipment.service';
import { Shipment } from 'src/app/models/Shipment';
import { Tiers } from 'src/app/enums/tiers.enum';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent {

  selectedTier: Tiers = Tiers.BASIC;

  tiers: string[] = Object.values(Tiers);

  constructor(private shipmentService: ShipmentService) {}

  addShipment(receiver: string, weight: string, boxColor: string, destination: string) {
    const shipment: Shipment = {
      status: 'CREATED',
      weight: this.getWeightForTier(this.selectedTier),
      boxColor: boxColor,
      receiver: receiver,
      destination: destination
    };
    this.shipmentService.createShipment(shipment).subscribe(() => {
      // handle successful creation of shipment
      console.log("shipment created" + shipment);
    }, (error) => {
      // handle error in creating shipment
      console.log("error in creating shipment",shipment, error);
    });
  }

  private getWeightForTier(tier: Tiers): Tiers {
    return tier;
  }
  
}
