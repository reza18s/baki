import Button from '@/components/base/Button/Button';
import { CircleSpinner } from '@/components/base/Loader/Loader';
import BottomSheetModal from '@/components/base/Modal/BottomSheetModal';
import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import { PlanCard } from '@/components/plan/planCard';
import {
  PricePlan,
  useGetPricePlanQuery,
} from '@/graphql/generated/graphql.codegen';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router';

export const Confirm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ code: string }>();
  const { id }: { id: string } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data, loading } = useGetPricePlanQuery();
  const plan = data?.getPricePlan.find((plan) => plan.id === +id);

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
          <Button variant="success" className="h-12 w-full text-white">
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
          onSubmit={handleSubmit(() => console.log('llll'))}
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
