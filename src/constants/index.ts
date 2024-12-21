export { allIcon } from './allIcons';
export { languages } from './languages';
export { iranProvinces } from './iranProvinces';
export { countries } from './countries';
export {
  PersonalInterestsItems,
  SpecialtyItems,
  TravelInterestsItems,
} from './items';
export const months = [
  { label: 'فروردین', key: 1 },
  { label: 'اردیبهشت', key: 2 },
  { label: 'خرداد', key: 3 },
  { label: 'تیر', key: 4 },
  { label: 'مرداد', key: 5 },
  { label: 'شهریور', key: 6 },
  { label: 'مهر', key: 7 },
  { label: 'آبان', key: 8 },
  { label: 'آذر', key: 9 },
  { label: 'دی', key: 10 },
  { label: 'بهمن', key: 11 },
  { label: 'اسفند', key: 12 },
];

export const spiritStatus = [
  { label: 'درون‌گرا', value: 'introvert' },
  { label: 'برون‌گرا', value: 'extroverted' },
];
export const sportStatus = [
  { label: 'به طور منظم', value: 'regularly' },
  { label: 'بعضی‌وقت‌ها', value: 'sometimes' },
  { label: 'خیلی کم', value: 'never' },
];
export const MaritalStatus = [
  { label: 'متاهل', value: 'married' },
  { label: 'مجرد', value: 'single' },
];
export const gender = [
  { label: 'زن', value: 'female' },
  { label: 'مرد', value: 'male' },
];
export const zodiacSigns = [
  {
    label: 'حمل',
    value: 'Aries',
  },
  {
    label: 'ثور',
    value: 'Taurus',
  },
  {
    label: 'جوزا',
    value: 'Gemini',
  },
  {
    label: 'سرطان',
    value: 'Cancer',
  },
  {
    label: 'اسد',
    value: 'Leo',
  },
  {
    label: 'سنبله',
    value: 'Virgo',
  },
  {
    label: 'میزان',
    value: 'Libra',
  },
  {
    label: 'عقرب',
    value: 'Scorpio',
  },
  {
    label: 'قوس',
    value: 'Sagittarius',
  },
  {
    label: 'جدی',
    value: 'Capricorn',
  },
  {
    label: 'دلو',
    value: 'Aquarius',
  },
  {
    label: 'حوت',
    value: 'Pisces',
  },
];
export const AmountOfEarlyRising = [
  { label: 'سحرخیز', value: 'wakeUpEarly' },
  { label: 'خواب‌آلود', value: 'sleepy' },
  { label: 'آن‌تایم', value: 'onTime' },
];
export const smokeStatus = [
  { label: 'به طور منظم', value: 'regularly' },
  { label: 'بعضی‌وقت‌ها', value: 'sometimes' },
  { label: 'هرگز', value: 'never' },
];
export const getSmokeStatusLabel = (value?: string) => {
  if (!value) {
    return undefined;
  }
  return smokeStatus.find((val) => val.value === value)?.label;
};
export const getZodiacSignsLabel = (value?: string) => {
  if (!value) {
    return undefined;
  }
  return zodiacSigns.find((val) => val.value === value)?.label;
};
export const getAmountOfEarlyRisingLabel = (value?: string) => {
  if (!value) {
    return undefined;
  }
  return AmountOfEarlyRising.find((val) => val.value === value)?.label;
};
export const getGenderLabel = (value?: string) => {
  if (!value) {
    return undefined;
  }
  return gender.find((val) => val.value === value)?.label;
};
export const getMaritalStatusLabel = (value?: string) => {
  if (!value) {
    return undefined;
  }
  return MaritalStatus.find((val) => val.value === value)?.label;
};
export const getSpiritStatusLabel = (value?: string) => {
  if (!value) {
    return undefined;
  }
  return spiritStatus.find((val) => val.value === value)?.label;
};
export const getSportStatusLabel = (value?: string) => {
  if (!value) {
    return undefined;
  }
  return sportStatus.find((val) => val.value === value)?.label;
};
export const getMonthLabel = (value?: string) => {
  if (!value) {
    return undefined;
  }
  const [year, month] = value.split('/');
  return `${months.find((val) => val.key === +month)?.label}${year}`;
};
