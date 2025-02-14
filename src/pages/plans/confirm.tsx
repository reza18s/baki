import Button from '@/components/base/Button/Button';
import { CircleSpinner } from '@/components/base/Loader/Loader';
import BottomSheetModal from '@/components/base/Modal/BottomSheetModal';
import { customToast } from '@/components/base/toast';
import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import { bakiPrice, PlanCard } from '@/components/plan/planCard';
import {
  Discount,
  PricePlan,
  useActivePlanMutation,
  useCheckDiscountMutation,
  useGetPricePlanQuery,
  useRequestPayMutation,
} from '@/graphql/generated/graphql.codegen';
import { cn } from '@/lib/utils';
import BazarPlugin from '@/plugins/BazarPlugin';
import { calculatePriceWithDiscount } from '@/utils/price';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router';
import { onBazarPaymentException } from './helper';
import { Capacitor } from '@capacitor/core';
import { IcDiscount } from '@/components/icons/IcDiscount';
import Modal from '@/components/base/Modal/Modal';
import { IcExclamationMarkInCircleFill } from '@/components/icons/IcExclamationMarkInCircleFill';
import { paths } from '@/routes/paths';
import { useIonRouter } from '@ionic/react';
export interface PaymentVariables {
  bazarPurchaseToken?: string;
  authority?: string;
  transactionsId?: string;
}
type IConfirm = RouteComponentProps<{
  id: string;
}>;
export const Confirm = ({ match }: IConfirm) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitSuccessful },
  } = useForm<{ code: string }>();
  const [purchasing, setPurchasing] = useState(false);
  const id = match.params.id;
  const [isOpen, setIsOpen] = useState<'discount' | 'failed-plan'>();
  const [discount, setDiscount] = useState<Discount>();
  const { data, loading } = useGetPricePlanQuery();
  const plan = data?.getPricePlan.find((plan) => plan.id === +id);
  const [checkDiscount, { loading: checkLoading, error }] =
    useCheckDiscountMutation();
  const [requestPayMut, { loading: requestLoading }] = useRequestPayMutation();
  const [activePlanMut] = useActivePlanMutation();
  const history = useIonRouter();

  const calculatePrice = (): string => {
    return calculatePriceWithDiscount(
      plan?.price ?? 0,
      discount?.percent,
    ).toFixed(0);
  };
  const activePlan = (
    planId: number,
    paymentVars: PaymentVariables,
    tryCount = 0,
  ) => {
    const { bazarPurchaseToken } = paymentVars;

    activePlanMut({
      variables: {
        ...paymentVars,
        planId,
      },
      onCompleted: (data) => {
        if (data.activePlan) {
          customToast('اشتراک شما با موفقیت فعال شد', 'success');
          setPurchasing(false);
          if (bazarPurchaseToken) {
            BazarPlugin.consumePurchase({
              purchaseToken: bazarPurchaseToken,
            });
            history.push(`${paths.main.explore}?pay=success`);
          }
        } else if (tryCount < 3) {
          setTimeout(() => {
            activePlan(planId, paymentVars, tryCount + 1);
          }, 1000);
        } else {
          setIsOpen('failed-plan');
          setPurchasing(false);
        }
      },
      async onError(error) {
        if (tryCount < 3) {
          setTimeout(() => {
            activePlan(planId, paymentVars, tryCount + 1);
          }, 1000);
        } else {
          setIsOpen('failed-plan');
          setPurchasing(false);
        }
      },
    });
  };

  const handleAndroidPurchase = async () => {
    try {
      setPurchasing(true);
      await BazarPlugin.connect();

      const payload = {
        amount: calculatePrice(),
      };
      const result = await BazarPlugin.startPayment({
        payload: JSON.stringify(payload),
        productId: plan!.bazarId,
        dynamicPriceToken: discount?.code,
      });
      if (result.purchaseToken) {
        activePlan(plan!.id, {
          bazarPurchaseToken: result.purchaseToken,
        });
      }
    } catch (e: any) {
      onBazarPaymentException(e);
      setPurchasing(false);
    }
  };

  const handleZarinpalPurchase = async () => {
    try {
      if (plan && !purchasing) {
        const planId = plan.id;
        setPurchasing(true);
        requestPayMut({
          variables: {
            code: discount?.code,
            planId: planId,
          },
          onCompleted(data) {
            const paymentData = data.requestPay;
            if (paymentData) {
              if (paymentData.paymentURL.length > 0) {
                window.location.href = data.requestPay.paymentURL;
              } else if (paymentData.transactionsId) {
                activePlan(planId, {
                  transactionsId: paymentData.transactionsId,
                });
              }
            }
          },
          onError: (err) => {
            console.log(err);
            setPurchasing(false);
            customToast('مشکلی پیش امد لطفا  دوباره امتحان کنید', 'error');
          },
        });
      }
    } catch (e) {
      setPurchasing(false);
    }
  };
  return (
    <Page
      contentClassName="p-6 pt-20 flex gap-4 flex-col items-center bg-gray-50 min-h-full"
      header={<AppBar title="تایید خرید"></AppBar>}
      loading={loading || !plan}
    >
      <>
        <PlanCard
          className="shadow-[0px_1px_#0000001f]"
          plan={plan as PricePlan}
          discount={discount}
        ></PlanCard>

        <h2
          className="w-full px-4 text-sm font-bold"
          onClick={() => setIsOpen(undefined)}
        >
          کد تخفیف دارید؟
        </h2>
        <Button
          loading={requestLoading}
          variant="success"
          onClick={() => {
            if (plan && !purchasing) {
              if (Capacitor.getPlatform() === 'android') {
                handleAndroidPurchase();
              } else {
                handleZarinpalPurchase();
              }
            }
          }}
          className="h-12 w-full text-white"
        >
          پرداخت{' '}
          {bakiPrice(plan!.price, plan!.discount + (discount?.percent || 0))}{' '}
          تومان
        </Button>
      </>
      <BottomSheetModal
        isOpen={isOpen === 'discount'}
        onRequestClose={() => setIsOpen(undefined)}
        className="p-6 pt-0"
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((values) => {
            checkDiscount({
              variables: { code: values.code },
              onCompleted: (data) => {
                setDiscount(data.checkDiscount);
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
            کد تخفیف خود را وارد کنید:
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
                      discount &&
                      'border-brand-green shadow-[0px_2px_#000] shadow-brand-green',
                    errors.code &&
                      'border-brand-red shadow-[0px_2px_#000] shadow-brand-red',
                    // true && 'border-brand-green shadow-brand-green',
                  )}
                >
                  <IcDiscount
                    className={cn(
                      isSubmitSuccessful && discount && 'fill-brand-green',
                      errors.code && 'fill-brand-red',
                    )}
                  ></IcDiscount>
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
                    isSubmitSuccessful && discount && 'text-brand-green',
                    errors.code && 'text-brand-red',
                  )}
                >
                  {(discount && 'کد تخفیف وارد شده معتبر می‌باشد!') ||
                    (error && 'کد تخفیف وارد شده معتبر نمی‌باشد.')}
                </p>
              </div>
            )}
          />
          <Button className="mt-4 w-full" onClick={() => setIsOpen(undefined)}>
            تایید و بازگشت
          </Button>
        </form>
      </BottomSheetModal>
      <Modal
        className="flex w-[85%] flex-col items-center justify-center gap-4 rounded-3xl bg-white px-6 py-4"
        isOpen={isOpen === 'failed-plan'}
        onRequestClose={() => setIsOpen(undefined)}
      >
        <div className="flex items-center justify-center rounded-full bg-brand-red p-4">
          <IcExclamationMarkInCircleFill className="size-8 fill-white"></IcExclamationMarkInCircleFill>
        </div>

        <h1 className="text-center text-lg font-bold">پرداخت ناموفق</h1>
        <span className="text-center text-sm text-gray-500">
          درصورتی که مبلغ از حساب شما کسر شده است به پشتیبانی اطلاع دهید.
        </span>
        <div className="flex w-full flex-col gap-2">
          <Button
            className="h-10 w-full"
            onClick={() => {
              history.push(paths.settings.support, 'forward', 'replace');
            }}
          >
            ارتباط با پشتیبانی
          </Button>
          <Button
            variant="outline"
            className="h-10 w-full border-black"
            onClick={() => setIsOpen(undefined)}
          >
            بازگشت
          </Button>
        </div>
      </Modal>
    </Page>
  );
};
