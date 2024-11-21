import { Page } from "@/components/layout/Page";
import { useLocalStore } from "@/store/useLocalStore";
import { CiStar } from "react-icons/ci";
import { Link } from "react-router-dom";
import * as SolarIconSet from "solar-icon-set";

const CustomeCard = (props: {
  icon: any;
  status: boolean;
  title: string;
  description: string;
  url: string;
}) => {
  return (
    <Link
      to={props.url}
      className="h-[180px] w-full py-6 rounded-xl border border-slate-300 flex-col justify-start items-center gap-4 inline-flex"
    >
      <div
        className={`p-4 rounded-[40px] justify-center items-center gap-2 inline-flex text-brand-black ${props.status ? "bg-brand-green" : "bg-brand-yellow"}`}
      >
        {props.icon}
      </div>
      <div className="flex-col justify-start items-center gap-2 flex">
        <div className="text-center text-[#1a1d1e] text-base font-bold font-['IRANSansXFaNum'] leading-normal">
          {props.title}
        </div>
        <div className="text-center text-slate-400 text-sm font-medium font-['IRANSansXFaNum'] leading-tight">
          {props.description}
        </div>
      </div>
    </Link>
  );
};

export default function ComplateProfile() {
  const userInfo = useLocalStore((store) => store.userInfo);

  const cardsData = [
    {
      icon: <SolarIconSet.PenNewSquare size={32} />,
      title: "بیوگرافی",
      description: userInfo.bio ? "نوشته شده" : "نوشته نشده",
      url: "/profile#biography",
      status: !!userInfo.bio,
    },
    {
      icon: <SolarIconSet.VerifiedCheck size={32} />,
      title: "تایید هویت",
      description: userInfo.gender ? "انجام شده" : "انجام نشده",
      url: "/profile/complate_profile/identify_verification",
      status: !!userInfo.gender,
    },
    {
      icon: <SolarIconSet.Gallery size={32} />,
      title: "تصاویر",
      description: `${userInfo.pictures.length} از 4 آپلود شده`,
      url: "/profile/complate_profile/complate_pictures",
      status: userInfo.pictures.length === 4,
    },
    {
      icon: <SolarIconSet.InfoCircle size={32} />,
      title: "اطلاعات اولیه",
      description: userInfo.name ? "1 از 7 اضافه شده" : "0 از 7 اضافه شده", // Example logic
      url: "/profile/complate_profile/complate_basicinformations",
      status: !!userInfo.name,
    },
    // {
    //   icon: <SolarIconSet.StickerSmileSquare size={32} />,
    //   title: "آواتار",
    //   description: userInfo.username ? "انتخاب شده" : "انتخاب نشده",
    //   url: "/profile/complate_profile/",
    //   status: !!userInfo.username,
    // },
    // {
    //   icon: <SolarIconSet.Microphone size={32} />,
    //   title: "پیام خوش‌آمد گویی",
    //   description: "ضبط نشده", // Adjust logic as needed
    //   url: "/profile/complate_profile/",
    //   status: false, // Adjust logic as needed
    // },
    {
      icon: <CiStar size={32} />,
      title: "علایق شخصی",
      description: `${userInfo.personalInterests.length} از 5 اضافه شده`,
      url: "/profile/complate_profile/complate_personalInterests",
      status: userInfo.personalInterests.length === 5,
    },
    {
      icon: <SolarIconSet.SuitcaseTag size={32} />,
      title: "علایق عمومی در سفر",
      description: `${userInfo.travelsInterests.length} از 5 اضافه شده`,
      url: "/profile/complate_profile/complate_generalinterests",
      status: userInfo.travelsInterests.length === 5,
    },
    {
      icon: <SolarIconSet.Accessibility size={32} />,
      title: "تخصص",
      description: userInfo.specialty.length ? "انتخاب شده" : "انتخاب نشده",
      url: "/profile/complate_profile/complate_specialty",
      status: !!userInfo.specialty.length,
    },
    {
      icon: <SolarIconSet.Home size={32} />,
      title: "محل زندگی",
      description: userInfo.residenceCity ? "انتخاب شده" : "انتخاب نشده",
      url: "/profile/complate_profile/complate_residencecity",
      status: !!userInfo.residenceCity,
    },
  ];


  return (
    <Page
      className="flex h-full w-full flex-col items-center"
      contentClassName="h-[100dvh]"
    >
      <div className="w-full flex flex-col items-center gap-y-3 h-full pb-16 overflow-y-auto">
        {/* Head */}
        <Link
          to="/profile"
          className="w-full flex items-center py-4 px-6 justify-between shadow-md shadow-zinc-50 text-brand-black"
        >
          <SolarIconSet.AltArrowRight size={24} />
          <h1 className="text-lg font-bold my-auto">۶۵ درصد تکمیل شده</h1>
          <div></div>
        </Link>
        {/* Body */}
        <div className="w-full px-6 flex flex-col items-center gap-y-3">
          <div className="w-full flex flex-col items-center gap-y-3 text-center">
            <h1>پروفایل خودتو تکمیل کن!</h1>
            <p className="text-sm text-[#64748B] font-medium">
              هر چقدر در تکمیل اطلاعات صادقتر باشید افرادی با شرایط مشابه بیشتری
              به شما معرفی خواهد شد و امکان مسافرت مناسب‌تر برا شما فراهم می‌شود.
            </p>
          </div>
          {/* Cards */}
          <div className="w-full grid grid-cols-2 gap-5 py-4 px-2">
            {cardsData.map((card, index) => (
              <CustomeCard
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                url={card.url}
                status={card.status}
              />
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}
