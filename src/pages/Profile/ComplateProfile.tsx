import { CiStar } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import * as SolarIconSet from 'solar-icon-set';

const CustomeCard = (props: {
    icon: any,
    status: boolean,
    title: string,
    description: string,
    url: string,
}) => {
    return (
        <Link to={props.url} className="h-[180px] w-full py-6 rounded-xl border border-slate-300 flex-col justify-start items-center gap-4 inline-flex">
            <div className={`p-4 rounded-[40px] justify-center items-center gap-2 inline-flex ${props.status ? "bg-brand-green" : "bg-brand-yellow"}`}>
                {props.icon}
            </div>
            <div className="flex-col justify-start items-center gap-2 flex">
                <div className="text-center text-[#1a1d1e] text-base font-bold font-['IRANSansXFaNum'] leading-normal">
                    {props.title}
                </div>
                <div className="text-center text-slate-400 text-sm font-medium font-['IRANSansXFaNum'] leading-tight">
                    {props.description}
                </div>
            </div>
        </Link>
    )
}

export default function ComplateProfile() {
    return (
        <div className='w-full flex flex-col items-center gap-y-3 h-full pb-16 overflow-y-auto'>
            {/* Head */}
            <Link to="/profile" className='w-full flex items-center py-4 px-6 justify-between shadow-md shadow-zinc-50 text-brand-black'>
                <SolarIconSet.AltArrowRight size={24} />
                <h1 className='text-lg font-bold my-auto'>
                ۶۵ درصد تکمیل شده
                </h1>
                <div></div>
            </Link>
            {/* Body */}
            <div className='w-full px-6 flex flex-col items-center gap-y-3'>
                <div className='w-full flex flex-col items-center gap-y-3 text-center'>
                    <h1>
                        پروفایل خودتو تکمیل کن!
                    </h1>
                    <p className='text-sm text-[#64748B] font-medium'>
                        هر چقدر در تکمیل اطلاعات صادقتر باشید افرادی با شرایط مشابه بیشتری به شما معرفی خواهد شد و امکان مسافرت مناسب‌تر برا شما فراهم می‌شود.
                    </p>
                </div>
                {/* Cards */}
                <div className='w-full grid grid-cols-2 gap-5 py-4 px-2'>
                    <CustomeCard icon={<SolarIconSet.PenNewSquare size={32} />} title='بیوگرافی' description='نوشته نشده' url="/profile#biography" status={false} />
                    <CustomeCard icon={<SolarIconSet.VerifiedCheck size={32} />} title='تایید هویت' description='انجام نشده' url="/profile/complate_profile/identify_verification" status={false} />
                    <CustomeCard icon={<SolarIconSet.Gallery size={32} />} title='تصاویر' description='0 از 4 آپلود شده' url="/profile/complate_profile/complate_pictures" status={false} />
                    <CustomeCard icon={<SolarIconSet.InfoCircle size={32} />} title='اطلاعات اولیه' description='0 از 7 اضافه شده' url="/profile/complate_profile/complate_basicinformations" status={false} />
                    <CustomeCard icon={<SolarIconSet.StickerSmileSquare size={32} />} title='آواتار' description='انتخاب نشده' url="/profile/complate_profile/" status={false} />
                    <CustomeCard icon={<SolarIconSet.Microphone size={32} />} title='پیام خوش‌آمد گویی' description='ضبط نشده' url="/profile/complate_profile/" status={false} />
                    <CustomeCard icon={<CiStar size={32} />} title='علایق شخصی' description='0 از 5 اضافه شده' url="/profile/complate_profile/complate_personalInterests" status={false} />
                    <CustomeCard icon={<SolarIconSet.SuitcaseTag size={32} />} title='علایق عمومی در سفر' description='0 از 5 اضافه شده' url="/profile/complate_profile/complate_generalinterests" status={false} />
                    <CustomeCard icon={<SolarIconSet.Accessibility size={32} />} title='تخصص' description='انتخاب نشده' url="/profile/complate_profile/complate_specialty" status={false} />
                    <CustomeCard icon={<SolarIconSet.Home size={32} />} title='محل زندگی' description='انتخاب نشده' url="/profile/complate_profile/complate_residencecity" status={false} />
                </div>
            </div>
        </div>
    )
}