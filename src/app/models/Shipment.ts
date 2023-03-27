import { Tiers } from "../enums/tiers.enum";

export interface Shipment {
    status: "CREATED";
    weight: Tiers;
    boxColor: string;
    receiver: string;
    destination: string;
    cost: number;
  }