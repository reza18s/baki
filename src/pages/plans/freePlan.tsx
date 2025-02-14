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
import {
  useGetFreePlanMutation,
  useGetUserInvitationCodeQuery,
  useVerifyInvitationCodeMutation,
} from '@/graphql/generated/graphql.codegen';
import { Clipboard } from '@capacitor/clipboard';
import { customToast } from '@/components/base/toast';
import BottomSheetModal from '@/components/base/Modal/BottomSheetModal';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useIonRouter } from '@ionic/react';
import { paths } from '@/routes/paths';
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
  const [isOpen, setIsOpen] = useState<'invitation'>();
  const { data } = useGetUserInvitationCodeQuery({});
  const [VerifyInvitationCode, { data: VerifyCode, error }] =
    useVerifyInvitationCodeMutation();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitSuccessful },
  } = useForm<{ code: string }>();
  const userStep = data?.getUserInvitationCode.usedBy
    ? Object.keys(data?.getUserInvitationCode.usedBy)?.length
    : 0;
  const history = useIonRouter();
  const [getFreePlan] = useGetFreePlanMutation();
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
      <Button className="h-12 w-full" onClick={() => setIsOpen('invitation')}>
        ورود کد دعوت و دریافت جایزه
      </Button>
      <div className="flex flex-col items-center gap-2">
        <div className="flex w-full flex-col gap-4 rounded-xl border border-gray-300 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-medium">لینک دعوت شما:</h1>
            <span
              className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-1 text-xs font-bold"
              onClick={() => {
                Clipboard.write({
                  string: data?.getUserInvitationCode.code,
                }).then(() => customToast('کپی شد', 'success'));
              }}
            >
              کپی کردن <IcCopy></IcCopy>
            </span>
          </div>
          <h2
            className="text w-full overflow-hidden truncate text-nowrap rounded-lg bg-gray-50 px-4 py-1 text-center text-xs font-bold underline-offset-auto"
            style={{
              textUnderlinePosition: 'from-font',
              textDecorationLine: 'underline',
              textDecorationStyle: 'solid',
              textDecorationSkipInk: 'none',
            }}
            dir="ltr"
          >
            {data?.getUserInvitationCode.code}
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
              disabled={
                val.stepsToPrize > userStep ||
                (data?.getUserInvitationCode.steps
                  ? data?.getUserInvitationCode.steps[val.stepsToPrize]
                      ?.SpecialPrizeReceived
                  : false)
              }
              className={'relative h-12 w-full overflow-hidden p-0'}
              onClick={() => {
                getFreePlan({
                  variables: { step: val.stepsToPrize },
                  onCompleted: () => {
                    customToast('پلن با موفقیت فعال شد', 'success');
                    history.push(`${paths.main.explore}?pay=success`);
                  },
                  onError(error) {
                    customToast(error.message, 'error');
                  },
                });
              }}
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

      <BottomSheetModal
        isOpen={isOpen === 'invitation'}
        onRequestClose={() => setIsOpen(undefined)}
        className="p-6 pt-0"
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((values) => {
            VerifyInvitationCode({
              variables: { invitationCode: values.code },
              onCompleted: (data) => {
                customToast('کد دعوت وارد شده معتبر می‌باشد!', 'success');
                setIsOpen(undefined);
              },
              onError: (err) => {
                setError('code', {
                  message: 'کد تخفیف وارد شده معتبر نمی‌باشد.',
                });
                customToast(err.message, 'error');
              },
            });
          })}
        >
          <h1 className="w-full text-center text-lg font-bold">
            کد دعوت خود را وارد کنید:
          </h1>
          <Controller
            name="code"
            control={control}
            defaultValue={''}
            rules={{ required: true, min: 5 }}
            render={({ field }) => (
              <div>
                <div
                  className={cn(
                    'flex items-center rounded-xl border border-brand-black p-3 transition-all duration-100 ease-in-out',
                    field.value.length && 'shadow-[0px_2px_#000]',
                    isSubmitSuccessful &&
                      'border-brand-green shadow-[0px_2px_#000] shadow-brand-green',
                    errors.code &&
                      'border-brand-red shadow-[0px_2px_#000] shadow-brand-red',
                    // true && 'border-brand-green shadow-brand-green',
                  )}
                >
                  <IcGift
                    className={cn(
                      isSubmitSuccessful && 'fill-brand-green',
                      errors.code && 'fill-brand-red',
                    )}
                  ></IcGift>
                  <input
                    {...field}
                    type="text"
                    dir="ltr"
                    placeholder="XXXX111"
                    className="w-full border-none bg-white text-sm outline-none"
                  />
                </div>
                <p
                  className={cn(
                    'mt-1 px-4 text-xs',
                    isSubmitSuccessful && 'text-brand-green',
                    errors.code && 'text-brand-red',
                  )}
                >
                  {(VerifyCode?.verifyInvitationCode &&
                    'کد دعوت وارد شده معتبر می‌باشد!') ||
                    (error && 'کد دعوت وارد شده معتبر نمی‌باشد.')}
                </p>
              </div>
            )}
          />
          <Button className="mt-4 w-full" onClick={() => setIsOpen(undefined)}>
            تایید و بازگشت
          </Button>
        </form>
      </BottomSheetModal>
    </Page>
  );
};
