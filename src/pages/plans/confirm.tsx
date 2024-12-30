import Button from '@/components/base/Button/Button';
import { CircleSpinner } from '@/components/base/Loader/Loader';
import BottomSheetModal from '@/components/base/Modal/BottomSheetModal';
import { customToast } from '@/components/base/toast';
import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import { PlanCard } from '@/components/plan/planCard';
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
import { useParams } from 'react-router';
import { onBazarPaymentException } from './helper';
import { Capacitor } from '@capacitor/core';
export interface PaymentVariables {
  bazarPurchaseToken?: string;
  authority?: string;
  transactionsId?: string;
}
export const Confirm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<{ code: string }>();
  const [purchasing, setPurchasing] = useState(false);
  const { id }: { id: string } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [discount, setDiscount] = useState<Discount>();
  const { data, loading } = useGetPricePlanQuery();
  const plan = data?.getPricePlan.find((plan) => plan.id === +id);
  const [checkDiscount] = useCheckDiscountMutation();
  const [requestPayMut, { loading: requestLoading }] = useRequestPayMutation();
  const [activePlanMut] = useActivePlanMutation();

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
          }
        } else if (tryCount < 3) {
          setTimeout(() => {
            activePlan(planId, paymentVars, tryCount + 1);
          }, 1000);
        } else {
          setPurchasing(false);
        }
      },
      async onError(error) {
        if (tryCount < 3) {
          setTimeout(() => {
            activePlan(planId, paymentVars, tryCount + 1);
          }, 1000);
        } else {
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
        console.log('ConfirmPurchase:: bazar result', JSON.stringify(result));
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
            console.log('llll');

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
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Page
      contentClassName="p-6 pt-20 flex gap-4 flex-col items-center bg-gray-50 min-h-full"
      header={<AppBar title="تایید خرید"></AppBar>}
    >
      {loading && !plan ? (
        <CircleSpinner></CircleSpinner>
      ) : (
        <>
          <PlanCard
            className="shadow-[0px_1px_#0000001f]"
            plan={plan as PricePlan}
          ></PlanCard>

          <h2
            className="w-full px-4 text-sm font-bold"
            onClick={() => setIsOpen(true)}
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
            پرداخت {(plan?.price || 0) * 10000} تومان
          </Button>
        </>
      )}
      <BottomSheetModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="p-6"
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((values) => {
            checkDiscount({
              variables: { code: values.code },
              onCompleted: (data) => {
                setDiscount(data.checkDiscount);
                setIsOpen(false);
              },
              onError: (err) => {
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
              <div
                className={cn(
                  'flex items-center rounded-xl border border-brand-black p-3 transition-all duration-100 ease-in-out',
                  field.value.length && 'shadow-[0px_2px_#000]',
                  errors.code &&
                    'border-brand-red shadow-[0px_2px_#000] shadow-brand-red',
                  isSubmitSuccessful &&
                    'border-brand-green shadow-[0px_2px_#000] shadow-brand-green',
                  // true && 'border-brand-green shadow-brand-green',
                )}
              >
                <input
                  {...field}
                  type="text"
                  dir="ltr"
                  placeholder="XXXX111"
                  className="w-full border-none bg-white text-sm outline-none"
                />
              </div>
            )}
          />
          <Button className="mt-4 w-full">تایید و بازگشت</Button>
        </form>
      </BottomSheetModal>
    </Page>
  );
};
