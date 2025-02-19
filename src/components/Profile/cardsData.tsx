import * as SolarIconSet from 'solar-icon-set';
import { CiStar } from 'react-icons/ci';
import { UserInfo } from '@/store/useLocalStore';
import { paths } from '@/routes/paths';

export const getCardsData = (userInfo: UserInfo) => [
  {
    icon: <SolarIconSet.PenNewSquare size={32} />,
    title: 'بیوگرافی',
    description: userInfo.bio ? 'نوشته شده' : 'نوشته نشده',
    url: `${paths.profile.editProfile}#bio`,
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
    description: `${userInfo.images?.filter((image) => image.length > 0).length + (userInfo.mainImage ? 1 : 0)} از 4 آپلود شده`,
    url: paths.profile.completePictures,
    status:
      userInfo.images?.filter((image) => image.length > 0).length +
        (userInfo.mainImage ? 1 : 0) ===
      4,
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
    description: userInfo.record ? 'ضبط شده' : 'ضبط نشده',
    url: paths.profile.record,
    status: !!userInfo.record,
  },
  {
    icon: (
      <svg
        width="33"
        height="32"
        viewBox="0 0 33 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.4541 7.21052C14.1429 4.18085 14.9874 2.66602 16.2498 2.66602C17.5123 2.66602 18.3568 4.18085 20.0456 7.21051L20.4825 7.99433C20.9625 8.85526 21.2024 9.28573 21.5766 9.56976C21.9507 9.85379 22.4167 9.95922 23.3487 10.1701L24.1971 10.3621C27.4767 11.1041 29.1165 11.4751 29.5066 12.7297C29.8967 13.9842 28.7788 15.2914 26.543 17.9059L25.9646 18.5823C25.3293 19.3253 25.0116 19.6967 24.8687 20.1563C24.7258 20.6159 24.7738 21.1115 24.8699 22.1028L24.9573 23.0052C25.2953 26.4935 25.4643 28.2376 24.443 29.013C23.4216 29.7883 21.8863 29.0814 18.8156 27.6676L18.0212 27.3018C17.1486 26.9 16.7123 26.6991 16.2498 26.6991C15.7874 26.6991 15.3511 26.9 14.4785 27.3018L13.6841 27.6676C10.6134 29.0814 9.07807 29.7883 8.0567 29.013C7.03533 28.2376 7.20434 26.4935 7.54237 23.0052L7.62982 22.1028C7.72587 21.1115 7.7739 20.6159 7.63099 20.1563C7.48808 19.6967 7.1704 19.3253 6.53506 18.5823L5.95663 17.9059C3.72084 15.2914 2.60294 13.9842 2.99307 12.7297C3.38319 11.4751 5.02298 11.1041 8.30255 10.3621L9.15102 10.1701C10.083 9.95922 10.5489 9.85379 10.9231 9.56976C11.2972 9.28573 11.5372 8.85526 12.0171 7.99433L12.4541 7.21052Z"
          stroke="white"
          strokeWidth="1.75"
        />
      </svg>
    ),
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
