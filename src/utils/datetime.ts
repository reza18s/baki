import moment from 'jalali-moment';
import jalaali, { toGregorian } from 'jalaali-js';

import { DateTime } from 'luxon';

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
export function formatLastSeen(lastSeenS: Date): string {
  const now = new Date();
  const lastSeen = new Date(lastSeenS);
  const diffInSeconds = Math.floor((now.getTime() - lastSeen.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `آخرین بازدید ${diffInSeconds} ثانیه پیش`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `آخرین بازدید ${diffInMinutes} دقیقه پیش`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `آخرین بازدید ${diffInHours} ساعت پیش`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return 'دیروز';
  } else if (diffInDays < 7) {
    return lastSeen.toLocaleDateString(undefined, { weekday: 'long' });
  } else {
    return lastSeen.toLocaleDateString();
  }
}
export function getLastMessageTime(lastMessageTimestamp: string): string {
  const lastMessageDate =
    DateTime.fromISO(lastMessageTimestamp).setZone('Asia/Tehran');
  const now = DateTime.now().setZone('Asia/Tehran');

  // Calculate the difference in milliseconds
  const diff = now.toMillis() - lastMessageDate.toMillis();

  // Constants for time calculations
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

  if (diff < oneDay) {
    // Check if it's "yesterday"
    if (lastMessageDate.day === now.minus({ days: 1 }).day) {
      return 'دیروز';
    }
    // Show the time in HH:MM format (24-hour clock)
    return lastMessageDate.toFormat('HH:mm');
  } else if (diff < 7 * oneDay) {
    // Show the day name in Persian
    const days = [
      'یک‌شنبه',
      'دوشنبه',
      'سه‌شنبه',
      'چهارشنبه',
      'پنج‌شنبه',
      'جمعه',
      'شنبه',
    ];
    return days[lastMessageDate.weekday % 7];
  } else {
    // Show the date in Persian format YYYY/MM/DD
    const jalaaliDate = jalaali.toJalaali(
      lastMessageDate.year,
      lastMessageDate.month,
      lastMessageDate.day,
    );
    return `${jalaaliDate.jy}/${jalaaliDate.jm.toString().padStart(2, '0')}/${jalaaliDate.jd.toString().padStart(2, '0')}`;
  }
}
export function calculateAgeFromJalali(birthDateJalali: string): number {
  // اگر روز مشخص نشده باشد، روز ۱م را به صورت پیش‌فرض اضافه می‌کنیم
  const fullDate = birthDateJalali.includes('/')
    ? birthDateJalali.split('/').length === 2
      ? `${birthDateJalali}/1`
      : birthDateJalali
    : `${birthDateJalali}/1/1`;

  // جدا کردن سال، ماه و روز
  const [birthYear, birthMonth, birthDay] = fullDate.split('/').map((value) => {
    const num = Number(value.trim()); // حذف فاصله اضافی و تبدیل به عدد
    if (isNaN(num)) {
      throw new Error("Invalid date format. Please use 'YYYY/MM/DD'.");
    }
    return num;
  });

  // تبدیل تاریخ شمسی به میلادی
  const gregorianDate = toGregorian(birthYear, birthMonth, birthDay);

  // تاریخ امروز میلادی
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1; // ماه‌ها از 0 شروع می‌شوند
  const todayDay = today.getDate();

  // محاسبه سن
  let age = todayYear - gregorianDate.gy;
  if (
    todayMonth < gregorianDate.gm ||
    (todayMonth === gregorianDate.gm && todayDay < gregorianDate.gd)
  ) {
    age--; // هنوز تولد نرسیده
  }

  return age;
}
