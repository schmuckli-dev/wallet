import cookies from 'js-cookie';

export const translations = {
  en: {
    general: {
      save: "Save",
      back: "Back"
    },
    settings: {
      settings: "Settings",
      profile: "Profile",
      displayName: 'Display name',
      email: "Email",
      password: "Password",
      newPassword: "New password",
      newPasswordRepeat: "New password repeat",
      language: "Language"
    }
  },
  de: {
    general: {
      save: "Speichern",
      back: "Zurück"
    },
    settings: {
      settings: "Einstellungen",
      profile: "Profil",
      displayName: 'Anzeigename',
      email: "E-Mail",
      password: "Passwort",
      newPassword: "Neues Passwort",
      newPasswordRepeat: "Neues Passwort wiederholen",
      language: "Sprache"
    }
  }
}

export function getLanguage(){
  return (cookies.get("lang") || navigator.language || navigator.userLanguage).split("-")[0];
}
