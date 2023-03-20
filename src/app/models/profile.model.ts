import { ProfileType } from "../enums/profile-type.enum";

export interface Profile {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  dateOfBirth: number | null;
  contactNumber: string | null;
  countryOfResidence: string | null;
  zipCode: string | null;
  accountType: ProfileType;
  shipments: [number | null] | null;
}
