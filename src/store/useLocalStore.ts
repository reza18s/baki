import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StepsNumber } from '../types';
import { Gender } from '../graphql/generated/graphql.codegen';
export type UserInfo = {
  phoneNumber: string;
  name: string;
  gender?: Gender;
  birthdate: string;
  traveledToPlaces: string[];
  languages: string[];
  province: string;
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
  username: string;
  bio: string;
  verified: boolean;
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
  calculateCompletionPercentage: () => number;
  updateUserInfo: (
    userInfo: ((prev: UserInfo) => Partial<UserInfo>) | Partial<UserInfo>,
  ) => void;
  setExploreEntered: () => void;
  addItem: (key: string, val: boolean) => void;
  getItem: (key: string) => boolean;
};

export type Store = IStore & Actions;

export const defaultInitState: IStore = {
  step: 0,
  userInfo: {
    traveledToPlaces: [],
    livedInPlaces: [],
    languages: [],
    verified: false,
    phoneNumber: '',
    name: '',
    birthdate: '',
    images: [],
    province: '',
    travelInterests: [],
    mySpecialty: [],
    personalInterests: [],
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
      calculateCompletionPercentage: () => {
        const userInfo = get().userInfo;
        const fields = [
          userInfo.name,
          userInfo.username,
          userInfo.bio,
          userInfo.province,
          userInfo.gender,
          userInfo.images.length >= 4,
          userInfo.personalInterests.length >= 5,
          userInfo.travelInterests.length >= 5,
          userInfo.mySpecialty.length > 0,
          userInfo.maritalStatus,
          userInfo.AmountOfEarlyRising,
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
