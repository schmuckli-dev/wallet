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
  hotel: "Hotel",
  pk_address_caps: "Address",
  pk_guest_name_caps: "Guest name",
  pk_total_price_caps: "Total price",
  pk_check_in: "Check-In",
  pk_customer_service_phone: "Customer service phone",
  pk_reservation: "Reservation",
  pk_check_out: "Check-Out",
  pk_customer_service_email: "Customer service email",
  passbook_mybooking_cta_01: "MyBooking",
  primary_a: "Origin",
  primary_b: "Destination",
  secondary_d: "Class",
  auxiliary_a: "Zones",
  auxiliary_b: "Type",
  auxiliary_c: "Valid until",
  KEY_PRIMERY: "Name",
  KEY_SECONDARY_TICKETTYPENAME: "Ticket type",
  lastname_label: "Last name",
  firstname_label: "First name",
  coach_label: "Coach",
  place_label: "Place",
  trainnumber_label: "Trainnumber",
  departure_label: "Departure",
  arrival_label: "Arrival"
}

export function convertLabel(label){
  if(labels[label]) {
    return labels[label];
  } else {
    return label;
  }
}
