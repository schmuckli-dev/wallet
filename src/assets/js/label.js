const labels = {
  restxt_venue: "Venue",
  restxt_seat: "Seat",
  restxt_price: "Price",
  restxt_additional_accesscode: "Additional accesscode",
  restxt_event: "Event",
  departsHeading: "Departing",
  destinationHeading: "Destination",
  passengerHeading: "Passenger",
  stateHeading: "State",
  flightHeading: "Flight",
  dateHeading: "Date",
  boardingHeading: "Boarding",
  classHeading: "Class",
  eTicketHeading: "e-Ticket",
  pricePlan: "Price plan",
  seatCategory: "Seat",
  passengerCategory: "Passenger Category",
  routeOrProduct: "Route or product",
  KEY_PRIMERY: "Name",
  KEY_SECONDARY_TICKETTYPENAME: "Ticket type",
}

export function convertLabel(label){
  if(labels[label]) {
    return labels[label];
  } else {
    return label;
  }
}
