import { Discount, PricePlan } from '@/graphql/generated/graphql.codegen';
import { cn } from '@/lib/utils';
import React from 'react';
import { IcX } from '../icons/IcX';
export const calculatePriceWithDiscount = (
  price: number | string,
  discount?: number | null,
  add3Zero = true,
): number => {
  if (!discount) {
    discount = 0;
  }
  if (typeof price === 'string') {
    price = parseFloat(price);
  }

  if (!Number.isNaN(price)) {
    return (
      Math.round(Math.max(price - (price * discount) / 100, 0)) *
      (add3Zero ? 1000 : 1)
    );
  } else {
    return NaN;
  }
};

export const bakiPrice = (
  price: number | string,
  discount?: number | null,
  includeToman = false,
): string => {
  const finalPrice = calculatePriceWithDiscount(price, discount);
  if (finalPrice === 0) {
    return 'رایگان';
  }
  if (Number.isNaN(finalPrice)) {
    return 'نامعتبر';
  }
  if (includeToman) {
    return `${finalPrice.toLocaleString()} تومان`;
  }
  return finalPrice.toLocaleString();
};

export const PlanCard = ({
  onClick,
  select,
  plan,
  discount,
  className,
}: {
  onClick?: () => void;
  select?: PricePlan;
  plan: PricePlan;
  className?: string;
  discount?: Discount;
}) => {
  return (
    <div
      className={cn(
        'flex w-full justify-between rounded-2xl border-[1.5px] border-gray-300 bg-white px-6 py-4 transition-all delay-200 ease-in-out',
        select?.id === plan.id &&
          'border-brand-black bg-brand-yellow shadow-[0px_2px_#000]',
        className,
      )}
      onClick={onClick}
    >
      <div className="flex flex-col">
        <h1 className="text-lg font-bold">
          <span className="font-Yekan text-[32px]">{plan.months}</span> ماهه
        </h1>
        <div
          className={cn(
            'flex h-6 items-center justify-center rounded-2xl bg-brand-yellow px-3 text-xs font-bold transition-all delay-200 ease-in-out',
            select?.id === plan.id && 'bg-white',
          )}
        >
          %{plan.discount + (discount?.percent || 0)} تخفیف
        </div>
      </div>
      <div className="flex items-center justify-center font-Yekan">
        <div className="flex h-6 items-center justify-center gap-1 font-Yekan text-base font-bold">
          {bakiPrice(
            plan.price / plan.months,
            plan.discount + (discount?.percent || 0),
          )}
          <span className="font-iransans text-[10px] font-normal">تومان</span>
        </div>
        <IcX className="size-7"></IcX>
        <div className="flex h-6 w-5 items-center justify-center rounded-sm border-[1px] border-brand-black font-Yekan text-base font-bold">
          {plan.months}
        </div>
      </div>
    </div>
  );
};
