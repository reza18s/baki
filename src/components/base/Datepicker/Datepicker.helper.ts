import { Moment } from "jalali-moment";

export const persianWeekDays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];

export const getPersianMonth = (moment: Moment) => {
  moment.locale("fa");
  const month = moment.format("MMMM");
  return month;
};
