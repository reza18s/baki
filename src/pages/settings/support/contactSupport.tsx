import Accordion from '@/components/accordion/Accordion';
import { IcEitaa } from '@/components/icons/IcEitaa';
import { IcInstagram } from '@/components/icons/IcInstagram';
import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import ArrowButton from '@/components/shared/Buttons/ArrowButton';
import { Browser } from '@capacitor/browser';
import React, { useState } from 'react';
const faq: { question: string; answer: string }[] = [
  {
    question: 'چگونه می‌توانم در اپلیکیشن ثبت نام کنم؟',
    answer:
      'برای ثبت نام در اپلیکیشن، گزینه «ورود و ثبت نام» را انتخاب کرده و شماره همراه خود را وارد کنید. به این ترتیب به راحتی ثبت نام کرده و به تمامی امکانات رایگان اپلیکیشن دسترسی خواهید داشت.',
  },
  {
    question: 'چگونه می‌توانم همسفر مورد علاقه خود را پیدا کنم؟',
    answer:
      'برای پیدا کردن همسفر، به صفحه جستجوی همسفر بروید و گزینه «همسفر بر مبنای علایق» را انتخاب کنید تا همسفر خود را بر اساس علاقه‌مندی‌ها پیدا کنید.',
  },
  {
    question:
      'چگونه می‌توانم با افراد با تخصص و مهارت شبیه به خود مسافرت بروم؟',
    answer:
      'در صفحه جستجوی همسفر، گزینه «همسفر مشهور» را انتخاب کنید تا همسفر خود را بر مبنای تخصص و مهارت آنها پیدا کنید.',
  },
  {
    question: 'چگونه می‌توانم لیست علاقمندی‌های خود را ایجاد کنم؟',
    answer:
      'برای ایجاد لیست علاقمندی‌ها، گزینه «افزودن به علاقمندی‌ها» را انتخاب کنید. سپس با کلیک بر روی نماد سه نقطه در بالای صفحه چت، فرد مورد نظر به مخاطبان مورد علاقه شما در قسمت تنظیمات اضافه خواهد شد.',
  },
];
export const ContactSupport = () => {
  const [isOpen, setIsOpen] = useState<string | undefined>();
  return (
    <Page
      contentClassName="flex min-h-full flex-col gap-4 bg-gray-50 p-6 pt-20"
      header={<AppBar title="ارتباط با پشتیبانی"></AppBar>}
    >
      <div className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-xs text-gray-500">
        در صورت بروز هر مشکلی با ما از طریق لینک‌های زیر (اینستاگرام یا ایتا) در
        ارتباط باشید:
      </div>
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

      <div className="flex flex-col gap-2">
        <ArrowButton
          onClick={async () => {
            await Browser.open({
              url: 'https://www.instagram.com/bakidotapp?igsh=enNjY2J5anJmcWty',
            });
          }}
          className="bg-white"
          text="پشتیبانی اینستاگرام"
          icon={<IcInstagram></IcInstagram>}
        ></ArrowButton>
        <ArrowButton
          onClick={async () => {
            await Browser.open({ url: 'https://eitaa.com/baki_support' });
          }}
          className="bg-white"
          text="پشتیبانی ایتا"
          icon={<IcEitaa></IcEitaa>}
        ></ArrowButton>
      </div>
    </Page>
  );
};
