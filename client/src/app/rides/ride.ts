export interface Ride {
  _id: {
    $oid: string;
  };
  driver: string;
  notes: string;
  seatsAvailable: number;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  dateObject: string;
}
