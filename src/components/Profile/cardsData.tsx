import * as SolarIconSet from 'solar-icon-set';
import { CiStar } from 'react-icons/ci';
import { UserInfo } from '@/store/useLocalStore';

export const getCardsData = (userInfo: UserInfo) => [
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
    description: userInfo.verified ? 'انجام شده' : 'انجام نشده',
    url: '/profile/complete_profile/identify_verification',
    status: !!userInfo.verified,
  },
  {
    icon: <SolarIconSet.Gallery size={32} />,
    title: 'تصاویر',
    description: `${userInfo.images?.length} از 4 آپلود شده`,
    url: '/profile/complete_profile/complete_pictures',
    status: userInfo.images?.length === 4,
  },
  {
    icon: <SolarIconSet.InfoCircle size={32} />,
    title: 'اطلاعات اولیه',
    description: `${[userInfo?.gender, userInfo?.spiritStatus, userInfo?.maritalStatus, userInfo?.birthdate, userInfo.smokeStatus, userInfo.sportsStatus, userInfo.AmountOfEarlyRising].filter((e) => e).length} از 7 اضافه شده`,
    url: '/profile/complete_profile/complete_basicinformations',
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
    icon: <CiStar size={32} />,
    title: 'علایق شخصی',
    description: `${userInfo.personalInterests?.length} از 5 اضافه شده`,
    url: '/profile/complete_profile/complete_personalInterests',
    status: (userInfo.personalInterests?.length || 0) >= 5,
  },
  {
    icon: <SolarIconSet.SuitcaseTag size={32} />,
    title: 'علایق عمومی در سفر',
    description: `${userInfo.travelInterests?.length} از 5 اضافه شده`,
    url: '/profile/complete_profile/complete_generalinterests',
    status: (userInfo.travelInterests?.length || 0) >= 5,
  },
  {
    icon: <SolarIconSet.Accessibility size={32} />,
    title: 'تخصص',
    description: userInfo.mySpecialty?.length ? 'انتخاب شده' : 'انتخاب نشده',
    url: '/profile/complete_profile/complete_specialty',
    status: !!userInfo.mySpecialty,
  },
  {
    icon: <SolarIconSet.Home size={32} />,
    title: 'محل زندگی',
    description: userInfo.province ? 'انتخاب شده' : 'انتخاب نشده',
    url: '/profile/complete_profile/complete_residencecity',
    status: !!userInfo.province,
  },
];
