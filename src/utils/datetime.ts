import moment from "jalali-moment";

export const ceilTime = (timeMinute: number) => {
  const hour = timeMinute / 60;
  if (hour > 0) {
    return Math.ceil(hour);
  }
  return timeMinute;
};

export const secondsToMMSS = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
};

export const persianLongDate = (date: string): string => {
  return moment(date).locale("fa").format("DD MMMM YYYY");
};

export const persianShortDate = (date: string): string => {
  return moment(date).locale("fa").format("YYYY/MM/DD");
};
