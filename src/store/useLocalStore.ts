import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StepsNumber } from '../types';
import { Gender } from '../graphql/generated/graphql.codegen';
export type UserInfo = {
  phoneNumber: string;
  name: string;
  gender?: Gender;
  avatar?: string;
  birthdate: string;
  city?: string;
  traveledToPlaces: string[];
  languages: string[];
  province?: string;
  images: string[];
  travelInterests: string[];
  personalInterests: string[];
  mySpecialty: string[];
  livedInPlaces: string[];
  spiritStatus?: 'extroverted' | 'introvert';
  maritalStatus?: 'single' | 'married';
  smokeStatus?: 'never' | 'sometimes' | 'regularly';
  sportsStatus?: 'never' | 'sometimes' | 'regularly';
  AmountOfEarlyRising?: 'wakeUpEarly' | 'sleepy' | 'onTime';
  zodiacSign?: string;
  username: string;
  bio: string;
  mainImage: string;
  verified: boolean;
  record?: string;
};
interface IFirstEntered {
  showSearchType: boolean;
  swapLeft: boolean;
  swapRight: boolean;
  showUndo: boolean;
  noImage: { id?: string; time: number };
}
interface IStore {
  step: StepsNumber;
  userInfo: UserInfo;
  firstEntered: IFirstEntered;
  scroll?: {
    [key: string]: number;
  };
}
export type Actions = {
  setSteps: (step: ((step: StepsNumber) => StepsNumber) | StepsNumber) => void;
  handlePrevStep: () => void;
  handleNextStep: () => void;
  calculateCompletionPercentage: () => number;
  updateUserInfo: (
    userInfo: ((prev: UserInfo) => Partial<UserInfo>) | Partial<UserInfo>,
  ) => void;
  updateFirstEntered: (
    firstEntered:
      | ((prev: IFirstEntered) => Partial<IFirstEntered>)
      | Partial<IFirstEntered>,
  ) => void;
  addItem: (key: string, val: boolean) => void;
  getItem: (key: string) => boolean;
  setLastScroll: (key: string, val: number) => void;
};

export type Store = IStore & Actions;

export const defaultInitState: IStore = {
  step: 0,
  userInfo: {
    traveledToPlaces: [],
    livedInPlaces: [],
    languages: [],
    mainImage: '',
    verified: false,
    phoneNumber: '',
    name: '',
    birthdate: '',
    images: [],
    travelInterests: [],
    mySpecialty: [],
    personalInterests: [],
    username: '',
    bio: '',
  },
  firstEntered: {
    showSearchType: false,
    showUndo: false,
    swapLeft: false,
    swapRight: false,
    noImage: { time: 0 },
  },
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
      calculateCompletionPercentage: () => {
        const userInfo = get().userInfo;
        const fields = [
          userInfo.name,
          userInfo.username,
          userInfo.bio,
          userInfo.province,
          userInfo.gender,
          userInfo.mainImage,
          userInfo.images.length >= 3,
          userInfo.personalInterests.length >= 5,
          userInfo.travelInterests.length >= 5,
          userInfo.mySpecialty.length > 0,
          userInfo.maritalStatus,
          userInfo.AmountOfEarlyRising,
          userInfo.record,
          userInfo.avatar,
          userInfo.smokeStatus,
          userInfo.spiritStatus,
          userInfo.sportsStatus,
          userInfo.username,
          userInfo.verified,
        ];
        const completedFields = fields.filter(Boolean).length;
        return Math.round((completedFields / fields.length) * 100);
      },
      handleNextStep: () => {
        get().setSteps((prev) => (prev + 1) as StepsNumber);
      },
      handlePrevStep: () => {
        get().setSteps((prev) => (prev - 1) as StepsNumber);
      },
      updateUserInfo: (userInfo) => {
        if (typeof userInfo === 'function') {
          set((prev) => ({
            userInfo: { ...prev.userInfo, ...userInfo(prev.userInfo) },
          }));
        } else {
          set((prev) => ({ userInfo: { ...prev.userInfo, ...userInfo } }));
        }
      },
      updateFirstEntered: (firstEntered) => {
        if (typeof firstEntered === 'function') {
          set((prev) => ({
            firstEntered: {
              ...prev.firstEntered,
              ...firstEntered(prev.firstEntered),
            },
          }));
        } else {
          set((prev) => ({
            firstEntered: { ...prev.firstEntered, ...firstEntered },
          }));
        }
      },
      addItem: (key, val) => {
        set({ [key]: val });
      },
      getItem: (key) => {
        // @ts-expect-error the
        return get()[key];
      },
      setLastScroll: (key, val) => {
        set((prev) => ({ scroll: { ...prev.scroll, [key]: val } }));
      },
    }),
    { name: 'store' },
  ),
);
