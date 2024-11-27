import { SearchTypes } from '@/lib';

export const getSearchTypeLabel = (value: string) => {
  return SearchTypes.find((val) => val.value === value)?.label;
};
