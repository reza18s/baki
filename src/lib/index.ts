import { ISeachType } from '@/store/useStore';

export const SearchTypes: { label: string; value: ISeachType }[] = [
  { label: 'همسفر تصادفی', value: 'random' },
  { label: 'همسفر بر مبنای علاقه‌مندی', value: 'baseOnInterest' },
  { label: 'همسفر مشهور', value: 'famous' },
];
