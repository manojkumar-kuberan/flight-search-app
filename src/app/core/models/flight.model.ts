export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;

  departure: {
    airport: string;
    time: string;
  };

  arrival: {
    airport: string;
    time: string;
  };

  duration: string;
  price: number;
  stops: number;

  aircraft?: string;
  baggage?: string;
  cabinClass?: string;
}