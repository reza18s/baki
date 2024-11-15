import { create } from 'zustand';
export type ISeachType = 'random' | 'baseOnInterest' | 'famous';
interface IStore {
  searchType: ISeachType;
}
export type Actions = {
  setSearchType: (value: ISeachType) => void;
};

export type Store = IStore & Actions;

export const defaultInitState: IStore = {
  searchType: 'random',
};

export const useStore = create<Store>()((set, get) => ({
  ...defaultInitState,
  setSearchType(value) {
    set({ searchType: value });
  },
}));
