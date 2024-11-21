import moment from 'jalali-moment';
import jalaali from 'jalaali-js';
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
  return moment(date).locale('fa').format('DD MMMM YYYY');
};

export const persianShortDate = (date: string): string => {
  return moment(date).locale('fa').format('YYYY/MM/DD');
};
export function convertJalaliToGregorian(jalaliDate: string): string {
  const [year, month] = jalaliDate.split('-').map(Number); // جدا کردن سال و ماه
  const { gy, gm, gd } = jalaali.toGregorian(year, month, 1); // تبدیل به میلادی با فرض روز اول
  return `${gy}-${gm.toString().padStart(2, '0')}-${gd.toString().padStart(2, '0')}`; // بازگشت تاریخ به فرمت yyyy-mm-dd
}
export function convertGregorianToJalali(gregorianDate: string): string {
  const [year, month, day] = gregorianDate.split('-').map(Number); // جدا کردن سال، ماه، روز
  const { jy, jm, jd } = jalaali.toJalaali(year, month, day); // تبدیل به شمسی
  return `${jy}-${jm.toString().padStart(2, '0')}-${jd.toString().padStart(2, '0')}`; // بازگشت تاریخ به فرمت yyyy/mm/dd
}
