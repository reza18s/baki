import * as SolarIconSet from 'solar-icon-set';

export default function Authentication() {
    return (
        <div className='flex items-center justify-between px-[16px] py-[12px] rounded-[12px] w-full border border-slate-300'>
            <div className='flex items-center gap-x-2'>
                <SolarIconSet.VerifiedCheck size={24} />
                <p>
                    تایید شماره موبایل
                </p>
            </div>
            <SolarIconSet.AltArrowLeft size={24} />
        </div>
    )
}