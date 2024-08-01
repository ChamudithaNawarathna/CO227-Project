import { Float } from "react-native/Libraries/Types/CodegenTypes";

export class Ticket {
  id: number;
  status: string;
  seat: number;
  title: string;
  busclass: string;
  routeNo: string;
  bookedTime: String;
  duration: string;
  price: Float;
  departure: string;
  departureDate: string;
  departureTime: string;
  terminal: string;
  terminalDate: string;
  terminalTime: string;
  startLocation: string;
  endLocation: string;
  deportHotline: string;

  constructor(
    id: number = 123456789,
    status: string = 'Confirmed',
    seat: number = 5,
    title: string = 'SLTB',
    busclass: string = 'Normal',
    routeNo: string = '222',
    bookedTime: string = new Date().toLocaleString("en-GB", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
    duration: string = '2h 40m',
    price: Float = 700.00,
    departure: string = 'Colombo',
    departureDate: string = new Date().toLocaleString("en-GB", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    departureTime: string = new Date().toLocaleString("en-GB", {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).replace(/\s(am|pm)/i, (match) => match.toUpperCase()),
    terminal: string = 'Kandy',
    terminalDate: string = new Date().toLocaleString("en-GB", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    terminalTime: string = new Date().toLocaleString("en-GB", {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).replace(/\s(am|pm)/i, (match) => match.toUpperCase()),
    startLocation: string = 'Colombo',
    endLocation: string = 'Peradeniya',
    deportHotline: string = '0710000000',
  ) {
    this.id = id;
    this.status = status;
    this.seat = seat;
    this.title = title;
    this.busclass = busclass;
    this.routeNo = routeNo;
    this.bookedTime = bookedTime;
    this.duration = duration;
    this.price = price;
    this.departure = departure;
    this.departureDate = departureDate;
    this.departureTime = departureTime;
    this.terminal = terminal;
    this.terminalDate = terminalDate;
    this.terminalTime = terminalTime;
    this.startLocation = startLocation;
    this.endLocation = endLocation;
    this.deportHotline = deportHotline;
  }
}

class Passenger {
  private id: number;
  private credit: number;

  constructor(id: number, credit: number) {
    this.id = id;
    this.credit = credit;
  }

  buyTicket(ticketPrice: number): void {
    if (this.credit >= ticketPrice) {
      this.credit -= ticketPrice;
      console.log(
        `Passenger ${this.id} purchased a ticket. Remaining credit: ${this.credit}`
      );
    } else {
      console.log(`Insufficient credit for passenger ${this.id}.`);
    }
  }
}

class Employee {
  private id: number;
  private passengerRecords: Map<number, number>; // Maps passenger ID to purchased ticket count

  constructor(id: number) {
    this.id = id;
    this.passengerRecords = new Map();
  }

  recordPurchase(passengerId: number): void {
    if (this.passengerRecords.has(passengerId)) {
      const currentCount = this.passengerRecords.get(passengerId)!;
      this.passengerRecords.set(passengerId, currentCount + 1);
    } else {
      this.passengerRecords.set(passengerId, 1);
    }
  }

  getPassengerRecords(): Map<number, number> {
    return this.passengerRecords;
  }
}

// Example usage:
const passenger1 = new Passenger(1, 100);
const passenger2 = new Passenger(2, 150);

const employee = new Employee(101);

passenger1.buyTicket(50); // Purchased a ticket
passenger2.buyTicket(200); // Insufficient credit

employee.recordPurchase(1);
employee.recordPurchase(1);
employee.recordPurchase(2);

console.log("Employee's passenger records:");
console.log(employee.getPassengerRecords());
