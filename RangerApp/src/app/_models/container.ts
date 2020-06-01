

export class Containers {
  ID: string;
  Contbilnr: string;
  driverid: number;
  Drivername: string;
  LastStatus: number;
  colorstyle: string;
  PriorityClass: string;
  Til: string;
  Bpx: number;
  src: string;
  srctil: string;
  isIncoming: boolean;
  MovingTo: number;
}


export class EventMessages {
  id: string;
  Container: string;
  DriverID: number;
  Status: number;
  Message: string;
  MovingTo: number;
}