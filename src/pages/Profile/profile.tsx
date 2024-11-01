import * as SolarIconSet from 'solar-icon-set';
import BakiBanner from "../../assets/img/profile/BakiBanner.svg"
import UploadPictures from '../../components/shared/Inputs/UploadPictures';
import TextInput from '../../components/shared/Inputs/TextInput';
import { useForm } from 'react-hook-form';
import ArrowButton from '../../components/shared/Buttons/ArrowButton';
import { LiaSmokingSolid } from "react-icons/lia";
import { PiGraphLight } from "react-icons/pi";
import { TbZodiacAries } from "react-icons/tb";
import { CiStar } from "react-icons/ci";
import { Link } from 'react-router-dom';

export default function Profile() {
    const {
        control,
        watch,
    } = useForm()
    return (
        <div className='w-full flex flex-col items-center gap-y-3 h-full pb-16 overflow-y-auto'>
            {/* Head */}
            <div className='w-full flex items-center py-4 px-6 justify-between shadow-md shadow-zinc-50'>
                <SolarIconSet.AltArrowRight size={24} />
                <h1 className='text-lg font-bold my-auto'>
                    ویرایش پروفایل
                </h1>
                <div></div>
            </div>
            {/* Body */}
            <div className='w-full px-6 flex flex-col items-center gap-y-3'>
                <a href="/profile/complate_profile" className='w-full text-brand-black'>
                    <h2 className='text-[#64748B] text-sm font-semibold mr-3'>
                        تکمیل پروفایل:
                    </h2>
                    <ArrowButton text="65 درصد کامل شده" className='bg-brand-yellow' />
                </a>
                <div className='w-full'>
                    <h2 className='text-[#64748B] text-sm font-semibold mr-3'>
                        تایید هویت
                    </h2>
                    <ArrowButton text="تایید شماره موبایل" />
                </div>
                <div className='py-8 w-full flex items-center'>
                    <img src={BakiBanner} alt="BakiBanner" />
                </div>
                {/* Upload Picture */}
                <div className='w-full flex flex-col items-center gap-y-3 min-h-fit max-w-fit'>
                    <h1 className='w-full text-end text-[#64748B] pr-3'>
                        انتخاب عکس
                    </h1>
                    <UploadPictures />
                </div>
                {/* About Me */}
                <div className='w-full flex flex-col items-center gap-y-3 min-h-fit'>
                    <h1 className='w-full text-end text-lg font-bold'>
                        درباره من
                    </h1>
                    <div className='w-full'>
                        <h2 className='text-[#64748B] text-sm font-semibold mr-3'>
                            نام
                        </h2>
                        <TextInput placeholder='نام' control={control} icon={<SolarIconSet.UserRounded size={30} />} name='name' value={watch("name")} />
                    </div>
                    <div className='w-full'>
                        <h2 className='text-[#64748B] text-sm font-semibold mr-3'>
                            نام کاربری
                        </h2>
                        <TextInput placeholder='نام کاربری حسابتان ...' control={control} icon={<SolarIconSet.UserCircle size={30} />} name='username' value={watch("username")} />
                    </div>
                    <div className='w-full' id='biography'>
                        <h2 className='text-[#64748B] text-sm font-semibold mr-3'>
                            بیوگرافی
                        </h2>
                        <TextInput placeholder='از علایق، ویژگی‌ها و هرچی دوست دارین درباره خودتون بگید...' multiline={true} rows={3} control={control} name='biography' value={watch("biography")} />
                    </div>
                    <div className='w-full'>
                        <h2 className='text-[#64748B] text-sm font-semibold mr-3'>
                            محل زندگی
                        </h2>
                        <ArrowButton url='/profile/complate_profile/complate_residencecity' text="محل زندگی کنونی خود را وارد کنید" icon={<SolarIconSet.Home size={24} />} />
                    </div>
                </div>
                {/* Basic Information */}
                <div className='w-full flex flex-col items-center gap-y-3 min-h-fit'>
                    <h1 className='w-full text-end text-lg font-bold'>
                        اطلاعات اولیه
                    </h1>
                    <div className='w-full flex flex-col gap-y-2'>
                        <ArrowButton text="جنسیت" url='/profile/complate_profile/complate_basicinformations' arrowText='افزودن' className='w-full' icon={<SolarIconSet.UserId size={24} />} />
                        <ArrowButton text="سال و ماه تولد" url='/profile/complate_profile/complate_basicinformations' arrowText='افزودن' className='w-full' icon={<SolarIconSet.Calendar size={24} />} />
                        <ArrowButton text="وضعیت تاهل" url='/profile/complate_profile/complate_basicinformations' arrowText='افزودن' className='w-full' icon={<SolarIconSet.Heart size={24} />} />
                        <ArrowButton text="سیگار" url='/profile/complate_profile/complate_basicinformations' arrowText='افزودن' className='w-full' icon={<LiaSmokingSolid size={24} />} />
                        <ArrowButton text="ورزش" url='/profile/complate_profile/complate_basicinformations' arrowText='افزودن' className='w-full' icon={<SolarIconSet.DumbbellSmall size={24} />} />
                        <ArrowButton text="میزان سحرخیزی" url='/profile/complate_profile/complate_basicinformations' arrowText='افزودن' className='w-full' icon={<SolarIconSet.SunFog size={24} />} />
                        <ArrowButton text="روحیه" url='/profile/complate_profile/complate_basicinformations' arrowText='افزودن' className='w-full' icon={<SolarIconSet.MaskHapply size={24} />} />
                        <div>
                            <div className="flex items-center justify-between px-[16px] py-[12px] rounded-[12px] bg-[#F1F5F9] w-full">
                                <div className='flex items-center gap-x-2'>
                                    <PiGraphLight size={24} />
                                    <p className='text-sm font-medium text-[#94A3B8]'>
                                        نشان زودیاک
                                    </p>
                                </div>
                                <div className='flex items-center gap-x-2'>
                                    <p className='text-sm font-medium text-[#94A3B8]'>
                                        قوچ
                                    </p>
                                    <TbZodiacAries size={24} className='text-[#94A3B8]' />
                                </div>
                            </div>
                            <p className='text-[10px] pr-3 pt-1'>
                                نشان زودیاک شما با توجه به ماه تولد شما تعیین شده است.
                            </p>
                        </div>
                    </div>
                </div>
                 {/* More about Me */}
                 <div className='w-full flex flex-col items-center gap-y-3 min-h-fit'>
                    <h1 className='w-full text-end text-lg font-bold'>
                        موارد بیشتر درباره من
                    </h1>
                    <div className='w-full'>
                        <h2 className='text-[#64748B] text-sm font-semibold mr-3'>
                            تخصص
                        </h2>
                        <ArrowButton text="اضافه کردن" url='/profile/complate_profile/complate_specialty' className='w-full' icon={<SolarIconSet.SuitcaseTag size={24} />} />
                    </div>
                    <div className='w-full'>
                        <h2 className='text-[#64748B] text-sm font-semibold mr-3'>
                        زبان‌هایی که میدانم
                        </h2>
                        <ArrowButton text="اضافه کردن" className='w-full' icon={<SolarIconSet.Dialog size={24} />} />
                    </div>
                    <div className='w-full'>
                        <h2 className='text-[#64748B] text-sm font-semibold mr-3'>
                        مکان‌هایی که سفر کرده‌ام
                        </h2>
                        <ArrowButton text="اضافه کردن" className='w-full' icon={<SolarIconSet.Globus size={24} />} />
                    </div>
                    <div className='w-full'>
                        <h2 className='text-[#64748B] text-sm font-semibold mr-3'>
                        مکان‌هایی که زندگی کرده‌ام
                        </h2>
                        <ArrowButton text="اضافه کردن" className='w-full' icon={<SolarIconSet.Globus size={24} />} />
                    </div>
                    <div className='w-full'>
                        <h2 className='text-[#64748B] text-sm font-semibold mr-3'>
                        علایق شخصی من
                        </h2>
                        <ArrowButton text="اضافه کردن" url='/profile/complate_profile/complate_personalInterests' className='w-full' icon={<CiStar size={24} />} />
                    </div>
                    <div className='w-full'>
                        <h2 className='text-[#64748B] text-sm font-semibold mr-3'>
                        علایق عمومی من در سفر
                        </h2>
                        <ArrowButton text="اضافه کردن" url='/profile/complate_profile/complate_generalinterests' className='w-full' icon={<SolarIconSet.SuitcaseTag size={24} />} />
                    </div>
                </div>
            </div>
        </div>
    )
}