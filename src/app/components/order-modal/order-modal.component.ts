import { Component, EventEmitter, Output } from '@angular/core';
import { ShipmentService } from 'src/app/services/shipment.service';
import { Shipment } from 'src/app/models/Shipment';
import { Tiers } from 'src/app/enums/tiers.enum';
import { Countries } from 'src/app/enums/Countries.enum';
import { GetterShipment } from 'src/app/models/GetterShipment';
import { map, Observable, of } from 'rxjs';
import { COUNTRY_MULTIPLIERS } from 'src/app/models/Countries';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent {

  @Output() shipmentCreated = new EventEmitter<Shipment>();

  selectedTier: Tiers = Tiers.BASIC;

  shipments: GetterShipment[] = [];

  shipment!: Shipment;

  selectedCountry: Countries = Countries.Portugal;

  tiers: string[] = Object.values(Tiers);

  countries: string[] = Object.values(Countries);

  constructor(private shipmentService: ShipmentService) {}

  addShipment(receiver: string, weight: string, boxColor: string, destination: Countries) {
    const shipment: Shipment = {
      status: 'CREATED',
      weight: this.getWeightForTier(this.selectedTier),
      boxColor: boxColor,
      receiver: receiver,
      destination: (this.getCountries(this.selectedCountry)).toString(),
      cost: 0 // Set initial cost to zero
    };

    this.calculateCost(this.getWeightForTier(this.selectedTier), this.getCountries(this.selectedCountry)).subscribe(cost => {
        shipment.cost = cost; // Assign the result of calculateCost to the shipment cost
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
    });
  }
  
  private getWeightForTier(tier: Tiers): Tiers {
    return tier;
  }

  private getCountries(country: Countries): Countries {
    return country;
  }

  calculateCost(weight: string, destination: Countries): Observable<number> {
    const countryMultiplier = COUNTRY_MULTIPLIERS[destination];
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
    const cost = countryMultiplier ? (200 + weightInKg * countryMultiplier) : 0;
    return of(cost);
  }
  
}
