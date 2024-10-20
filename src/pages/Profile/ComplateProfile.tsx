import { Link } from 'react-router-dom';
import * as SolarIconSet from 'solar-icon-set';

const CustomeCard = () => {
    return (
        <div>
            
        </div>
    )
}

export default function ComplateProfile() {
    return (
        <div className='w-full flex flex-col items-center gap-y-3 h-full pb-16 overflow-y-auto'>
            {/* Head */}
            <Link to="/profile" className='w-full flex items-center py-4 px-6 justify-between shadow-md shadow-zinc-50 text-brand-black'>
                <SolarIconSet.AltArrowRight size={24} />
                <h1 className='text-lg font-bold my-auto'>
                    ویرایش پروفایل
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
            </div>
        </div>
    )
}