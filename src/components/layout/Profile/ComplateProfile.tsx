import * as SolarIconSet from 'solar-icon-set';

export default function ComplateProfile() {
    return (
        <div className='flex items-center justify-between bg-brand-yellow px-[16px] py-[12px] rounded-[12px] w-full'>
            <p>
                65 درصد کامل شده
            </p>
            <SolarIconSet.AltArrowLeft size={24} />
        </div>
    )
}