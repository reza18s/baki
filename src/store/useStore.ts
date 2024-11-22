import { create } from 'zustand';
export type ISeachType = 'random' | 'baseOnInterest' | 'famous';
export type IFilter = {
  provinces?: string[];
  age?: number[];
  mySpecialty?: string[];
  interest?: string[];
  language?: string;
  status?: string[];
};
interface IStore {
  searchType: ISeachType;
  filters: IFilter;
}
export type Actions = {
  setSearchType: (value: ISeachType) => void;
  setFilters: (filters: IFilter) => void;
};

export type Store = IStore & Actions;

export const defaultInitState: IStore = {
  searchType: 'random',
  filters: {},
};

export const useStore = create<Store>()((set, get) => ({
  ...defaultInitState,
  setSearchType(value) {
    set({ searchType: value });
  },
  setFilters: (filters) => {
    set({ filters });
  },
}));
