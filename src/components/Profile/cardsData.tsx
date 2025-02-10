import * as SolarIconSet from 'solar-icon-set';
import { CiStar } from 'react-icons/ci';
import { UserInfo } from '@/store/useLocalStore';
import { paths } from '@/routes/paths';

export const getCardsData = (userInfo: UserInfo) => [
  {
    icon: <SolarIconSet.PenNewSquare size={32} />,
    title: 'بیوگرافی',
    description: userInfo.bio ? 'نوشته شده' : 'نوشته نشده',
    url: `${paths.profile.editProfile}/#biography`,
    status: !!userInfo.bio,
  },
  {
    icon: <SolarIconSet.VerifiedCheck size={32} />,
    title: 'تایید هویت',
    description: userInfo.verified ? 'انجام شده' : 'انجام نشده',
    url: paths.profile.identityVerification,
    status: !!userInfo.verified,
  },
  {
    icon: <SolarIconSet.Gallery size={32} />,
    title: 'تصاویر',
    description: `${userInfo.images?.length + (userInfo.mainImage ? 1 : 0)} از 4 آپلود شده`,
    url: paths.profile.completePictures,
    status: userInfo.images?.length + (userInfo.mainImage ? 1 : 0) === 4,
  },
  {
    icon: <SolarIconSet.InfoCircle size={32} />,
    title: 'اطلاعات اولیه',
    description: `${[userInfo?.gender, userInfo?.spiritStatus, userInfo?.maritalStatus, userInfo?.birthdate, userInfo.smokeStatus, userInfo.sportsStatus, userInfo.AmountOfEarlyRising].filter((e) => e).length} از 7 اضافه شده`,
    url: paths.profile.basicInformationsAll,
    status:
      [
        userInfo?.gender,
        userInfo?.spiritStatus,
        userInfo?.maritalStatus,
        userInfo?.birthdate,
        userInfo?.smokeStatus,
        userInfo?.sportsStatus,
        userInfo?.AmountOfEarlyRising,
      ].filter((e) => e).length === 7,
  },
  {
    icon: <SolarIconSet.StickerSmileSquare size={32} />,
    title: 'آواتار',
    description: userInfo.avatar ? 'انتخاب شده' : 'انتخاب نشده',
    url: paths.profile.avatar,
    status: !!userInfo.avatar,
  },
  {
    icon: <SolarIconSet.Microphone size={32} />,
    title: 'پیام خوش‌آمد گویی',
    description: userInfo.avatar ? 'ضبط شده' : 'ضبط نشده',
    url: paths.profile.record,
    status: !!userInfo.avatar,
  },
  {
    icon: <CiStar size={32} />,
    title: 'علایق شخصی',
    description: `${userInfo.personalInterests?.length} از 5 اضافه شده`,
    url: paths.profile.completePersonalInterests,
    status: (userInfo.personalInterests?.length || 0) >= 5,
  },
  {
    icon: <SolarIconSet.SuitcaseTag size={32} />,
    title: 'علایق عمومی در سفر',
    description: `${userInfo.travelInterests?.length} از 5 اضافه شده`,
    url: paths.profile.completeTravelInterests,
    status: (userInfo.travelInterests?.length || 0) >= 5,
  },
  {
    icon: <SolarIconSet.Accessibility size={32} />,
    title: 'تخصص',
    description: userInfo.mySpecialty?.length ? 'انتخاب شده' : 'انتخاب نشده',
    url: paths.profile.completeSpecialty,
    status: !!userInfo.mySpecialty,
  },
  {
    icon: <SolarIconSet.Home size={32} />,
    title: 'محل زندگی',
    description: userInfo.province ? 'انتخاب شده' : 'انتخاب نشده',
    url: paths.profile.completeProvinces,
    status: !!userInfo.province,
  },
];
