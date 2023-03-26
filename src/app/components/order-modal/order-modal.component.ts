import { Component, EventEmitter, Output } from '@angular/core';
import { ShipmentService } from 'src/app/services/shipment.service';
import { Shipment } from 'src/app/models/Shipment';
import { Tiers } from 'src/app/enums/tiers.enum';
import { Countries } from 'src/app/enums/Countries.enum';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent {

  @Output() shipmentCreated = new EventEmitter<Shipment>();

  selectedTier: Tiers = Tiers.BASIC;

  shipments: Shipment[] = [];

  selectedCountry: Countries = Countries.Portugal;

  tiers: string[] = Object.values(Tiers);

  countries: string[] = Object.values(Countries);

  constructor(private shipmentService: ShipmentService) {}

  addShipment(receiver: string, weight: string, boxColor: string, destination: string) {
    const shipment: Shipment = {
      status: 'CREATED',
      weight: this.getWeightForTier(this.selectedTier),
      boxColor: boxColor,
      receiver: receiver,
      destination: this.getCountries(this.selectedCountry)
    };
    this.shipmentService.createShipment(shipment).subscribe(() => {
      // handle successful creation of shipment
      console.log("shipment created" + shipment);
      this.shipmentCreated.emit(shipment);
      this.shipmentService.getAllShipments().subscribe(shipments => {
        this.shipments = shipments;
        window.location.reload(); // Refresh the page after the data is updated
      });
    }, (error) => {
      // handle error in creating shipment
      console.log("error in creating shipment",shipment, error);
    });
  }
  
  private getWeightForTier(tier: Tiers): Tiers {
    return tier;
  }

  private getCountries(country: Countries): Countries {
    return country;
  }
  
}
