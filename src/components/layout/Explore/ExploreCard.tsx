import { FaCirclePlay } from "react-icons/fa6";
import CardAvatar from "../../../assets/img/Explore/CardAvatar.svg";
import * as SolarIconSet from 'solar-icon-set';
import { MdVerified } from "react-icons/md";
import { RiMapPin2Fill } from "react-icons/ri";

export default function ExploreCard(props: {
    image: string;
    name: string;
    age: number;
    isOnline: boolean;
    location: string;
    searchMethod: string;
}) {
    return (
        <div className="relative w-[343px] h-[420px] flex flex-col justify-between">
            <img src={props.image} alt="ExploreCard" className="rounded-t-[16px] absolute w-full h-full -z-10" />
           <div className="w-full flex items-center justify-end p-[16px]">
             <p className="bg-brand-yellow text-xs font-medium max-w-fit px-[8px] py-[4px] rounded-[16px]">
                 {props.searchMethod}
             </p>
           </div>
            <div className="p-[16px] flex items-center justify-between">
                <div className="text-white text-sm">
                    <div className="flex items-center gap-x-2">
                        <h1 className="text-lg font-black">
                            {props.name} ، {props.age}
                        </h1>
                        <MdVerified size={24} className="text-brand-yellow mt-3" />
                    </div>
                    <div className="flex items-center gap-x-1">
                        <RiMapPin2Fill size={16} />
                        <p>
                            {props.location}
                        </p>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <div className="bg-white rounded-full w-[12px] h-[12px] flex items-center justify-center"><div className={`w-[8px] h-[8px] rounded-full ${props.isOnline ? "bg-brand-green" : "bg-red-500"}`} /></div>
                        <p>
                            {props.isOnline ? "آنلاین" : "آفلاین"}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-x-[8px]">
                    <div className='bg-brand-yellow rounded-full max-w-fit max-h-fit p-[8px]'>
                        <FaCirclePlay size={24} />
                    </div>
                    <div className='bg-brand-yellow rounded-full max-w-fit max-h-fit'>
                        <img src={CardAvatar} alt="CardAvatar" />
                    </div>
                </div>
            </div>
        </div>
    )
} 