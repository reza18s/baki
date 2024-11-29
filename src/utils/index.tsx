import { IcAdvertisingContent } from '@/components/icons/IcAdvertisingContent';
import { IcAnInsult } from '@/components/icons/IcAnInsult';
import { IcFakeProfile } from '@/components/icons/IcFakeProfile';
import { IcFraud } from '@/components/icons/IcFraud';
import { IcImmoralContent } from '@/components/icons/IcImmoralContent';
import { SearchTypes } from '@/lib';

export const getSearchTypeLabel = (value: string) => {
  return SearchTypes.find((val) => val.value === value)?.label;
};

export const optionTexts: {
  label: string;
  icon?: ((select: boolean) => React.ReactNode) | React.ReactNode;
}[] = [
  {
    label: 'پروفایل جعلی',
    icon: (select) => (
      <IcFakeProfile
        className={select ? 'fill-brand-yellow' : ''}
      ></IcFakeProfile>
    ),
  },
  {
    label: 'محتوای غیراخلاقی',
    icon: (select) => (
      <IcImmoralContent
        className={select ? 'fill-brand-yellow' : ''}
      ></IcImmoralContent>
    ),
  },
  {
    label: 'توهین',
    icon: (select) => (
      <IcAnInsult className={select ? 'fill-brand-yellow' : ''}></IcAnInsult>
    ),
  },
  {
    label: 'کلاه‌برداری',
    icon: (select) => (
      <IcFraud className={select ? 'fill-brand-yellow' : ''}></IcFraud>
    ),
  },
  {
    label: 'محتوای تبلیغاتی',
    icon: (select) => (
      <IcAdvertisingContent
        className={select ? 'fill-brand-yellow' : ''}
      ></IcAdvertisingContent>
    ),
  },
];
