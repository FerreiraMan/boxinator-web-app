import { Tiers } from "../enums/tiers.enum";
import { ShipmentStatus } from "../enums/ShipmentStatus.enum";

export interface Shipment {
    status: ShipmentStatus;
    weight: Tiers;
    boxColor: string;
    receiver: string;
    destination: string;
    cost: number;
  }