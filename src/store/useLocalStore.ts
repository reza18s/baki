import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StepsNumber } from '../types';
import { Gender } from '../graphql/generated/graphql.codegen';
export type UserInfo = {
  phoneNumber: string;
  name: string;
  gender?: Gender;
  birthdate: string;
  residenceCity: string;
  pictures: string[];
  travelsInterests: string[];
  personalInterests: string[];
  specialty: string[];
  maritalStatus: 'single' | 'married' | null;
  smokeStatus: 'never' | 'sometimes' | 'regularly' | null;
  sportsStatus: 'never' | 'sometimes' | 'regularly' | null;
  AmountOfEarlyRising: 'wakeUpEarly' | 'sleepy' | 'onTime' | null;
  username: string;
  bio: string;
};
interface IStore {
  step: StepsNumber;
  userInfo: UserInfo;
  ExploreEntered: boolean;
}
export type Actions = {
  setSteps: (step: ((step: StepsNumber) => StepsNumber) | StepsNumber) => void;
  handlePrevStep: () => void;
  handleNextStep: () => void;
  updateUserInfo: (userInfo: Partial<UserInfo>) => void;
  setExploreEntered: () => void;
  addItem: (key: string, val: boolean) => void;
  getItem: (key: string) => boolean;
};

export type Store = IStore & Actions;

export const defaultInitState: IStore = {
  step: 0,
  userInfo: {
    phoneNumber: '',
    name: '',
    birthdate: '',
    pictures: [],
    residenceCity: '',
    travelsInterests: [],
    specialty: [],
    personalInterests: [],
    gender: undefined,
    maritalStatus: null,
    smokeStatus: null,
    sportsStatus: null,
    AmountOfEarlyRising: null,
    username: '',
    bio: '',
  },
  ExploreEntered: false,
};

export const useLocalStore = create<Store>()(
  persist(
    (set, get) => ({
      ...defaultInitState,
      setSteps: (step) => {
        if (typeof step === 'number') {
          if (step < 0 || step > 10) {
            return;
          }
          set({ step: step });
          return;
        }
        set((prev) => {
          if (step(prev.step) < 0 || step(prev.step) > 10) {
            return prev;
          }
          return { step: step(prev.step) };
        });
      },
      handleNextStep: () => {
        get().setSteps((prev) => (prev + 1) as StepsNumber);
      },
      handlePrevStep: () => {
        get().setSteps((prev) => (prev + 1) as StepsNumber);
      },
      updateUserInfo: (userInfo) => {
        set((prev) => ({ userInfo: { ...prev.userInfo, ...userInfo } }));
      },
      setExploreEntered() {
        set({ ExploreEntered: true });
      },
      addItem: (key, val) => {
        set({ [key]: val });
      },
      getItem: (key) => {
        // @ts-expect-error the
        return get()[key];
      },
    }),
    { name: 'store' },
  ),
);
