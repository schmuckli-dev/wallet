const MONTHS = [
  "months.january",
  "months.february",
  "months.march",
  "months.april",
  "months.may",
  "months.june",
  "months.july",
  "months.august",
  "months.september",
  "months.october",
  "months.november",
  "months.december"
];

export function getFormattedDate(date_string){
  var date = new Date(date_string);
  if(date instanceof Date && !isNaN(date)){
    return ((date.getDate())+"").padStart(2, '0') + "." + ((date.getMonth() + 1)+"").padStart(2, '0') + "." + date.getFullYear() + " " +
    (date.getHours()+"").padStart(2, '0') + ":" + (date.getMinutes()+"").padStart(2, '0');
  } else {
    return "";
  }
}

export function getFormattedJustDate(date_string){
  var date = new Date(date_string);
  if(date instanceof Date && !isNaN(date)){
    return ((date.getDate())+"").padStart(2, '0') + "." + ((date.getMonth() + 1)+"").padStart(2, '0') + "." + date.getFullYear();
  } else {
    return "";
  }
}

export function getFormattedJustDateUS(date_string){
  var date = new Date(date_string);
  if(date instanceof Date && !isNaN(date)){
    return date.getFullYear() + "-" + ((date.getMonth() + 1)+"").padStart(2, '0') + "-" + (date.getDate()+"").padStart(2, '0');
  } else {
    return "";
  }
}

export function getFormattedJustTime(date_string){
  var date = new Date(date_string);
  if(date instanceof Date && !isNaN(date)){
    return (date.getHours()+"").padStart(2, '0') + ":" + (date.getMinutes()+"").padStart(2, '0');
  } else {
    return "";
  }
}

export function getMonth(date_string){
  var date = new Date(date_string);
  if(date instanceof Date && !isNaN(date)){
    return MONTHS[date.getMonth()];
  } else {
    return "";
  }
}
export function getYear(date_string){
  var date = new Date(date_string);
  if(date instanceof Date && !isNaN(date)){
    return date.getFullYear();
  } else {
    return "";
  }
}
