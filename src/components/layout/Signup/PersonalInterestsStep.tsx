import * as SolarIconSet from "solar-icon-set";
import FastFoodIcon from "../../../assets/img/signup/FastFoodIcon.svg";
import CaffeIcon from "../../../assets/img/signup/CaffeIcon.svg";
import MeatIcon from "../../../assets/img/signup/MeatIcon.svg";
import VegetarianIcon from "../../../assets/img/signup/VegetarianIcon.svg";
import WineIcon from "../../../assets/img/signup/WineIcon.svg";
import MusicIcon from "../../../assets/img/signup/MusicIcon.svg";
import SkateIcon from "../../../assets/img/signup/SkateIcon.svg";
import ParagliderIcon from "../../../assets/img/signup/ParagliderIcon.svg";
import ShootingIcon from "../../../assets/img/signup/ShootingIcon.svg";
import CaveIcon from "../../../assets/img/signup/CaveIcon.svg";
import BodybuildingIcon from "../../../assets/img/signup/BodybuildingIcon.svg";
import KarateIcon from "../../../assets/img/signup/KarateIcon.svg";
import SoccerIcon from "../../../assets/img/signup/SoccerIcon.svg";
import HorseIcon from "../../../assets/img/signup/HorseIcon.svg";
import BackgammonIcon from "../../../assets/img/signup/BackgammonIcon.svg";
import SquashIcon from "../../../assets/img/signup/SquashIcon.svg";
import RabbitIcon from "../../../assets/img/signup/RabbitIcon.svg";
import LionIcon from "../../../assets/img/signup/SkiingIcon.svg";
import DogIcon from "../../../assets/img/signup/DogIcon.svg";
import SquirrelIcon from "../../../assets/img/signup/SquirrelIcon.svg";
import HamsterIcon from "../../../assets/img/signup/HamsterIcon.svg";
import ParrotIcon from "../../../assets/img/signup/ParrotIcon.svg";
import CatIcon from "../../../assets/img/signup/CatIcon.svg";
import CanaryIcon from "../../../assets/img/signup/CanaryIcon.svg";
import MonkeyIcon from "../../../assets/img/signup/MonkeyIcon.svg";
import FishIcon from "../../../assets/img/signup/FishIcon.svg";
import SingerIcon from "../../../assets/img/signup/SingerIcon.svg";
import PlayingIcon from "../../../assets/img/signup/PlayingIcon.svg";
import DesignIcon from "../../../assets/img/signup/DesignIcon.svg";
import WritingIcon from "../../../assets/img/signup/WritingIcon.svg";
import HumoristIcon from "../../../assets/img/signup/HumoristIcon.svg";
import MovieIcon from "../../../assets/img/signup/MovieIcon.svg";
import ConcertIcon from "../../../assets/img/signup/ConcertIcon.svg";
import MarketsIcon from "../../../assets/img/signup/MarketsIcon.svg";
import RestaurantIcon from "../../../assets/img/signup/RestaurantIcon.svg";
import MuseamIcon from "../../../assets/img/signup/MuseamIcon.svg";
import FestivalsIcon from "../../../assets/img/signup/FestivalsIcon.svg";
import TheaterIcon from "../../../assets/img/signup/TheaterIcon.svg";
import ParkIcon from "../../../assets/img/signup/ParkIcon.svg";
import MosqueIcon from "../../../assets/img/signup/MosqueIcon.svg";
import GameIcon from "../../../assets/img/signup/GameIcon.svg";
import GroupGameIcon from "../../../assets/img/signup/GroupGameIcon.svg";
import PotteryIcon from "../../../assets/img/signup/PotteryIcon.svg";
import GardeningIcon from "../../../assets/img/signup/GardeningIcon.svg";
import NatureTourIcon from "../../../assets/img/signup/NatureTourIcon.svg";
import CulturalExchangeIcon from "../../../assets/img/signup/CulturalExchangeIcon.svg";
import { useState } from "react";
import { bicycle } from "ionicons/icons";

export default function PersonalInterestsStep(props: {
    control: any,
    name: string,
    handleSignup: () => void,
}) {
    const interestsItems = [
        {
            title: "خوردنی و آشامیدنی",
            subItems: [
                {
                    title: "فست‌فود",
                    icon: FastFoodIcon
                },
                {
                    title: "قهوه",
                    icon: CaffeIcon
                },
                {
                    title: "گوشت‌خواری",
                    icon: MeatIcon
                },
                {
                    title: "گیاه‌خواری",
                    icon: VegetarianIcon
                },
                {
                    title: "نوشیدنی",
                    icon: WineIcon
                },
            ]
        },
        {
            title: "موسیقی",
            subItems: [
                {
                    title: "الکترونیک",
                    icon: MusicIcon
                },
                {
                    title: "پاپ",
                    icon: MusicIcon
                },
                {
                    title: "کلاسیک",
                    icon: MusicIcon
                },
                {
                    title: "سنتی",
                    icon: MusicIcon
                },
                {
                    title: "هیپ هاپ",
                    icon: MusicIcon
                },
                {
                    title: "راک",
                    icon: MusicIcon
                },
                {
                    title: "محلی",
                    icon: MusicIcon
                },
            ]
        },
        {
            title: "ورزش‌ها",
            subItems: [
                {
                    title: "اسکیت",
                    icon: SkateIcon
                },
                {
                    title: "پاراگلایدر",
                    icon: ParagliderIcon
                },
                {
                    title: "تیراندازی",
                    icon: ShootingIcon
                },
                {
                    title: "غارنوردی",
                    icon: CaveIcon
                },
                {
                    title: "بدن سازی",
                    icon: BodybuildingIcon
                },
                {
                    title: "کاراته",
                    icon: KarateIcon
                },
                {
                    title: "فوتبال",
                    icon: SoccerIcon
                },
                {
                    title: "اسب سواری",
                    icon: HorseIcon
                },
                {
                    title: "تخته نرد",
                    icon: BackgammonIcon
                },
                {
                    title: "اسکواش",
                    icon: SquashIcon
                },
            ]
        },
        {
            title: "حیوانات خانگی",
            subItems: [
                {
                    title: "خرگوش",
                    icon: RabbitIcon
                },
                {
                    title: "شیر",
                    icon: LionIcon
                },
                {
                    title: "سگ",
                    icon: DogIcon
                },
                {
                    title: "سنجاب",
                    icon: SquirrelIcon
                },
                {
                    title: "همستر",
                    icon: HamsterIcon
                },
                {
                    title: "طوطی",
                    icon: ParrotIcon
                },
                {
                    title: "گربه",
                    icon: CatIcon
                },
                {
                    title: "قناری",
                    icon: CanaryIcon
                },
                {
                    title: "میمون",
                    icon: MonkeyIcon
                },
                {
                    title: "ماهی",
                    icon: FishIcon
                },
            ]
        },
        {
            title: "مهارت ها",
            subItems: [
                {
                    title: "خوانندگی",
                    icon: SingerIcon
                },
                {
                    title: "نوازندگی",
                    icon: PlayingIcon
                },
                {
                    title: "طراحی",
                    icon: DesignIcon
                },
                {
                    title: "نویسندگی",
                    icon: WritingIcon
                },
                {
                    title: "طنزپردازی",
                    icon: HumoristIcon
                },
            ]
        },
        {
            title: "فیلم و تلویزیون",
            subItems: [
                {
                    title: "ترسناک",
                    icon: MovieIcon
                },
                {
                    title: "علمی تخیلی",
                    icon: MovieIcon
                },
                {
                    title: "انیمه",
                    icon: MovieIcon
                },
                {
                    title: "دام",
                    icon: MovieIcon
                },
                {
                    title: "هیجانی",
                    icon: MovieIcon
                },
                {
                    title: "اکشن",
                    icon: MovieIcon
                },
                {
                    title: "کمدی",
                    icon: MovieIcon
                },
                {
                    title: "عاشقانه",
                    icon: MovieIcon
                },
                {
                    title: "معمایی",
                    icon: MovieIcon
                },
            ]
        },
        {
            title: "بیرون رفتن",
            subItems: [
                {
                    title: "کنسرت ها",
                    icon: ConcertIcon
                },
                {
                    title: "بازار ها",
                    icon: MarketsIcon
                },
                {
                    title: "کافه ها و رستوران ها",
                    icon: RestaurantIcon
                },
                {
                    title: "موزه ها و گالری ها",
                    icon: MuseamIcon
                },
                {
                    title: "جشنواره ها",
                    icon: FestivalsIcon
                },
                {
                    title: "تئاتر یا سینما",
                    icon: TheaterIcon
                },
                {
                    title: "پارک ها",
                    icon: ParkIcon
                },
                {
                    title: "مساجد یا کلیسا ها",
                    icon: MosqueIcon
                },
            ]
        },
        {
            title: "دوست دارم انجام دهم",
            subItems: [
                {
                    title: "بازی ویدیویی",
                    icon: GameIcon
                },
                {
                    title: "بازی دورهمی",
                    icon: GroupGameIcon
                },
                {
                    title: "سفالگری",
                    icon: PotteryIcon
                },
                {
                    title: "باغبانی",
                    icon: GardeningIcon
                },
                {
                    title: "طبیعت گردی",
                    icon: NatureTourIcon
                },
                {
                    title: "تبادل فرهنگی",
                    icon: CulturalExchangeIcon
                },
            ]
        },
    ]

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
                    علایق شخصی من
                </h1>
                <p className="text-sm font-medium leading-tight text-[#64748B]">
                    حداقل ۵ و حداکثر ۱۰ مورد از علاقه‌مندی‌های خود را انتخاب کنید.
                </p>
            </div>
            {/* Body */}
            <div>
                {
                    interestsItems.map((item) => (
                        <div key={item.title} className="flex flex-col gap-y-3">
                            <h2 className="text-[#1a1d1e] text-lg font-bold">
                                {item.title}
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {
                                    item.subItems.map((subItem) => (
                                        <button onClick={() => { handleClickInterests(subItem.title) }} key={subItem.title} className={`rounded-[32px] bg-[#F1F5F9] p-[12px] max-w-fit flex items-center gap-x-3 ${selectedInterests.includes(subItem.title) ? 'bg-brand-yellow' : 'bg-[#F1F5F9]'}`}>
                                        <img src={subItem.icon} alt={subItem.title} className="w-5 h-5" />
                                        <p className="text-[#1a1d1e] text-sm">
                                            {subItem.title}
                                        </p>
                                    </button>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* Footer */}
            <div className={`bottom-0 flex items-center justify-between gap-x-[16px] min-w-fit w-[90%] px-2 bg-white py-3 sticky`}>
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
