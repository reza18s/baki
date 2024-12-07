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
}
export type Actions = {
  setSearchType: (value: ISeachType) => void;
  setFilters: (filters: IFilter) => void;
  setBasicInformationsStep: (
    step:
      | ((step: IBasicInformationsStep) => IBasicInformationsStep)
      | IBasicInformationsStep,
  ) => void;
};

export type Store = IStore & Actions;

export const defaultInitState: IStore = {
  basicInformationsStep: 0,
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
}));
