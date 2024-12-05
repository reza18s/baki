import { IcExclamationMarkInCircle } from '@/components/icons/IcExclamationMarkInCircle';
import { IcHeadphones } from '@/components/icons/IcHeadphones';
import { IcPenRound } from '@/components/icons/IcPenRound';
import { IcQuestionCircle } from '@/components/icons/IcQuestionCircle';
import { IcStars } from '@/components/icons/IcStars';
import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import ArrowButton from '@/components/shared/Buttons/ArrowButton';
import { paths } from '@/routes/paths';
import React from 'react';

export const Support = () => {
  return (
    <Page
      contentClassName="pt-20 p-6 flex flex-col gap-2 h-full justify-between pb-2 bg-gray-50"
      header={<AppBar title="پشتیبانی و اطلاع رسانی"></AppBar>}
    >
      <div className="flex flex-col gap-2">
        <ArrowButton
          url={paths.settings.questions}
          text={'سوالات متداول'}
          icon={<IcQuestionCircle></IcQuestionCircle>}
        ></ArrowButton>{' '}
        <ArrowButton
          url={paths.settings.guide}
          text="راهنما"
          icon={
            <IcExclamationMarkInCircle className="size-5 fill-brand-black"></IcExclamationMarkInCircle>
          }
        ></ArrowButton>
        <ArrowButton
          url={paths.settings.contactSupport}
          text="ارتباط با پشتیبانی"
          icon={<IcHeadphones></IcHeadphones>}
        ></ArrowButton>
        <ArrowButton
          className="bg-white"
          text="ثبت نظر"
          icon={<IcPenRound></IcPenRound>}
        ></ArrowButton>
        <ArrowButton
          url={paths.settings.aboutUs}
          text="درباره ما"
          icon={<IcStars className="stroke-black"></IcStars>}
        ></ArrowButton>
      </div>
    </Page>
  );
};
