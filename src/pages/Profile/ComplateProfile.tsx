import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import { useLocalStore } from '@/store/useLocalStore';
import { CiStar } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import * as SolarIconSet from 'solar-icon-set';

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
      className="inline-flex h-[180px] w-full flex-col items-center justify-start gap-4 rounded-xl border border-slate-300 py-6"
    >
      <div
        className={`inline-flex items-center justify-center gap-2 rounded-[40px] p-4 text-brand-black ${props.status ? 'bg-brand-green' : 'bg-brand-yellow'}`}
      >
        {props.icon}
      </div>
      <div className="flex flex-col items-center justify-start gap-2">
        <div className="text-center font-['IRANSansXFaNum'] text-base font-bold leading-normal text-brand-black">
          {props.title}
        </div>
        <div className="text-center font-['IRANSansXFaNum'] text-sm font-medium leading-tight text-brand-black">
          {props.description}
        </div>
      </div>
    </Link>
  );
};

export default function CompleteProfile() {
  const userInfo = useLocalStore((store) => store.userInfo);

  const cardsData = [
    {
      icon: <SolarIconSet.PenNewSquare size={32} />,
      title: 'بیوگرافی',
      description: userInfo.bio ? 'نوشته شده' : 'نوشته نشده',
      url: '/profile#biography',
      status: !!userInfo.bio,
    },
    {
      icon: <SolarIconSet.VerifiedCheck size={32} />,
      title: 'تایید هویت',
      description: userInfo.gender ? 'انجام شده' : 'انجام نشده',
      url: '/profile/complete_profile/identify_verification',
      status: !!userInfo.gender,
    },
    {
      icon: <SolarIconSet.Gallery size={32} />,
      title: 'تصاویر',
      description: `${userInfo.pictures.length} از 4 آپلود شده`,
      url: '/profile/complete_profile/complete_pictures',
      status: userInfo.pictures.length === 4,
    },
    {
      icon: <SolarIconSet.InfoCircle size={32} />,
      title: 'اطلاعات اولیه',
      description: userInfo.name ? '1 از 7 اضافه شده' : '0 از 7 اضافه شده', // Example logic
      url: '/profile/complete_profile/complete_basicinformations',
      status: !!userInfo.name,
    },
    // {
    //   icon: <SolarIconSet.StickerSmileSquare size={32} />,
    //   title: "آواتار",
    //   description: userInfo.username ? "انتخاب شده" : "انتخاب نشده",
    //   url: "/profile/complete_profile/",
    //   status: !!userInfo.username,
    // },
    // {
    //   icon: <SolarIconSet.Microphone size={32} />,
    //   title: "پیام خوش‌آمد گویی",
    //   description: "ضبط نشده", // Adjust logic as needed
    //   url: "/profile/complete_profile/",
    //   status: false, // Adjust logic as needed
    // },
    {
      icon: <CiStar size={32} />,
      title: 'علایق شخصی',
      description: `${userInfo.personalInterests.length} از 5 اضافه شده`,
      url: '/profile/complete_profile/complete_personalInterests',
      status: userInfo.personalInterests.length === 5,
    },
    {
      icon: <SolarIconSet.SuitcaseTag size={32} />,
      title: 'علایق عمومی در سفر',
      description: `${userInfo.travelsInterests.length} از 5 اضافه شده`,
      url: '/profile/complete_profile/complete_generalinterests',
      status: userInfo.travelsInterests.length === 5,
    },
    {
      icon: <SolarIconSet.Accessibility size={32} />,
      title: 'تخصص',
      description: userInfo.specialty.length ? 'انتخاب شده' : 'انتخاب نشده',
      url: '/profile/complete_profile/complete_specialty',
      status: !!userInfo.specialty.length,
    },
    {
      icon: <SolarIconSet.Home size={32} />,
      title: 'محل زندگی',
      description: userInfo.residenceCity ? 'انتخاب شده' : 'انتخاب نشده',
      url: '/profile/complete_profile/complete_residencecity',
      status: !!userInfo.residenceCity,
    },
  ];

  return (
    <Page
      contentClassName="flex h-full w-full flex-col items-center p-6 pt-20"
      header={<AppBar title={'65 درصد تکمیل شده'}></AppBar>}
    >
      <div className="flex w-full flex-col items-center gap-y-3 text-center">
        <h1>پروفایل خودتو تکمیل کن!</h1>
        <p className="text-sm font-medium text-gray-500">
          هر چقدر در تکمیل اطلاعات صادقتر باشید افرادی با شرایط مشابه بیشتری به
          شما معرفی خواهد شد و امکان مسافرت مناسب‌تر برا شما فراهم می‌شود.
        </p>
      </div>
      {/* Cards */}
      <div className="grid w-full grid-cols-2 gap-5 px-2 py-4">
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
    </Page>
  );
}
