import * as SolarIconSet from "solar-icon-set";
import BakiBanner from "../../assets/img/profile/BakiBanner.svg";
import UploadPictures from "../../components/shared/Inputs/UploadPictures";
import TextInput from "../../components/shared/Inputs/TextInput";
import { useForm } from "react-hook-form";
import ArrowButton from "../../components/shared/Buttons/ArrowButton";
import { LiaSmokingSolid } from "react-icons/lia";
import { PiGraphLight } from "react-icons/pi";
import { TbZodiacAries } from "react-icons/tb";
import { CiStar } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useLocalStore } from "@/store/useLocalStore";
import { useUpdateUserMutation } from "@/graphql/generated/graphql.codegen";
import { useLocation } from "react-router-dom";
import BottomSheetModal from "@/components/base/Modal/BottomSheetModal";
import { IcSearch } from "@/components/icons/IcSearch";
import { languages } from "@/lib/constants";
import Button from "@/components/base/Button/Button";
import { Page } from "@/components/layout/Page";

export default function Profile() {
  const { hash } = useLocation(); // Retrieve the current hash from the URL
  const bioRef = useRef<HTMLDivElement | null>(null); // Ref for the biography section

  useEffect(() => {
    if (hash === "#biography" && bioRef.current) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]); // Trigger when the hash changes

  const { control, watch, setValue } = useForm();

  const [updateUser, { loading }] = useUpdateUserMutation();
  const userInfo = useLocalStore((store) => store.userInfo);
  const updateUserInfo = useLocalStore((store) => store.updateUserInfo);

  const bio = watch("bio");
  const username = watch("username");
  const name = watch("name");

  const timeoutRef = useRef<number | null>(null); // Specify the type here

  useEffect(() => {
    setValue("name", userInfo.name);
    setValue("username", userInfo.username);
    setValue("bio", userInfo.bio);
  }, [])

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
      })
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
      }
    })
  }, [userInfo.name])

  useEffect(() => {
    updateUser({
      variables: {
        username: userInfo.username,
      }
    })
  }, [userInfo.username])

  useEffect(() => {
    updateUser({
      variables: {
        bio: userInfo.bio,
      }
    })
  }, [userInfo.bio])

  const calculateCompletionPercentage = () => {
    const fields = [
      userInfo.name,
      userInfo.username,
      userInfo.bio,
      userInfo.residenceCity,
      userInfo.gender,
      userInfo.pictures.length >= 4,
      userInfo.personalInterests.length >= 5,
      userInfo.travelsInterests.length >= 5,
      userInfo.specialty.length > 0,
    ];
    const completedFields = fields.filter(Boolean).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const completionPercentage = calculateCompletionPercentage();
  const backgroundClass =
    completionPercentage === 100 ? "bg-brand-green" : "bg-brand-yellow";

  const [searchLanguage, setSearchLanguage] = useState<string>('');
  const [isOpenLanguage, setIsOpenLanguage] = useState<boolean>(false);
  const [languageValue, setLanguageValue] = useState<any>();

  return (
    <Page
      
      contentClassName="h-[100dvh]"
      // header={<AppBar title="علایق عمومی"></AppBar>}
    >
      <div className="w-full flex flex-col items-center gap-y-3 h-full pb-16 overflow-y-auto text-brand-black">
        {/* Head */}
        <Link
          to="/explore"
          className="w-full flex items-center py-4 px-6 text-brand-black justify-between shadow-md shadow-zinc-50"
        >
          <SolarIconSet.AltArrowRight size={24} />
          <h1 className="text-lg font-bold my-auto">ویرایش پروفایل</h1>
          <div></div>
        </Link>
        {/* Body */}
        <div className="w-full px-6 flex flex-col items-center gap-y-3">
          <div className="w-full text-brand-black">
            <h2 className="text-[#64748B] text-sm font-semibold mr-3">
              تکمیل پروفایل:
            </h2>
            <ArrowButton
              url="/profile/complate_profile"
              text={`${completionPercentage} درصد کامل شده`}
              className={backgroundClass}
            />
          </div>
          <div className="w-full">
            <h2 className="text-[#64748B] text-sm font-semibold mr-3">
              تایید هویت
            </h2>
            <ArrowButton url="/profile/complate_profile/identify_verification" text="تایید شماره موبایل" />
          </div>
          <div className="py-8 w-full flex items-center">
            <img src={BakiBanner} alt="BakiBanner" />
          </div>
          {/* Upload Picture */}
          <div className="w-full flex flex-col items-center gap-y-3 min-h-fit max-w-fit">
            <h1 className="w-full  text-[#64748B] pr-3">انتخاب عکس</h1>
            <UploadPictures />
          </div>
          {/* About Me */}
          <div className="w-full flex flex-col items-center gap-y-3 min-h-fit">
            <h1 className="w-full  text-lg font-bold">درباره من</h1>
            <div className="w-full">
              <h2 className="text-[#64748B] text-sm font-semibold mr-3 py-[8px]">نام</h2>
              <TextInput
                placeholder="نام"
                control={control}
                icon={<SolarIconSet.UserRounded size={30} />}
                name="name"
                value={watch("name")}
              />
            </div>
            <div className="w-full">
              <h2 className="text-[#64748B] text-sm font-semibold mr-3 py-[8px]">
                نام کاربری
              </h2>
              <TextInput
                placeholder="نام کاربری حسابتان ..."
                control={control}
                icon={<SolarIconSet.UserCircle size={30} />}
                name="username"
                value={watch("username")}
              />
            </div>
            <div className="w-full" id="biography" ref={bioRef}>
              <h2 className="text-[#64748B] text-sm font-semibold mr-3 py-[8px]">
                بیوگرافی
              </h2>
              <TextInput
                placeholder="از علایق، ویژگی‌ها و هرچی دوست دارین درباره خودتون بگید..."
                multiline={true}
                rows={3}
                control={control}
                name="bio"
                value={watch("bio")}
              />
            </div>
            <div className="w-full text-brand-black">
              <h2 className="text-[#64748B] text-sm font-semibold mr-3 pb-[9px] pt-4">
                محل زندگی
              </h2>
              <ArrowButton
                url="/profile/complate_profile/complate_residencecity"
                text="محل زندگی کنونی خود را وارد کنید"
                icon={<SolarIconSet.Home size={24} />}
              />
            </div>
          </div>
          {/* Basic Information */}
          <div className="w-full flex flex-col items-center gap-y-3 min-h-fit pt-4">
            <h1 className="w-full text-lg font-bold pb-1">اطلاعات اولیه</h1>
            <div className="w-full flex flex-col gap-y-2">
              <ArrowButton
                text="جنسیت"
                url="/profile/complate_profile/complate_basicinformations"
                arrowText="افزودن"
                className="w-full"
                icon={<SolarIconSet.UserId size={24} />}
              />
              <ArrowButton
                text="سال و ماه تولد"
                url="/profile/complate_profile/complate_basicinformations"
                arrowText="افزودن"
                className="w-full"
                icon={<SolarIconSet.Calendar size={24} />}
              />
              <ArrowButton
                text="وضعیت تاهل"
                url="/profile/complate_profile/complate_basicinformations"
                arrowText="افزودن"
                className="w-full"
                icon={<SolarIconSet.Heart size={24} />}
              />
              <ArrowButton
                text="سیگار"
                url="/profile/complate_profile/complate_basicinformations"
                arrowText="افزودن"
                className="w-full"
                icon={<LiaSmokingSolid size={24} />}
              />
              <ArrowButton
                text="ورزش"
                url="/profile/complate_profile/complate_basicinformations"
                arrowText="افزودن"
                className="w-full"
                icon={<SolarIconSet.DumbbellSmall size={24} />}
              />
              <ArrowButton
                text="میزان سحرخیزی"
                url="/profile/complate_profile/complate_basicinformations"
                arrowText="افزودن"
                className="w-full"
                icon={<SolarIconSet.SunFog size={24} />}
              />
              <ArrowButton
                text="روحیه"
                url="/profile/complate_profile/complate_basicinformations"
                arrowText="افزودن"
                className="w-full"
                icon={<SolarIconSet.MaskHapply size={24} />}
              />
              <div>
                <div className="flex items-center justify-between px-[16px] py-[12px] rounded-[12px] bg-[#F1F5F9] w-full">
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
                <p className="text-[10px] pr-3 pt-1">
                  نشان زودیاک شما با توجه به ماه تولد شما تعیین شده است.
                </p>
              </div>
            </div>
          </div>
          {/* More about Me */}
          <div className="w-full flex flex-col items-center gap-y-3 min-h-fit pt-5">
            <h1 className="w-full text-lg font-bold pb-2">
              موارد بیشتر درباره من
            </h1>
            <div className="w-full">
              <h2 className="text-[#64748B] text-sm font-semibold mr-3 py-[8px]">تخصص</h2>
              <ArrowButton
                text="اضافه کردن"
                url="/profile/complate_profile/complate_specialty"
                className="w-full"
                icon={<SolarIconSet.SuitcaseTag size={24} />}
              />
            </div>
            {/* <div className="w-full">
            <h2 className="text-[#64748B] text-sm font-semibold mr-3 py-[8px]">
              زبان‌هایی که میدانم
            </h2>
            <ArrowButton
              onClick={() => setIsOpenLanguage(true)}
              text="اضافه کردن"
              className="w-full"
              icon={<SolarIconSet.Dialog size={24} />}
            />
          </div>
          <div className="w-full">
            <h2 className="text-[#64748B] text-sm font-semibold mr-3 py-[8px]">
              مکان‌هایی که سفر کرده‌ام
            </h2>
            <ArrowButton
              text="اضافه کردن"
              className="w-full"
              icon={<SolarIconSet.Globus size={24} />}
            />
          </div> */}
            <div className="w-full">
              <h2 className="text-[#64748B] text-sm font-semibold mr-3 py-[8px]">
                مکان‌هایی که زندگی کرده‌ام
              </h2>
              <ArrowButton
                text="اضافه کردن"
                className="w-full"
                icon={<SolarIconSet.Globus size={24} />}
              />
            </div>
            <div className="w-full">
              <h2 className="text-[#64748B] text-sm font-semibold mr-3 py-[8px]">
                علایق شخصی من
              </h2>
              <ArrowButton
                text="اضافه کردن"
                url="/profile/complate_profile/complate_personalInterests"
                className="w-full"
                icon={<CiStar size={24} />}
              />
            </div>
            <div className="w-full">
              <h2 className="text-[#64748B] text-sm font-semibold mr-3 py-[8px]">
                علایق عمومی من در سفر
              </h2>
              <ArrowButton
                text="اضافه کردن"
                url="/profile/complate_profile/complate_generalinterests"
                className="w-full"
                icon={<SolarIconSet.SuitcaseTag size={24} />}
              />
              <div>
                <BottomSheetModal
                  isOpen={isOpenLanguage}
                  onRequestClose={() => setIsOpenLanguage(false)}
                  onCloseEnd={() => setIsOpenLanguage(false)}
                  className="h-[70%] overflow-hidden px-6"
                >
                  <h1 className="my-3 text-center text-lg font-bold">
                    زبان مدنظر را انتخاب کنید:
                  </h1>
                  <div className="mb-4 flex h-9 w-full items-center gap-2 rounded-xl border-2 border-brand-black bg-transparent px-2">
                    <IcSearch></IcSearch>
                    <input
                      className="bg-transparent outline-none"
                      placeholder="جستجو برای استان..."
                      value={searchLanguage}
                      onChange={(e) => setSearchLanguage(e.target.value)}
                    ></input>
                  </div>

                  <div className="flex h-[calc(100%-170px)] flex-col overflow-y-scroll">
                    {languages
                      .filter((el) => el.flag.toLowerCase().includes(searchLanguage.toLowerCase()))
                      .map((el) => (
                        <div
                          key={el.language}
                          className="flex items-center gap-2 border-t py-6 text-sm"
                          onClick={() => {
                            setLanguageValue(el.language);
                          }}
                        >
                          <input
                            checked={!!languageValue?.includes(el.language)}
                            readOnly
                            type="checkbox"
                            className="custom-checkbox h-5 w-5 appearance-none rounded border-2 border-brand-black bg-white transition-colors duration-200 checked:border-brand-yellow checked:bg-brand-yellow focus:outline-none focus:ring-0"
                          />
                          {el.language}
                        </div>
                      ))}
                  </div>
                  <Button
                    className="h-10 w-[calc(100%)] p-0"
                    onClick={() => {
                      setIsOpenLanguage(false);
                    }}
                  >
                    تایید
                  </Button>
                </BottomSheetModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
