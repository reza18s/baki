import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import { useGetTransactionQuery } from '@/graphql/generated/graphql.codegen';
import React from 'react';

export const Bills = () => {
  const { data } = useGetTransactionQuery();
  return (
    <Page
      contentClassName="pt-20 bg-gray-50 h-full p-6"
      header={<AppBar title="سوابق پرداختی"></AppBar>}
      scrollY
    >
      {data?.getTransaction.map((transaction) => (
        <div
          className="flex flex-col items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-4"
          key={transaction.id}
        >
          <div className="flex w-full items-center justify-between border-b border-gray-300 pb-2">
            <h1 className="text-xs font-medium text-gray-500">خرید</h1>
            <p className="text-sm font-medium">
              اشتراک {transaction.details?.title}
            </p>
          </div>
          <div className="flex w-full items-center justify-between border-b border-gray-300 pb-2">
            <h1 className="text-xs font-medium text-gray-500">مبلغ</h1>
            <p className="text-sm font-medium">{transaction.amount} تومان</p>
          </div>
          <div className="flex w-full items-center justify-between border-b border-gray-300 pb-2">
            <h1 className="text-xs font-medium text-gray-500">تاریخ</h1>
            <p className="text-sm font-medium">{transaction.createdAt}</p>
          </div>
          <div className="flex w-full items-center justify-between border-b border-gray-300 pb-2">
            <h1 className="text-xs font-medium text-gray-500">وضعیت</h1>
            <p className="text-sm font-medium">{transaction.status}</p>
          </div>
          <div className="flex w-full items-center justify-between border-b border-gray-300 pb-2">
            <h1 className="text-xs font-medium text-gray-500">شناسه خرید</h1>
            <p className="text-sm font-medium">152697</p>
          </div>
          <div className="flex w-full items-center justify-between">
            <h1 className="text-xs font-medium text-gray-500">تخفیف</h1>
            <p className="text-sm font-medium">{transaction.discount || 0}%</p>
          </div>
        </div>
      ))}
    </Page>
  );
};
