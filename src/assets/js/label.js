const labels = {
  restxt_venue: "Venue",
  restxt_seat: "Seat",
  restxt_price: "Price",
  restxt_additional_accesscode: "Additional accescode",
  restxt_event: "Event"
}

export function convertLabel(label){
  if(labels[label]) {
    return labels[label];
  } else {
    return label;
  }
}
