import moment from "jalali-moment";

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const validateDatePassed = (date: string, format: string) => {
  const m = moment(date, format);
  const now = moment();

  return m.isBefore(now);
};

export const validatePhoneNumber = (phoneNumber: string) => {
  const mobileReg =
    /(0|\+98)?([ ]|-|[()]){0,2}9[0|1|2|3|4|9]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/gi;
  return phoneNumber.match(mobileReg);
};

export const validateBirthYear = (year: string) => {
  const yearNumber = Number(year);
  return yearNumber > 1319 && yearNumber < 1401;
};
