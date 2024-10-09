import * as SolarIconSet from "solar-icon-set";
import EthnologyIcon from "../../../assets/img/signup/EthnologyIcon.svg";
import ExplorationIcon from "../../../assets/img/signup/ExplorationIcon.svg";
import ShipIcon from "../../../assets/img/signup/ShipIcon.svg";
import TrainIcon from "../../../assets/img/signup/TrainIcon.svg";
import CampingIcon from "../../../assets/img/signup/CampingIcon.svg";
import VillageTourIcon from "../../../assets/img/signup/VillageTourIcon.svg";
import CulturalIcon from "../../../assets/img/signup/CulturalIcon.svg";
import BoatIcon from "../../../assets/img/signup/BoatIcon.svg";
import SwimmingIcon from "../../../assets/img/signup/SwimmingIcon.svg";
import TravelingByShipIcon from "../../../assets/img/signup/TravelingByShipIcon.svg";

export default function GeneralInterestsStep(props: {
    control: any,
    name: string,
    handleSignup: () => void,
}) {
    return (
        <div className="flex flex-col gap-y-[40px] w-full">
            <div className="flex flex-col gap-y-[16px]">
                <h1 className="text-[32px] font-bold text-brand-black">
                    علایق عمومی من در سفر
                </h1>
                <p className="text-sm font-medium leading-tight text-[#64748B]">
                    حداقل ۵ و حداکثر ۱۰ مورد از علاقه‌مندی‌های خود را انتخاب کنید. این کمکمون میکنه افراد با علاقه‌مندی‌های مشابه رو بهتون پیشنهاد بدیم!
                </p>
            </div>
            {/* Body */}
            <div className="flex flex-col items-start gap-y-3">
                <div className="flex items-center gap-x-3">
                    <div className="rounded-[32px] bg-[#F1F5F9] p-[12px] max-w-fit flex items-center gap-x-3">
                        <img src={EthnologyIcon} alt="EthnologyIcon" className="w-5 h-5" />
                        <p className="text-[#1a1d1e] text-sm">
                        قوم شناسی
                        </p>
                    </div>
                    <div className="rounded-[32px] bg-[#F1F5F9] p-[12px] max-w-fit flex items-center gap-x-3">
                        <img src={ExplorationIcon} alt="ExplorationIcon" className="w-5 h-5" />
                        <p className="text-[#1a1d1e] text-sm">
                        کاوشگری
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-x-3">
                    <div className="rounded-[32px] bg-[#F1F5F9] p-[12px] max-w-fit flex items-center gap-x-3">
                        <img src={ShipIcon} alt="ShipIcon" className="w-5 h-5" />
                        <p className="text-[#1a1d1e] text-sm">
                        کشتی
                        </p>
                    </div>
                    <div className="rounded-[32px] bg-[#F1F5F9] p-[12px] max-w-fit flex items-center gap-x-3">
                        <img src={TrainIcon} alt="TrainIcon" className="w-5 h-5" />
                        <p className="text-[#1a1d1e] text-sm">
                        مسافرت با قطار
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-x-3">
                    <div className="rounded-[32px] bg-[#F1F5F9] p-[12px] max-w-fit flex items-center gap-x-3">
                        <img src={CampingIcon} alt="CampingIcon" className="w-5 h-5" />
                        <p className="text-[#1a1d1e] text-sm">
                        کمپینگ
                        </p>
                    </div>
                    <div className="rounded-[32px] bg-[#F1F5F9] p-[12px] max-w-fit flex items-center gap-x-3">
                        <img src={VillageTourIcon} alt="VillageTourIcon" className="w-5 h-5" />
                        <p className="text-[#1a1d1e] text-sm">
                        روستا گردی
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-x-3">
                    <div className="rounded-[32px] bg-[#F1F5F9] p-[12px] max-w-fit flex items-center gap-x-3">
                        <img src={CulturalIcon} alt="CulturalIcon" className="w-5 h-5" />
                        <p className="text-[#1a1d1e] text-sm">
                        فرهنگی
                        </p>
                    </div>
                    <div className="rounded-[32px] bg-[#F1F5F9] p-[12px] max-w-fit flex items-center gap-x-3">
                        <img src={BoatIcon} alt="BoatIcon" className="w-5 h-5" />
                        <p className="text-[#1a1d1e] text-sm">
                        قایق سواری
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-x-3">
                    <div className="rounded-[32px] bg-[#F1F5F9] p-[12px] max-w-fit flex items-center gap-x-3">
                        <img src={SwimmingIcon} alt="SwimmingIcon" className="w-5 h-5" />
                        <p className="text-[#1a1d1e] text-sm">
                        شنا
                        </p>
                    </div>
                    <div className="rounded-[32px] bg-[#F1F5F9] p-[12px] max-w-fit flex items-center gap-x-3">
                        <img src={TravelingByShipIcon} alt="TravelingByShipIcon" className="w-5 h-5" />
                        <p className="text-[#1a1d1e] text-sm">
                        مسافرت با کشتی
                        </p>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div className="absolute bottom-[24px] flex items-center justify-between gap-x-[16px] min-w-fit w-[90%] px-2">
                <div className="flex items-center gap-x-[8px] min-w-fit justify-between">
                    <SolarIconSet.LockKeyholeUnlocked size={24} />
                    <p
                        className="text-[#1a1d1e] text-xs font-medium leading-none w-[200px] pl-[29px]"
                    >
                        شما میتوانید این بخش را در آینده تغییر دهید.
                    </p>
                </div>
                <button
                    disabled={props.name?.length < 1}
                    onClick={props.handleSignup}
                    className={`px-[20px] py-[16px] ${props.name?.length > 1
                        ? 'bg-[#ffcc4e]'
                        : 'bg-slate-100'
                        } rounded-[12px] text-slate-400 font-bold leading-none`}
                >
                    بعدی
                </button>
            </div>
        </div>
    );
}
