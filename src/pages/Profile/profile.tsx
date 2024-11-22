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
import { useLocation } from 'react-router-dom';
import { Page } from '@/components/layout/Page';
import AppBar from '@/components/layout/Header/AppBar';
import { paths } from '@/routes/paths';
import { LanguageModal } from '@/components/shared/modals/languageModal';
import toast from 'react-hot-toast';
import { Toast } from '@/components/base/toast/toast';

export default function Profile() {
  const [isOpen, setIsOpen] = useState<'language'>();
  const { hash } = useLocation(); // Retrieve the current hash from the URL
  const bioRef = useRef<HTMLDivElement | null>(null); // Ref for the biography section
  const { control, watch, setValue } = useForm();

  const [updateUser, { loading }] = useUpdateUserMutation();
  const userInfo = useLocalStore((store) => store.userInfo);
  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);

  const bio = watch('bio');
  const username = watch('username');
  const name = watch('name');

  const timeoutRef = useRef<number | null>(null); // Specify the type here
  useEffect(() => {
    if (hash === '#biography' && bioRef.current) {
      bioRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]); // Trigger when the hash changes
  useEffect(() => {
    setValue('name', userInfo.name);
    setValue('username', userInfo.username);
    setValue('bio', userInfo.bio);
  }, []);
  useEffect(() => {
    // Clear any existing timer
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    // Set a new timer
    timeoutRef.current = window.setTimeout(() => {
      updateUserInfo({
        name: name,
        username: username,
        bio: bio,
      });
    }, 1000);
    // Cleanup timer on unmount or if values change
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [bio, username, name]); // Depend on changes in bio, username, and name

  useEffect(() => {
    updateUser({
      variables: {
        name: userInfo.name,
      },
    });
  }, [userInfo.name]);

  useEffect(() => {
    updateUser({
      variables: {
        username: userInfo.username,
      },
    });
  }, [userInfo.username]);

  useEffect(() => {
    updateUser({
      variables: {
        bio: userInfo.bio,
      },
    });
  }, [userInfo.bio]);

  const calculateCompletionPercentage = () => {
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
    ];
    const completedFields = fields.filter(Boolean).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const completionPercentage = calculateCompletionPercentage();
  const backgroundClass =
    completionPercentage === 100 ? 'bg-brand-green' : 'bg-brand-yellow';
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
      contentClassName="flex w-full flex-col items-center gap-2 p-6 pt-20"
    >
      <div className="w-full text-brand-black">
        <h2 className="mr-3 text-sm font-semibold text-gray-500">
          تکمیل پروفایل:
        </h2>
        <ArrowButton
          url="/profile/complete_profile"
          text={`${completionPercentage} درصد کامل شده`}
          className={backgroundClass}
        />
      </div>
      <div className="w-full">
        <h2 className="mr-3 text-sm font-semibold text-gray-500">تایید هویت</h2>
        <ArrowButton
          url="/profile/complete_profile/identify_verification"
          text="تایید شماره موبایل"
        />
      </div>
      <div className="flex w-full items-center py-8">
        <img src={BakiBanner} alt="BakiBanner" />
      </div>
      {/* Upload Picture */}
      <div className="flex min-h-fit w-full flex-col items-center gap-y-3">
        <h1 className="w-full pr-3 text-gray-500">انتخاب عکس</h1>
        <UploadPictures />
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
        <div className="w-full" id="biography" ref={bioRef}>
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
            url="/profile/complete_profile/complete_residencecity"
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
            url="/profile/complete_profile/complete_basicinformations"
            arrowText="افزودن"
            className="w-full"
            icon={<SolarIconSet.UserId size={24} />}
          />
          <ArrowButton
            text="سال و ماه تولد"
            url="/profile/complete_profile/complete_basicinformations"
            arrowText="افزودن"
            className="w-full"
            icon={<SolarIconSet.Calendar size={24} />}
          />
          <ArrowButton
            text="وضعیت تاهل"
            url="/profile/complete_profile/complete_basicinformations"
            arrowText="افزودن"
            className="w-full"
            icon={<SolarIconSet.Heart size={24} />}
          />
          <ArrowButton
            text="سیگار"
            url="/profile/complete_profile/complete_basicinformations"
            arrowText="افزودن"
            className="w-full"
            icon={<LiaSmokingSolid size={24} />}
          />
          <ArrowButton
            text="ورزش"
            url="/profile/complete_profile/complete_basicinformations"
            arrowText="افزودن"
            className="w-full"
            icon={<SolarIconSet.DumbbellSmall size={24} />}
          />
          <ArrowButton
            text="میزان سحرخیزی"
            url="/profile/complete_profile/complete_basicinformations"
            arrowText="افزودن"
            className="w-full"
            icon={<SolarIconSet.SunFog size={24} />}
          />
          <ArrowButton
            text="روحیه"
            url="/profile/complete_profile/complete_basicinformations"
            arrowText="افزودن"
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
                <p className="text-sm font-medium text-[#94A3B8]">قوچ</p>
                <TbZodiacAries size={24} className="text-[#94A3B8]" />
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
        <h1 className="w-full pb-2 text-lg font-bold">موارد بیشتر درباره من</h1>
        <div className="w-full">
          <h2 className="mr-3 py-[8px] text-sm font-semibold text-gray-500">
            تخصص
          </h2>
          <ArrowButton
            text="اضافه کردن"
            url="/profile/complete_profile/complete_specialty"
            className="w-full"
            icon={<SolarIconSet.SuitcaseTag size={24} />}
          />
        </div>
        <div className="w-full">
          <h2 className="mr-3 py-[8px] text-sm font-semibold text-gray-500">
            زبان‌هایی که میدانم
          </h2>
          <ArrowButton
            onClick={() => setIsOpen('language')}
            text="اضافه کردن"
            className="w-full"
            icon={<SolarIconSet.Dialog size={24} />}
          />
        </div>
        <div className="w-full">
          <h2 className="mr-3 py-[8px] text-sm font-semibold text-gray-500">
            مکان‌هایی که سفر کرده‌ام
          </h2>
          <ArrowButton
            text="اضافه کردن"
            className="w-full"
            icon={<SolarIconSet.Globus size={24} />}
          />
        </div>
        <div className="w-full">
          <h2 className="mr-3 py-[8px] text-sm font-semibold text-gray-500">
            مکان‌هایی که زندگی کرده‌ام
          </h2>
          <ArrowButton
            text="اضافه کردن"
            url={paths.profile.languagesKnow}
            className="w-full"
            icon={<SolarIconSet.Globus size={24} />}
          />
        </div>
        <div className="w-full">
          <h2 className="mr-3 py-[8px] text-sm font-semibold text-gray-500">
            علایق شخصی من
          </h2>
          <ArrowButton
            text="اضافه کردن"
            url="/profile/complete_profile/complete_personalInterests"
            className="w-full"
            icon={<CiStar size={24} />}
          />
        </div>
        <div className="w-full">
          <h2 className="mr-3 py-[8px] text-sm font-semibold text-gray-500">
            علایق عمومی من در سفر
          </h2>
          <ArrowButton
            text="اضافه کردن"
            url="/profile/complete_profile/complete_generalinterests"
            className="w-full"
            icon={<SolarIconSet.SuitcaseTag size={24} />}
          />
        </div>
      </div>
      <LanguageModal
        value={userInfo.languages}
        setValue={(val) => {
          handleFilterChange('languages', val);
        }}
        setClose={() => setIsOpen(undefined)}
        isOpen={isOpen === 'language'}
        handleClick={() => {
          updateUser({
            variables: {
              languages: userInfo.languages,
            },
            onCompleted: () => {
              toast.custom(
                (t) => (
                  <Toast t={t} type="success">
                    اطلاعات شما با موفقیت ثبت شد
                  </Toast>
                ),
                { duration: 1500 },
              );
            },
            onError: () => {
              toast.custom(
                (t) => (
                  <Toast t={t} type="error">
                    مشکلی پیش آمده است لطفا دوباره امتحان کنید
                  </Toast>
                ),
                { duration: 1500 },
              );
            },
          });
        }}
      ></LanguageModal>
    </Page>
  );
}
