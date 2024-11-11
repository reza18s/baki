import ExploreCard from "../../components/layout/Explore/ExploreCard";
import CardImage from "../../assets/img/Explore/CardImage.svg";
import BakiLogo from "../../assets/img/Explore/BakiLogo.svg";
import * as SolarIconSet from "solar-icon-set";
import { Page } from "@/components/layout/Page";

export default function Explore() {
  return (
    <div className="h-full w-full">
      {/* Head */}
      <div className="flex w-full items-center justify-between p-3">
        <SolarIconSet.HamburgerMenu size={24} />
        <img src={BakiLogo} alt="BakiLogo" />
        <SolarIconSet.Tuning2 size={24} />
      </div>
      <div className="p-2">
        <ExploreCard
          image={CardImage}
          name="سحر رضایی"
          age={24}
          isOnline={false}
          location="گلستان گرگان"
          searchMethod="تصادفی"
        />
      </div>
    </div>
  );
}
