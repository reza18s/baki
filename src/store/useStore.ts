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
export type IBasicInformationsStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
interface IStore {
  basicInformationsStep: IBasicInformationsStep;
  searchType: ISeachType;
  filters: IFilter;
  isSearch: boolean;
  search: string;
  searches: string[];
  selectSearch: string;
}
export type Actions = {
  setSearchType: (value: ISeachType) => void;
  setFilters: (filters: IFilter) => void;
  setBasicInformationsStep: (
    step:
      | ((step: IBasicInformationsStep) => IBasicInformationsStep)
      | IBasicInformationsStep,
  ) => void;
  setIsSearch: (e: ((prev: boolean) => boolean) | boolean) => void;
  setSearch: (e: ((prev: string) => string) | string) => void;
  setSelectSearch: (e: ((prev: string) => string) | string) => void;
  setSearches: (e: ((prev: string[]) => string[]) | string[]) => void;
};

export type Store = IStore & Actions;

export const defaultInitState: IStore = {
  basicInformationsStep: 0,
  searchType: 'random',
  filters: {},
  isSearch: false,
  search: '',
  searches: [],
  selectSearch: '',
};

export const useStore = create<Store>()((set, get) => ({
  ...defaultInitState,
  setSearchType(value) {
    set({ searchType: value });
  },
  setFilters: (filters) => {
    set({ filters });
  },
  setBasicInformationsStep: (step) => {
    if (typeof step === 'number') {
      if (step < 0 || step > 10) {
        return;
      }
      set({ basicInformationsStep: step });
      return;
    }
    set((prev) => {
      if (
        step(prev.basicInformationsStep) < 0 ||
        step(prev.basicInformationsStep) > 10
      ) {
        return prev;
      }
      return { basicInformationsStep: step(prev.basicInformationsStep) };
    });
  },
  setIsSearch: (e) => {
    if (typeof e == 'boolean') {
      set({ isSearch: e });
    } else if (typeof e === 'function') {
      set({ isSearch: e(get().isSearch) });
    }
  },
  setSearch: (e) => {
    if (typeof e == 'string') {
      set({ search: e });
    } else if (typeof e === 'function') {
      set({ search: e(get().search) });
    }
  },
  setSearches: (e) => {
    if (typeof e == 'object') {
      set({ searches: e });
    } else if (typeof e === 'function') {
      set({ searches: e(get().searches) });
    }
  },
  setSelectSearch: (e) => {
    if (typeof e == 'string') {
      set({ selectSearch: e });
    } else if (typeof e === 'function') {
      set({ selectSearch: e(get().selectSearch) });
    }
  },
}));
