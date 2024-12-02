import Button from '@/components/base/Button/Button';
import { IcBillListr } from '@/components/icons/IcBillList';
import { IcCrownStar } from '@/components/icons/IcCrownStar';
import { IcDocument } from '@/components/icons/IcDocument';
import { IcGift } from '@/components/icons/IcGift';
import { IcHelp } from '@/components/icons/IcHelp';
import { IcShear } from '@/components/icons/IcShear';
import { IcStar } from '@/components/icons/IcStar';
import { IcUserBlackList } from '@/components/icons/IcUserBlackList';
import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import ArrowButton from '@/components/shared/Buttons/ArrowButton';
import { paths } from '@/routes/paths';
import { shareRecipe } from '@/utils/share';
export const Settings = () => {
  return (
    <Page
      contentClassName="pt-20 p-6 flex flex-col gap-2 h-full justify-between pb-2 bg-gray-50"
      header={<AppBar title="تنظیمات"></AppBar>}
    >
      <div className="flex flex-col gap-2">
        <ArrowButton
          // url={'/'}
          className="bg-brand-yellow"
          text={
            <>
              خرید اشتراک{' '}
              <span className="text-brand-red">(اشتراک غیرفعال)</span>
            </>
          }
          icon={<IcCrownStar></IcCrownStar>}
        ></ArrowButton>{' '}
        <ArrowButton
          className="bg-white"
          text={'اشتراک رایگان'}
          icon={<IcGift></IcGift>}
        ></ArrowButton>
        <ArrowButton
          className="bg-white"
          onClick={() => shareRecipe()}
          text="دعوت از دوستان"
          icon={<IcShear></IcShear>}
        ></ArrowButton>
        <ArrowButton
          className="bg-white"
          text="لیست علاقه‌مندی‌ها"
          icon={<IcStar></IcStar>}
        ></ArrowButton>
        <ArrowButton
          className="bg-white"
          text="لیست سیاه"
          icon={<IcUserBlackList></IcUserBlackList>}
        ></ArrowButton>
        <ArrowButton
          className="bg-white"
          url={paths.settings.bills}
          text="سوابق پرداختی"
          icon={<IcBillListr></IcBillListr>}
        ></ArrowButton>
        <ArrowButton
          className="bg-white"
          url={paths.settings.support}
          text="پشتیبانی و اطلاع‌رسانی"
          icon={<IcHelp></IcHelp>}
        ></ArrowButton>
        <ArrowButton
          className="bg-white"
          text="قوانین و مقررات"
          icon={<IcDocument></IcDocument>}
        ></ArrowButton>
        <Button variant="danger-outline">خروج از حساب کاربری</Button>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-1">
        <svg
          width="64"
          height="37"
          viewBox="0 0 64 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.6745 19.4487C24.9262 19.4487 25.052 20.7072 25.052 23.2243C25.052 25.7414 24.9262 27 24.6745 27H7.94831C7.79729 27.1762 7.68402 27.365 7.6085 27.5663C7.53299 27.7929 7.49523 27.9817 7.49523 28.1327C7.49523 28.762 7.93573 29.0766 8.81671 29.0766H21.2764L20.71 36.6279H7.68402C5.36828 36.6279 3.59372 36.0742 2.36034 34.9666C1.12695 33.8591 0.510264 32.3363 0.510264 30.3981C0.510264 29.064 0.862658 27.4027 1.56745 25.4142C2.29741 23.4005 3.26649 21.412 4.47471 19.4487H24.6745ZM32.4028 19.4487C32.6293 19.4487 32.8055 19.3983 32.9314 19.2977C33.0824 19.1718 33.1579 19.0334 33.1579 18.8823C33.1579 18.6306 32.9691 18.316 32.5916 17.9384L25.4178 10.9534V5.66753L40.898 0.00403833L42.5971 7.17779L35.0457 10.0095L38.0663 13.0301C39.4255 14.3893 40.3317 15.5723 40.7847 16.5792C41.2378 17.586 41.4644 18.7313 41.4644 20.015C41.4644 22.3559 40.747 24.1053 39.3122 25.2632C37.9027 26.4211 36.04 27 33.7243 27H23.9075C23.6558 27 23.53 25.7414 23.53 23.2243C23.53 21.6134 23.5677 20.5814 23.6433 20.1283C23.7188 19.6752 23.8069 19.4487 23.9075 19.4487H32.4028ZM53.7176 19.4487C53.8434 19.4487 53.9315 19.6752 53.9819 20.1283C54.0574 20.5814 54.0951 21.6134 54.0951 23.2243C54.0951 24.8353 54.0574 25.8673 53.9819 26.3204C53.9315 26.7735 53.8434 27 53.7176 27H51.8297C49.4133 27 47.5758 26.333 46.3173 24.9989C45.0839 23.6648 44.4672 21.7518 44.4672 19.2599V2.83578H51.6409V18.6936C51.6409 18.9704 51.6913 19.1718 51.792 19.2977C51.9178 19.3983 52.1192 19.4487 52.3961 19.4487H53.7176ZM63.9133 19.2599C63.9133 21.626 63.2085 23.5138 61.7989 24.9234C60.4145 26.3078 58.5393 27 56.1732 27H52.9639C52.7122 27 52.5863 25.7414 52.5863 23.2243C52.5863 21.6134 52.6241 20.5814 52.6996 20.1283C52.7751 19.6752 52.8632 19.4487 52.9639 19.4487H56.1732C56.6766 19.4487 56.9283 19.2599 56.9283 18.8823V12.8413H63.9133V19.2599ZM52.3975 34.7401V29.2654H59.5713V34.7401H52.3975Z"
            fill="#CBD5E1"
          />
        </svg>
        <span className="relative bottom-0 text-[10px]">نسخه 1.0.0</span>
      </div>
    </Page>
  );
};
