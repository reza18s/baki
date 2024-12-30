import Button from '@/components/base/Button/Button';
import { IcCopy } from '@/components/icons/IcCopy';
import { IcGift } from '@/components/icons/IcGift';
import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import Image1 from '@/assets/images/freePlan/image1.png';
import Image2 from '@/assets/images/freePlan/image2.png';
import Image3 from '@/assets/images/freePlan/image3.png';
import Image4 from '@/assets/images/freePlan/image4.png';
import Image5 from '@/assets/images/freePlan/image5.png';
import Image6 from '@/assets/images/freePlan/image6.png';
import Image7 from '@/assets/images/freePlan/image7.png';
import Image8 from '@/assets/images/freePlan/image8.png';
import Image9 from '@/assets/images/freePlan/image9.png';
const achievements = [
  {
    steps: [
      {
        stepNumber: 1,
        icon: Image1,
        title: 'زیرانداز',
      },
      {
        stepNumber: 2,
        icon: Image2,
        title: 'چادر',
      },
      {
        stepNumber: 3,
        icon: Image3,
        title: 'کوله پشتی',
      },
    ],
    stepsToPrize: 3,
    SpecialPrize: 'اشتراک یک ماهه رایگان',
  },
  {
    steps: [
      {
        stepNumber: 4,
        icon: Image4,
        title: 'کنسرو',
      },
      {
        stepNumber: 5,
        icon: Image5,
        title: 'نقشه',
      },
      {
        stepNumber: 6,
        icon: Image6,
        title: 'چراغ قوه',
      },
      {
        stepNumber: 7,
        icon: Image7,
        title: 'قمقمه',
      },
      {
        stepNumber: 8,
        icon: Image8,
        title: 'تبر',
      },
      {
        stepNumber: 9,
        icon: Image9,
        title: 'صندلی',
      },
    ],
    stepsToPrize: 9,
    SpecialPrize: 'اشتراک سه ماهه رایگان',
  },
];
function getDistanceToNextPrize(currentStep: number) {
  for (const achievement of achievements) {
    if (achievement.stepsToPrize > currentStep) {
      return achievement.stepsToPrize - currentStep;
    }
  }
  return 0; // اگر جایزه‌ای وجود نداشته باشد
}
export const FreePlan = () => {
  const userStep = 0;
  return (
    <Page
      contentClassName="relative p-6 pt-20 pb-32 flex flex-col gap-6 "
      header={<AppBar title="اشتراک ویژه رایگان"></AppBar>}
      scrollY
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center justify-center rounded-full bg-brand-yellow p-8">
          <IcGift className="size-14"></IcGift>
        </div>
        <h1 className="mt-4 text-center text-lg font-bold">
          دوستتو بیار، اشتراک رایگان ببر!
        </h1>
        <span className="text-center text-sm font-medium text-gray-500">
          با هر دعوت موفق، یکی از وسایل لازم سفر رو برنده میشی و با کامل شدن
          وسایلت، می‌تونی اشتراک طلایی رایگان دریافت کنی!
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex w-full flex-col gap-4 rounded-xl border border-gray-300 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-medium">لینک دعوت شما:</h1>
            <span className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-1 text-xs font-bold">
              کپی کردن <IcCopy></IcCopy>
            </span>
          </div>
          <h2
            className="text w-full overflow-hidden truncate text-nowrap rounded-lg bg-gray-50 px-4 py-1 text-xs font-bold underline-offset-auto"
            style={{
              textUnderlinePosition: 'from-font',
              textDecorationLine: 'underline',
              textDecorationStyle: 'solid',
              textDecorationSkipInk: 'none',
            }}
            dir="ltr"
          >
            https://www.figma.com/design/2EbpuvNHeX5rWnrLECsoPq/%F0%9F%94%8E-BaKi---UI%2FUX?node-id=20-14473&t=QkUv2Vqr3mBtH4iK-0
          </h2>
        </div>
        <div className="flex w-full flex-col gap-4 rounded-xl border border-gray-300 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-medium">تعداد دعوت‌های موفق شما:</h1>
            <span className="flex items-center gap-2 rounded-lg bg-gray-50 px-6 py-1 text-xs font-bold">
              {userStep}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-medium">
              تعداد دعوت لازم برای جایزه بعدی:
            </h1>
            <span className="flex items-center gap-2 rounded-lg bg-gray-50 px-6 py-1 text-xs font-bold">
              {getDistanceToNextPrize(userStep)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {achievements.map((val, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-2">
              {val.steps.map((step) => (
                <div
                  className="relative flex flex-col items-center justify-center gap-4 rounded-xl bg-warning-50 p-4"
                  key={step.stepNumber}
                >
                  {step.stepNumber > userStep && (
                    <div className="absolute inset-0 z-10 h-full w-full bg-gray-50/50"></div>
                  )}
                  <img src={step.icon} className="h-12"></img>
                  <h1 className="text-center text-sm font-bold">
                    {step.title}
                  </h1>
                </div>
              ))}
            </div>
            <Button
              disabled={val.stepsToPrize > userStep}
              className={'relative h-12 w-full overflow-hidden p-0'}
            >
              {val.stepsToPrize > userStep && (
                <div className="absolute inset-0 z-10 h-full w-full bg-gray-50/50"></div>
              )}
              {val.SpecialPrize}
            </Button>
          </div>
        ))}
      </div>
      <Button className="fixed bottom-6 z-20 w-[calc(100%-48px)] py-4">
        ارسال لینک دعوت
      </Button>
    </Page>
  );
};
