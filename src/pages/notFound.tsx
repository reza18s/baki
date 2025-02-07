import Button from '@/components/base/Button/Button';
import { IcDangerTriangle } from '@/components/icons/IcDangerTriangle';
import { Page } from '@/components/layout/Page';
import { useIonRouter } from '@ionic/react';
import React from 'react';

export default function NotFound() {
  const hs = useIonRouter();
  return (
    <Page contentClassName="items-center flex flex-col justify-center gap-4 h-full">
      <div className="flex size-16 items-center justify-center rounded-full bg-brand-yellow">
        <IcDangerTriangle></IcDangerTriangle>
      </div>
      <h1 className="text-base font-bold">صفحه مورد نظر یافت نشد!</h1>
      <Button
        className="h-10 w-4/5"
        onClick={() => {
          hs.goBack();
        }}
      >
        بازگشت
      </Button>
    </Page>
  );
}
