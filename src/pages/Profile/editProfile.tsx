import * as SolarIconSet from 'solar-icon-set';
import BakiBanner from '../../assets/img/profile/BakiBanner.svg';
import UploadPictures from '../../components/shared/Inputs/UploadPictures';
import TextInput from '../../components/shared/Inputs/TextInput';
import { useForm } from 'react-hook-form';
import ArrowButton from '../../components/shared/Buttons/ArrowButton';
import { LiaSmokingSolid } from 'react-icons/lia';
import { PiGraphLight } from 'react-icons/pi';
import { TbZodiacAries } from 'react-icons/tb';
import { CiStar } from 'react-icons/ci';
import { useEffect, useRef, useState } from 'react';
import { useLocalStore, UserInfo } from '@/store/useLocalStore';
import { useUpdateUserMutation } from '@/graphql/generated/graphql.codegen';
import { Page } from '@/components/layout/Page';
import AppBar from '@/components/layout/Header/AppBar';
import { LanguageModal } from '@/components/shared/modals/languageModal';
import { LivedInPlacesModal } from '@/components/shared/modals/livedInPlacesModal';
import { TraveledToPlacesModal } from '@/components/shared/modals/traveledToPlacesModal';
import { customToast } from '@/components/base/toast';
import { paths } from '@/routes/paths';
import { IcVerifiedCheck } from '@/components/icons/IcVerifiedCheck';
import {
  allIcon,
  getAmountOfEarlyRisingLabel,
  getGenderLabel,
  getMaritalStatusLabel,
  getMonthLabel,
  getSmokeStatusLabel,
  getSpiritStatusLabel,
  getSportStatusLabel,
  getZodiacSignsIcon,
  getZodiacSignsLabel,
} from '@/constants';
import { useStore } from '@/store/useStore';
import { useHistory } from 'react-router';

export default function EditProfile() {
  const [isOpen, setIsOpen] = useState<
    'language' | 'livedInPlaces' | 'traveledToPlaces'
  >();
  const hs = useHistory();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const userInfo = useLocalStore((store) => store.userInfo);
  const calculateCompletionPercentage = useLocalStore(
    (store) => store.calculateCompletionPercentage,
  );
  const { control, watch } = useForm<{
    name: string;
    username: string;
    bio: string;
  }>({
    defaultValues: {
      username: userInfo.username,
      name: userInfo.name,
      bio: userInfo.bio,
    },
  });

  const [updateUser] = useUpdateUserMutation();
  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);
  const setBasicInformationsStep = useStore((s) => s.setBasicInformationsStep);

  const [bio, username, name] = [
    watch('bio'),
    watch('username'),
    watch('name'),
  ];

  const timeoutRef = useRef<number | null>(null); // Specify the type here
  useEffect(() => {
    // Clear any existing timer
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    // Set a new timer
    timeoutRef.current = window.setTimeout(() => {
      if (
        userInfo.username === username &&
        userInfo.name === name &&
        userInfo.bio === bio
      ) {
        return;
      }
      updateUserInfo({
        name: name,
        username: username,
        bio: bio,
      });
      updateUser({
        variables: {
          name: name,
          username: username,
          bio: bio,
        },
        onCompleted: () => {
          customToast('اطلاعات شما با موفقیت ثبت شد', 'success');
        },
        onError: () => {
          customToast('مشکلی پیش آمده است لطفا دوباره امتحان کنید', 'error');
        },
      });
    }, 1000);
    // Cleanup timer on unmount or if values change
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [bio, username, name]); // Depend on changes in bio, username, and name
  const handleFilterChange = (key: keyof UserInfo, value: string) => {
    updateUserInfo((prev) => {
      const currentValues = prev[key] as string[];
      return {
        ...prev,
        [key]: currentValues?.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...(currentValues || []), value],
      };
    });
  };
  return (
    <Page
      header={<AppBar title="ویرایش پروفایل"></AppBar>}
      contentClassName="flex w-full flex-col items-center gap-2 p-6 pt-20 pb-20"
      scrollY
    >
      <div>
        <div className="w-full text-brand-black">
          <h2 className="mr-3 text-sm font-semibold text-gray-500">
            تکمیل پروفایل:
          </h2>
          <ArrowButton
            url="/profile/complete_profile"
            text={`${calculateCompletionPercentage()} درصد کامل شده`}
            className={`${
              calculateCompletionPercentage() === 100
                ? 'bg-brand-green'
                : 'bg-brand-yellow'
            }`}
          />
        </div>
        <div className="w-full mt-8">
          <h2 className="mr-3 text-sm font-semibold text-gray-500">
            تایید هویت
          </h2>
          <ArrowButton
            icon={
              <IcVerifiedCheck
                className={`${userInfo.verified ? '' : 'fill-none stroke-black'}`}
              />
            }
            url={
              !userInfo.verified
                ? '/profile/complete_profile/identify_verification'
                : undefined
            }
            text={userInfo.verified ? ' تایید شده' : 'تایید شماره موبایل'}
          />
        </div>
        <div className="flex w-full items-center py-8">
          <img src={BakiBanner} alt="BakiBanner" />
        </div>
        {/* Upload Picture */}
        <div className="flex min-h-fit w-full flex-col items-center gap-y-3">
          <h1 className="w-full pr-3 text-gray-500">انتخاب عکس</h1>
          <UploadPictures onChange />
        </div>
        {/* About Me */}
        <div className="flex min-h-fit w-full flex-col items-center gap-y-3">
          <h1 className="w-full text-lg font-bold">درباره من</h1>
          <div className="w-full">
            <h2 className="mr-3 py-[8px] text-sm font-semibold text-gray-500">
              نام
            </h2>
            <TextInput
              placeholder="نام"
              control={control}
              icon={<SolarIconSet.UserRounded size={30} />}
              name="name"
              value={watch('name')}
            />
          </div>
          <div className="w-full">
            <h2 className="mr-3 py-[8px] text-sm font-semibold text-gray-500">
              نام کاربری
            </h2>
            <TextInput
              placeholder="نام کاربری حسابتان ..."
              control={control}
              icon={<SolarIconSet.UserCircle size={30} />}
              name="username"
              value={watch('username')}
            />
          </div>
          <div className="w-full" id="biography" ref={scrollContainerRef}>
            <h2 className="mr-3 py-[8px] text-sm font-semibold text-gray-500">
              بیوگرافی
            </h2>
            <TextInput
              placeholder="از علایق، ویژگی‌ها و هرچی دوست دارین درباره خودتون بگید..."
              multiline={true}
              rows={3}
              control={control}
              name="bio"
              value={watch('bio')}
            />
          </div>
          <div className="w-full text-brand-black">
            <h2 className="mr-3 pb-[9px] pt-4 text-sm font-semibold text-gray-500">
              محل زندگی
            </h2>
            <ArrowButton
              url={paths.profile.completeProvinces}
              text="محل زندگی کنونی خود را وارد کنید"
              icon={<SolarIconSet.Home size={24} />}
            />
          </div>
        </div>
        {/* Basic Information */}
        <div className="flex min-h-fit w-full flex-col items-center gap-y-3 pt-4">
          <h1 className="w-full pb-1 text-lg font-bold">اطلاعات اولیه</h1>
          <div className="flex w-full flex-col gap-y-2">
            <ArrowButton
              text="جنسیت"
              onClick={() => setBasicInformationsStep(0)}
              url={paths.profile.basicInformations}
              arrowText={getGenderLabel(userInfo.gender)}
              isArrowText
              className="w-full"
              icon={<SolarIconSet.UserId size={24} />}
            />
            <ArrowButton
              text="سال و ماه تولد"
              onClick={() => setBasicInformationsStep(1)}
              url={paths.profile.basicInformations}
              arrowText={getMonthLabel(userInfo.birthdate)}
              isArrowText
              className="w-full"
              icon={<SolarIconSet.Calendar size={24} />}
            />
            <ArrowButton
              text="وضعیت تاهل"
              url={paths.profile.basicInformations}
              onClick={() => setBasicInformationsStep(2)}
              arrowText={getMaritalStatusLabel(userInfo.maritalStatus)}
              isArrowText
              className="w-full"
              icon={<SolarIconSet.Heart size={24} />}
            />
            <ArrowButton
              text="سیگار"
              url={paths.profile.basicInformations}
              onClick={() => setBasicInformationsStep(3)}
              arrowText={getSmokeStatusLabel(userInfo.smokeStatus)}
              isArrowText
              className="w-full"
              icon={<LiaSmokingSolid size={24} />}
            />
            <ArrowButton
              text="ورزش"
              url={paths.profile.basicInformations}
              onClick={() => setBasicInformationsStep(4)}
              arrowText={getSportStatusLabel(userInfo.sportsStatus)}
              isArrowText
              className="w-full"
              icon={<SolarIconSet.DumbbellSmall size={24} />}
            />
            <ArrowButton
              text="میزان سحرخیزی"
              url={paths.profile.basicInformations}
              onClick={() => setBasicInformationsStep(5)}
              arrowText={getAmountOfEarlyRisingLabel(
                userInfo.AmountOfEarlyRising,
              )}
              isArrowText
              className="w-full"
              icon={<SolarIconSet.SunFog size={24} />}
            />
            <ArrowButton
              text="روحیه"
              url={paths.profile.basicInformations}
              onClick={() => setBasicInformationsStep(6)}
              arrowText={getSpiritStatusLabel(userInfo.spiritStatus)}
              isArrowText
              className="w-full"
              icon={<SolarIconSet.MaskHapply size={24} />}
            />
            <div>
              <div className="flex w-full items-center justify-between rounded-[12px] bg-gray-100 px-6 py-[12px]">
                <div className="flex items-center gap-x-2">
                  <PiGraphLight size={24} />
                  <p className="text-sm font-medium text-[#94A3B8]">
                    نشان زودیاک
                  </p>
                </div>
                <div className="flex items-center gap-x-2">
                  <p className="text-sm font-medium text-[#94A3B8]">
                    {getZodiacSignsLabel(userInfo.zodiacSign)}
                  </p>
                  {getZodiacSignsIcon(userInfo.zodiacSign)}
                </div>
              </div>
              <p className="pr-3 pt-1 text-[10px]">
                نشان زودیاک شما با توجه به ماه تولد شما تعیین شده است.
              </p>
            </div>
          </div>
        </div>
        {/* More about Me */}
        <div className="flex min-h-fit w-full flex-col items-center gap-y-3 pt-5">
          <h1 className="w-full pb-2 text-lg font-bold">
            موارد بیشتر درباره من
          </h1>
          <div className="w-full">
            <h2 className="mr-3 py-[8px] text-sm font-semibold text-gray-500">
              تخصص
            </h2>
            {userInfo.mySpecialty.length > 0 ? (
              <div
                className="flex flex-wrap rounded-xl border border-gray-300 px-4 py-3"
                onClick={() => hs.push(paths.profile.completeSpecialty)}
              >
                {userInfo.mySpecialty.map((item) => (
                  <div
                    key={item}
                    className="w-fit rounded-[36px] bg-warning-100 px-3 py-1 text-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            ) : (
              <ArrowButton
                text="اضافه کردن"
                url={paths.profile.completeSpecialty}
                className="w-full"
                icon={<SolarIconSet.SuitcaseTag size={24} />}
              />
            )}
          </div>
          <div className="w-full">
            <h2 className="mr-3 py-[8px] text-sm font-semibold text-gray-500">
              زبان‌هایی که میدانم
            </h2>{' '}
            {userInfo.languages.length > 0 ? (
              <div
                className="flex flex-wrap gap-2 rounded-xl border border-gray-300 px-4 py-3"
                onClick={() => setIsOpen('language')}
              >
                {userInfo.languages.map((item) => {
                  const icon = allIcon.find((val2) => val2.title === item);
                  return (
                    <div
                      key={item}
                      className="flex w-fit gap-1 rounded-[36px] bg-warning-100 px-3 py-1 text-sm"
                    >
                      {icon?.icon && (
                        <img src={icon.icon} alt={item} className="h-4 w-4" />
                      )}
                      {icon?.flag && (
                        <span className="font-serif">{icon?.flag}</span>
                      )}
                      {item}
                    </div>
                  );
                })}
              </div>
            ) : (
              <ArrowButton
                onClick={() => setIsOpen('language')}
                text="اضافه کردن"
                className="w-full"
                icon={<SolarIconSet.Dialog size={24} />}
              />
            )}
          </div>
          <div className="w-full">
            <h2 className="mr-3 py-[8px] text-sm font-semibold text-gray-500">
              مکان‌هایی که سفر کرده‌ام
            </h2>{' '}
            {userInfo.traveledToPlaces.length > 0 ? (
              <div
                className="flex flex-wrap gap-2 rounded-xl border border-gray-300 px-4 py-3"
                onClick={() => setIsOpen('traveledToPlaces')}
              >
                {userInfo.traveledToPlaces.map((item) => {
                  const icon = allIcon.find((val2) => val2.title === item);
                  return (
                    <div
                      key={item}
                      className="flex w-fit gap-1 rounded-[36px] bg-warning-100 px-3 py-1 text-sm"
                    >
                      {icon?.icon && (
                        <img src={icon.icon} alt={item} className="h-4 w-4" />
                      )}
                      {icon?.flag && (
                        <span className="font-serif">{icon?.flag}</span>
                      )}
                      {item}
                    </div>
                  );
                })}
              </div>
            ) : (
              <ArrowButton
                onClick={() => setIsOpen('traveledToPlaces')}
                text="اضافه کردن"
                className="w-full"
                icon={<SolarIconSet.Globus size={24} />}
              />
            )}
          </div>
          <div className="w-full">
            <h2 className="mr-3 py-[8px] text-sm font-semibold text-gray-500">
              مکان‌هایی که زندگی کرده‌ام
            </h2>{' '}
            {userInfo.livedInPlaces.length > 0 ? (
              <div
                className="flex flex-wrap gap-2 rounded-xl border border-gray-300 px-4 py-3"
                onClick={() => setIsOpen('livedInPlaces')}
              >
                {userInfo.livedInPlaces.map((item) => {
                  const icon = allIcon.find((val2) => val2.title === item);
                  return (
                    <div
                      key={item}
                      className="flex w-fit gap-1 rounded-[36px] bg-warning-100 px-3 py-1 text-sm"
                    >
                      {icon?.icon && (
                        <img src={icon.icon} alt={item} className="h-4 w-4" />
                      )}
                      {icon?.flag && (
                        <span className="font-serif">{icon?.flag}</span>
                      )}
                      {item}
                    </div>
                  );
                })}
              </div>
            ) : (
              <ArrowButton
                onClick={() => setIsOpen('livedInPlaces')}
                text="اضافه کردن"
                className="w-full"
                icon={<SolarIconSet.Globus size={24} />}
              />
            )}
          </div>
          <div className="w-full">
            <h2 className="mr-3 py-[8px] text-sm font-semibold text-gray-500">
              علایق شخصی من
            </h2>{' '}
            {userInfo.personalInterests.length > 0 ? (
              <div
                className="flex flex-wrap gap-2 rounded-xl border border-gray-300 px-4 py-3"
                onClick={() => hs.push(paths.profile.completePersonalInterests)}
              >
                {userInfo.personalInterests.map((item) => {
                  const icon = allIcon.find((val2) => val2.title === item);
                  return (
                    <div
                      key={item}
                      className="flex w-fit gap-1 rounded-[36px] bg-warning-100 px-3 py-1 text-sm"
                    >
                      {icon?.icon && (
                        <img src={icon.icon} alt={item} className="h-4 w-4" />
                      )}
                      {icon?.flag && (
                        <span className="font-serif">{icon?.flag}</span>
                      )}
                      {item}
                    </div>
                  );
                })}
              </div>
            ) : (
              <ArrowButton
                text="اضافه کردن"
                url={paths.profile.completePersonalInterests}
                className="w-full"
                icon={<CiStar size={24} />}
              />
            )}
          </div>
          <div className="w-full">
            <h2 className="mr-3 py-[8px] text-sm font-semibold text-gray-500">
              علایق عمومی من در سفر
            </h2>{' '}
            {userInfo.travelInterests.length > 0 ? (
              <div
                className="flex flex-wrap gap-2 rounded-xl border border-gray-300 px-4 py-3"
                onClick={() => hs.push(paths.profile.completeTravelInterests)}
              >
                {userInfo.travelInterests.map((item) => {
                  const icon = allIcon.find((val2) => val2.title === item);
                  return (
                    <div
                      key={item}
                      className="flex w-fit gap-1 rounded-[36px] bg-warning-100 px-3 py-1 text-sm"
                    >
                      {icon?.icon && (
                        <img src={icon.icon} alt={item} className="h-4 w-4" />
                      )}
                      {icon?.flag && (
                        <span className="font-serif">{icon?.flag}</span>
                      )}
                      {item}
                    </div>
                  );
                })}
              </div>
            ) : (
              <ArrowButton
                text="اضافه کردن"
                url={paths.profile.completeTravelInterests}
                className="w-full"
                icon={<SolarIconSet.SuitcaseTag size={24} />}
              />
            )}
          </div>
        </div>
        <LanguageModal
          value={userInfo.languages}
          setValue={(val) => {
            handleFilterChange('languages', val as string);
          }}
          setClose={() => setIsOpen(undefined)}
          isOpen={isOpen === 'language'}
          handleClick={() => {
            updateUser({
              variables: {
                languages: userInfo.languages,
              },
              onCompleted: () => {
                customToast('اطلاعات شما با موفقیت ثبت شد', 'success');
              },
              onError: () => {
                customToast(
                  'مشکلی پیش آمده است لطفا دوباره امتحان کنید',
                  'error',
                );
              },
            });
          }}
        ></LanguageModal>
        <LivedInPlacesModal
          value={userInfo.livedInPlaces}
          setValue={(val) => {
            handleFilterChange('livedInPlaces', val);
          }}
          setClose={() => setIsOpen(undefined)}
          isOpen={isOpen === 'livedInPlaces'}
          handleClick={() => {
            updateUser({
              variables: {
                livedInPlaces: userInfo.livedInPlaces,
              },
              onCompleted: () => {
                customToast('اطلاعات شما با موفقیت ثبت شد', 'success');
              },
              onError: () => {
                customToast(
                  'مشکلی پیش آمده است لطفا دوباره امتحان کنید',
                  'error',
                );
              },
            });
          }}
        ></LivedInPlacesModal>
        <TraveledToPlacesModal
          value={userInfo.traveledToPlaces}
          setValue={(val) => {
            handleFilterChange('traveledToPlaces', val);
          }}
          setClose={() => setIsOpen(undefined)}
          isOpen={isOpen === 'traveledToPlaces'}
          handleClick={() => {
            updateUser({
              variables: {
                traveledToPlaces: userInfo.traveledToPlaces,
              },
              onCompleted: () => {
                customToast('اطلاعات شما با موفقیت ثبت شد', 'success');
              },
              onError: () => {
                customToast(
                  'مشکلی پیش آمده است لطفا دوباره امتحان کنید',
                  'error',
                );
              },
            });
          }}
        ></TraveledToPlacesModal>
      </div>
    </Page>
  );
}
