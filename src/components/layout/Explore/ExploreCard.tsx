import { FaCirclePlay } from "react-icons/fa6";
import CardAvatar from "../../../assets/img/Explore/CardAvatar.svg";
import * as SolarIconSet from "solar-icon-set";
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
    <div className="relative flex w-full flex-col justify-between">
      <img
        src={props.image}
        alt="ExploreCard"
        className="absolute -z-10 h-full w-full rounded-t-[16px]"
      />
      <div className="flex w-full items-center justify-end p-[16px]">
        <p className="max-w-fit rounded-[16px] bg-brand-yellow px-[8px] py-[4px] text-xs font-medium">
          {props.searchMethod}
        </p>
      </div>
      <div className="flex items-center justify-between p-[16px]">
        <div className="text-sm text-white">
          <div className="flex items-center gap-x-2">
            <h1 className="text-lg font-black">
              {props.name} ، {props.age}
            </h1>
            <MdVerified size={24} className="mt-3 text-brand-yellow" />
          </div>
          <div className="flex items-center gap-x-1">
            <RiMapPin2Fill size={16} />
            <p>{props.location}</p>
          </div>
          <div className="flex items-center gap-x-1">
            <div className="flex h-[12px] w-[12px] items-center justify-center rounded-full bg-white">
              <div
                className={`h-[8px] w-[8px] rounded-full ${props.isOnline ? "bg-brand-green" : "bg-red-500"}`}
              />
            </div>
            <p>{props.isOnline ? "آنلاین" : "آفلاین"}</p>
          </div>
        </div>
        <div className="flex items-center gap-x-[8px]">
          <div className="max-h-fit max-w-fit rounded-full bg-brand-yellow p-[8px]">
            <FaCirclePlay size={24} />
          </div>
          <div className="max-h-fit max-w-fit rounded-full bg-brand-yellow">
            <img src={CardAvatar} alt="CardAvatar" />
          </div>
        </div>
      </div>
    </div>
  );
}
