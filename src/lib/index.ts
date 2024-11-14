import { ISeachType } from '@/store/useStore';

export const SearchTypes: {
  label: string;
  value: ISeachType;
  description: string;
}[] = [
  {
    label: 'همسفر تصادفی',
    value: 'random',
    description:
      'همسفر خود را به صورت تصادفی بر اساس شهر یا استان آنها پیدا کنید.',
  },
  {
    label: 'همسفر بر مبنای علاقه‌مندی',
    value: 'baseOnInterest',
    description: 'همسفر خود را برمبنای علاقه‌مندی‌های آنها پیدا کنید.',
  },
  {
    label: 'همسفر مشهور',
    value: 'famous',
    description: 'همسفر خود را بر اساس تخصص آنها پیدا کنید.',
  },
];
