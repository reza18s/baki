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
import ClimbingIcon from "../../../assets/img/signup/ClimbingIcon.svg";
import SeeBeach from "../../../assets/img/signup/SeeBeach.svg";
import OffroadIcon from "../../../assets/img/signup/OffroadIcon.svg";
import BicycleIcon from "../../../assets/img/signup/BicycleIcon.svg";
import FishingIcon from "../../../assets/img/signup/FishingIcon.svg";
import WildlifeIcon from "../../../assets/img/signup/WildlifeIcon.svg";
import HistoricalPlacesIcon from "../../../assets/img/signup/HistoricalPlacesIcon.svg";
import AdventoreIcon from "../../../assets/img/signup/AdventoreIcon.svg";
import NatureIcon from "../../../assets/img/signup/NatureIcon.svg";
import SkiingIcon from "../../../assets/img/signup/SkiingIcon.svg";
import ShopIcon from "../../../assets/img/signup/ShopIcon.svg";
import BackpackingIcon from "../../../assets/img/signup/BackpackingIcon.svg";
import WalkingIcon from "../../../assets/img/signup/WalkingIcon.svg";
import FoodIcon from "../../../assets/img/signup/FoodIcon.svg";
import { useState } from "react";
import { bicycle } from "ionicons/icons";

export default function GeneralInterestsStep(props: {
    control: any,
    name: string,
    handleSignup: () => void,
}) {
    const interestsItems = [
        {
            title: "قوم شناسی",
            icon: EthnologyIcon
        },
        {
            title: "کاوشگری",
            icon: ExplorationIcon
        },
        {
            title: "کشتی",
            icon: ShipIcon
        },
        {
            title: "مسافرت با قطار",
            icon: TrainIcon
        },
        {
            title: "کمپینگ",
            icon: CampingIcon
        },
        {
            title: "روستا گردی",
            icon: VillageTourIcon
        },
        {
            title: "فرهنگی",
            icon: CulturalIcon
        },
        {
            title: "قایق سواری",
            icon: BoatIcon
        },
        {
            title: "شنا",
            icon: SwimmingIcon
        },
        {
            title: "مسافرت با کشتی",
            icon: TravelingByShipIcon
        },
        {
            title: "صخره نوردی",
            icon: ClimbingIcon
        },
        {
            title: "دریا و ساحل",
            icon: SeeBeach
        },
        {
            title: "آفرود سواری",
            icon: OffroadIcon
        },
        {
            title: "دوچرخه سواری",
            icon: bicycle
        },
        {
            title: "ماهی گیری",
            icon: FishingIcon
        },
        {
            title: "حیات وحش",
            icon: WildlifeIcon
        },
        {
            title: "اماکن تاریخی",
            icon: HistoricalPlacesIcon
        },
        {
            title: "ماجراجویی",
            icon: AdventoreIcon
        },
        {
            title: "طبیعت",
            icon: NatureIcon
        },
        {
            title: "اسکی و برف",
            icon: SkiingIcon
        },
        {
            title: "خرید",
            icon: ShopIcon
        },
        {
            title: "کوله گردی",
            icon: BackpackingIcon
        },
        {
            title: "پیاده روی",
            icon: WalkingIcon
        },
        {
            title: "غذا و آشپزی",
            icon: FoodIcon
        },
    ]

    const [showAll, setShowAll] = useState<boolean>(false);
    const setShowAllTrue = () => {
        setShowAll(true);
    }

    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const handleClickInterests = (selected: string) => {
        if (selectedInterests.includes(selected)) {
            setSelectedInterests((prevInterests: any) => prevInterests.filter((interest: any) => interest !== selected));
        } else {
            if (selectedInterests.length < 10) {
                setSelectedInterests((prevInterests: any) => prevInterests.concat(selected));
            }
        }
    }

    return (
        <div className="flex flex-col gap-y-[40px] w-full h-full min-h-fit pb-20">
            <div className="flex flex-col gap-y-[16px]">
                <h1 className="text-[32px] font-bold text-brand-black">
                    علایق عمومی من در سفر
                </h1>
                <p className="text-sm font-medium leading-tight text-[#64748B]">
                    حداقل ۵ و حداکثر ۱۰ مورد از علاقه‌مندی‌های خود را انتخاب کنید. این کمکمون میکنه افراد با علاقه‌مندی‌های مشابه رو بهتون پیشنهاد بدیم!
                </p>
            </div>
            {/* Body */}
            <div className="flex flex-col items-start justify-around gap-y-3 min-h-fit w-full">
                {
                    interestsItems.map((item, index) => {
                        const nextIndex = interestsItems.length + 1 >= index && (showAll || index < 9) ? index + 1 : 0;
                        console.log(nextIndex);
                        const nextItem = nextIndex > 0 ? interestsItems[nextIndex] : null;
                        if (index % 2 === 0) {
                            return (
                                <div className="flex items-center gap-x-2">
                                    {(showAll || index < 9) &&
                                        <button onClick={() => { handleClickInterests(item.title) }} key={index} className={`rounded-[32px] p-[12px] max-w-fit flex items-center gap-x-3 ${selectedInterests.includes(item.title) ? 'bg-brand-yellow' : 'bg-[#F1F5F9]'}`}>
                                            <img src={item.icon} alt={item.title} className="w-5 h-5" />
                                            <p className="text-[#1a1d1e] text-sm">
                                                {item.title}
                                            </p>
                                        </button>}
                                    {
                                        nextIndex > 0 && nextItem &&
                                        <button onClick={() => { handleClickInterests(nextItem.title) }} key={nextIndex} className={`rounded-[32px] bg-[#F1F5F9] p-[12px] max-w-fit flex items-center gap-x-3 ${selectedInterests.includes(nextItem.title) ? 'bg-brand-yellow' : 'bg-[#F1F5F9]'}`}>
                                            <img src={nextItem.icon} alt={nextItem.title} className="w-5 h-5" />
                                            <p className="text-[#1a1d1e] text-sm">
                                                {nextItem.title}
                                            </p>
                                        </button>
                                    }
                                </div>
                            )
                        }
                    })
                }
                <button onClick={setShowAllTrue} className={`${showAll ? "hidden" : "flex"} items-center justify-center gap-x-2 w-full -mt-16`}>
                    <SolarIconSet.AltArrowDown size={16} />
                    <p className="text-sm text-[#1a1d1e] font-bold">
                        مشاهده همه
                    </p>
                </button>
            </div>
            {/* Footer */}
            <div className={`bottom-0 flex items-center justify-between gap-x-[16px] min-w-fit w-[90%] px-2 bg-white py-3 ${showAll ? "sticky" : "absolute"}`}>
                <div className="flex items-center gap-x-[8px] min-w-fit justify-between">
                    <SolarIconSet.CheckCircle size={24} className="bg-[#1A1D1E] text-white rounded-full" />
                    <p
                        className="text-[#1a1d1e] text-xs font-medium leading-none w-[200px] pl-[29px]"
                    >
                        {selectedInterests.length}/5 انتخاب شده
                    </p>
                </div>
                <button
                    disabled={selectedInterests.length > 4}
                    onClick={props.handleSignup}
                    className={`px-[20px] py-[16px] ${selectedInterests.length > 4
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
