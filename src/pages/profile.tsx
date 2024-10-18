import * as SolarIconSet from 'solar-icon-set';
import ComplateProfile from '../components/layout/Profile/ComplateProfile';
import Authentication from '../components/layout/Profile/Authentication';
import BakiBanner from "../assets/img/profile/BakiBanner.svg"
import UploadPictures from '../components/shared/Inputs/UploadPictures';

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
            <div className='w-full px-6 flex flex-col items-center gap-y-3'>
                <div className='w-full'>
                    <h2 className='text-[#64748B] text-sm font-semibold mr-3'>
                        تکمیل پروفایل:
                    </h2>
                    <ComplateProfile />
                </div>
                <div className='w-full'>
                    <h2 className='text-[#64748B] text-sm font-semibold mr-3'>
                        تایید هویت
                    </h2>
                    <Authentication />
                </div>
                <div className='py-8 w-full flex items-center'>
                    <img src={BakiBanner} alt="BakiBanner" />
                </div>
                <div className='w-full flex flex-col items-center gap-y-3'>
                    <h1>
                        انتخاب عکس
                    </h1>
                    <UploadPictures />
                </div>
            </div>
        </div>
    )
}