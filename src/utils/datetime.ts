import moment from 'jalali-moment';
import jalaali from 'jalaali-js';
export const ceilTime = (timeMinute: number) => {
  const hour = timeMinute / 60;
  if (hour > 0) {
    return Math.ceil(hour);
  }
  return timeMinute;
};
export function calculateElapsedTime(
  pastDate: string | Date,
  returnAsString: boolean = true,
): string | number {
  const now = new Date(); // تاریخ فعلی
  const past = new Date(pastDate); // تبدیل تاریخ ورودی به شیء تاریخ

  // بررسی اینکه آیا تاریخ معتبر است یا نه
  if (isNaN(past.getTime())) {
    return 'تاریخ نامعتبر است!';
  }

  // محاسبه تفاوت زمانی
  const elapsed = now.getTime() - past.getTime();

  // تبدیل تفاوت به واحدهای مختلف زمانی
  const seconds = Math.floor(elapsed / 1000); // ثانیه
  const minutes = Math.floor(seconds / 60); // دقیقه
  const hours = Math.floor(minutes / 60); // ساعت
  const days = Math.floor(hours / 24); // روز
  const weeks = Math.floor(days / 7); // هفته
  const months = Math.floor(days / 30); // ماه
  const years = Math.floor(days / 365); // سال

  // انتخاب خروجی با شرط سه‌گانه
  if (seconds < 60) {
    return returnAsString ? `${seconds} ثانیه پیش` : hours;
  } else if (minutes < 60) {
    return returnAsString ? `${minutes} دقیقه پیش` : hours;
  } else if (hours < 24) {
    return returnAsString ? `${hours} ساعت پیش` : hours;
  } else if (days < 7) {
    return returnAsString ? `${days} روز پیش` : hours;
  } else if (weeks < 4) {
    return returnAsString ? `${weeks} هفته پیش` : hours;
  } else if (months < 12) {
    return returnAsString ? `${months} ماه پیش` : hours;
  } else {
    return returnAsString ? `${years} سال پیش` : hours;
  }
}

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
