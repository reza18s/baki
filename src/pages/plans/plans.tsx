import { Page } from '@/components/layout/Page';
import PlanBg from '../../assets/images/plan-bg.png';
import React, { useState } from 'react';
import { IcXCircle } from '@/components/icons/IcXCircle';
import {
  PricePlan,
  useGetPricePlanQuery,
} from '@/graphql/generated/graphql.codegen';
import Button from '@/components/base/Button/Button';
import Modal from '@/components/base/Modal/Modal';
import { UseConditions } from '@/components/plan/useConditions';
import { Features } from '../../components/plan/features';
import { FeaturesCarousel } from '@/components/plan/featuresCarousel';
import { PlanCard } from '@/components/plan/planCard';
import Accordion from '@/components/accordion/Accordion';
import { Link, useHistory } from 'react-router-dom';
import { paths } from '@/routes/paths';
import { useIonRouter } from '@ionic/react';
const faq: { question: string; answer: string }[] = [
  {
    question: 'چرا باید اشتراک تهیه کنم؟',
    answer:
      'با تهیه اشتراک باکی به تمامی امکانات جستجوی همسفر، پیام رسانی نامحدود، درصد تطابق شما با مخاطب، مشاهده لایک کنندگان، نبود محدودیت مدت زمان پاسخگویی دسترسی خواهید داشت.',
  },
  {
    question: 'اگر اشتراك نخرم چه می شود؟',
    answer:
      'شما هنوز هم قادر خواهید بود از بسیاری از خدمات اپلیکیشن استفاده کنید',
  },
  {
    question: 'چرا پس از خرید اشتراک برایم فعال نشده است؟',
    answer:
      'به احتمال خیلی زیاد شما با یک شماره تماس دیگر اقدام به خرید اشتراک کرده و در حال حاضر با شماره دیگری وارد اپلیکیشن شده اید برای رفع سریع مشکل و دریافت راهنمایی حتما از طریق صفحه ارتباط با پشتیبانی با ما ارتباط برقرار کنید.',
  },
  {
    question:
      'آیا اپلیکیشن فرآیندهای قدردانی و تشویق به کاربران ارائه می نماید؟',
    answer:
      'بله، سازوکار نحوه تشویق کاربران فعال در حال تدوین می باشد به محض نهایی شدن در اپلیکیشن اعمال خواهد شد',
  },
];
export const Plans = () => {
  const [showConditions, setShowConditions] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<string | undefined>();
  const [select, setSelect] = useState<PricePlan>();
  const hs = useIonRouter();
  const { data: plans } = useGetPricePlanQuery();
  return (
    <Page contentClassName="min-h-full bg-gray-50 pb-20" scrollY>
      <div
        className="relative -mt-11 flex h-[240px] w-full flex-col items-center justify-center gap-4"
        style={{
          backgroundImage: `url(${PlanBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute right-3 top-14" onClick={() => hs.goBack()}>
          <IcXCircle className="size-5 stroke-black stroke-[1.1]"></IcXCircle>
        </div>
        <h1 className="mt-10 text-[32px] font-bold">باکی</h1>
        <h2 className="text-lg font-medium">راه‌حلی برای سفرهای از دست رفته</h2>
      </div>
      <div className="flex flex-col gap-8 bg-gray-50 p-6 pb-3">
        <FeaturesCarousel></FeaturesCarousel>
        <div className="flex w-full flex-col-reverse items-center gap-2">
          {plans?.getPricePlan?.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              select={select}
              onClick={() => setSelect(plan)}
            ></PlanCard>
          ))}
        </div>
        <Features></Features>
        <div className="flex flex-col gap-2">
          <h2 className="px-4 text-sm font-bold text-gray-500">
            نظرات کاربران
          </h2>
          <div className="scrollbar-hide flex items-center gap-2 overflow-x-scroll pl-2">
            <div className="flex min-w-[90%] flex-col gap-2 rounded-2xl border border-gray-300 bg-white p-3">
              <h2 className="text-sm font-bold">سحر رضایی</h2>
              <p className="text-xs text-gray-500">
                آقا چقد اپ خفنیه!!تا قبل از این حتی نمیدونستم یه همچین چیزی هم
                هست و همیشه لنگ همسفر بودم، ولی الآن دیگه خیالم راحته!
              </p>
            </div>
            <div className="flex min-w-[90%] flex-col gap-2 rounded-2xl border border-gray-300 bg-white p-3">
              <h2 className="text-sm font-bold">سحر رضایی</h2>
              <p className="text-xs text-gray-500">
                آقا چقد اپ خفنیه!!تا قبل از این حتی نمیدونستم یه همچین چیزی هم
                هست و همیشه لنگ همسفر بودم، ولی الآن دیگه خیالم راحته!
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="px-4 text-sm font-bold text-gray-500">
            سوالات متداول
          </h2>
          <div className="flex flex-col gap-2">
            {Object.values(faq).map((val) => (
              <Accordion
                key={val.question}
                content={val.answer}
                title={val.question}
                onToggle={() => {
                  setIsOpen((prev) =>
                    prev === val.question ? undefined : val.question,
                  );
                }}
                open={val.question === isOpen}
              ></Accordion>
            ))}
          </div>
        </div>
        <div
          className="w-full text-center text-xs font-bold"
          onClick={() => setShowConditions(true)}
        >
          شرایط استفاده | ارتباط با پشتیبانی
        </div>

        <Modal
          isOpen={showConditions}
          onRequestClose={() => setShowConditions(false)}
          className="w-[90%] rounded-3xl"
        >
          <UseConditions
            hideRules={() => setShowConditions(false)}
          ></UseConditions>
        </Modal>

        {select && (
          <Link to={paths.plans.confirm.exactPath(select.id)}>
            <Button className="fixed bottom-6 flex h-12 w-[calc(100%-48px)] items-center justify-center bg-brand-green">
              تهیه اشتراک {select.months} ماهه
            </Button>
          </Link>
        )}
      </div>
    </Page>
  );
};
