import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          "Haircuts By Edwin": "Haircuts By Edwin",
          "Barber Filter": "Barber Filter",
          "Time Slot": "Time Slot",
          Book: "Book",
          Booked: "Booked",
          "Make a Booking": "Make a Booking",
          Date: "Date",
          Time: "Time",
          "Please fill following information to reserve your spot":
            "Please fill following information to reserve your spot",
          "First Name": "First Name",
          "Last Name": "Last Name",
          Mobile: "Mobile",
          Submit: "Submit",
          "Admin Dashboard": "Admin Dashboard",
          January: "January",
          February: "February",
          March: "March",
          April: "April",
          May: "May",
          June: "June",
          July: "July",
          August: "August",
          September: "September",
          October: "October",
          November: "November",
          December: "December",
        },
      },
      nl: {
        translations: {
          "Haircuts By Edwin": "Kapsels Door Edwin",
          "Barber Filter": "Kapper filter",
          "Time Slot": "Tijdslot",
          Book: "Inschrijven",
          Booked: "Geboekt",
          "Make a Booking": "Een reservering maken",
          Date: "Datum",
          Time: "Tijd",
          "Please fill following information to reserve your spot":
            "Vul de volgende informatie in om uw plek te reserveren",
          "First Name": "Voornaam",
          "Last Name": "Achternaam",
          Mobile: "Mobiel",
          Submit: "Voorleggen",
          "Admin Dashboard": "Beheerdersdashboard",
          January: "januari",
          February: "februari",
          March: "maart",
          April: "april",
          May: "mei",
          June: "juni",
          July: "juli",
          August: "augustus",
          September: "september",
          October: "oktober",
          November: "november",
          December: "december",
        },
      },
    },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
