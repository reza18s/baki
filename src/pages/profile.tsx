import * as SolarIconSet from 'solar-icon-set';
import ComplateProfile from '../components/layout/Profile/ComplateProfile';
import Authentication from '../components/layout/Profile/Authentication';

export default function Profile() {
    return (
        <div className='w-full flex flex-col items-center gap-y-3'>
            {/* Head */}
            <div className='w-full flex items-center py-4 px-6 justify-between shadow-md shadow-zinc-50'>
                <SolarIconSet.AltArrowRight size={24} />
                <h1 className='text-lg font-bold my-auto'>
                    ویرایش پروفایل
                </h1>
                <div></div>
            </div>
            {/* Body */}
            <div className='w-full px-6 flex flex-col gap-y-4'>
                <div>
                    <h2 className='text-[#64748B] text-sm font-semibold mr-3'>
                    تکمیل پروفایل:
                    </h2>
                    <ComplateProfile />
                </div>
                <div>
                    <h2 className='text-[#64748B] text-sm font-semibold mr-3'>
                    تایید هویت
                    </h2>
                    <Authentication />
                </div>
            </div>
        </div>
    )
}