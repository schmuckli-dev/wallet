import cookies from 'js-cookie';
import english from "./assets/i18n/en";
import german from "./assets/i18n/de";

export const translations = {
  en: english,
  de: german,
}

export function getLanguage(){
  return (cookies.get("lang") || navigator.language || navigator.userLanguage).split("-")[0];
}
