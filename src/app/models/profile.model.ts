import { ProfileType } from "../enums/profile-type.enum";

export interface Profile {
  //id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  dateOfBirth: number | null;
  countryOfResidence: string | null;
  postalCode: string | null;
  contactNumber: string | null;
  //accountType: ProfileType;
  //shipments: [number | null] | null;
}
