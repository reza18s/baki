import Accordion from '@/components/accordion/Accordion';
import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import React, { useState } from 'react';
const faq: {
  [key: string]: { [key: string]: { question: string; answer: string } };
} = {
  عمومی: {
    increaseSubscription: {
      question: 'چطوری مدت زمان اشتراکم را افزایش بدم؟',
      answer:
        'با خرید مجدد هر کدام از اشتراک‌ها، اشتراک خریداری شده به مدت زمان اشتراک قبلی تان اضافه می‌شود.',
    },
    subscriptionActive: {
      question:
        'علی رغم خرید اشتراک، اشتراکی برایم فعال نشده است، چه کار باید انجام دهم؟',
      answer:
        'نگران نباشید. به احتمال خیلی زیاد شما با یک شماره تماس دیگر اقدام به خرید اشتراک کرده‌اید و در حال حاضر با شماره دیگری وارد اپلیکیشن شده‌اید. در صورتیکه بازهم مشکل شما حل نشد برای رفع سریع مشکل و دریافت راهنمایی حتما از طریق صفحه ارتباط با پشتیبانی با ما ارتباط برقرار کنید.',
    },
    accessAfterPurchase: {
      question: 'بعد از تهیه اشتراک به چه چیزی دسترسی دارم؟',
      answer:
        'شما با تهیه اشتراک به تمامی امکانات ویژه کنونی و جدیدی که به باکی اضافه می‌شود دسترسی خواهید داشت.',
    },
  },
  فروشگاه: {
    whySubscribe: {
      question: 'چرا باید اشتراک تهیه کنم؟',
      answer:
        'با تهیه اشتراک باکی به تمامی امکانات جستجوی همسفر، پیام رسانی نامحدود، درصد تطابق شما با مخاطب، مشاهده لایک کنندگان و نبود محدودیت مدت زمان پاسخگویی دسترسی خواهید داشت.',
    },
    noSubscriptionEffect: {
      question: 'اگر اشتراک نخرم چه می شود؟',
      answer:
        'شما هنوز هم قادر خواهید بود از بسیاری از خدمات اپلیکیشن استفاده کنید.',
    },
    appreciationProcess: {
      question:
        'آیا اپلیکیشن فرآیندهای قدردانی و تشویق به کاربران ارائه می نماید؟',
      answer:
        'بله، سازوکار نحوه تشویق کاربران فعال در حال تدوین می باشد به محض نهایی شدن در اپلیکیشن اعمال خواهد شد.',
    },
  },
  فنی: {
    contactSupport: {
      question: 'چگونه می توانم با پشتیبانی ارتباط برقرار کنم؟',
      answer:
        'در صورت بروز هر مشکلی با ما از طریق لینک‌های زیر (اینستاگرام یا ایتا) در ارتباط باشید.',
    },
    registerApp: {
      question: 'چگونه می‌توانم در اپلیکیشن ثبت نام کنم؟',
      answer:
        'در زمان ورود به اپلیکیشن با انتخاب گزینه «ورود و ثبت نام» و با وارد کردن شماره همراه خود به راحتی ثبت نام کنید.',
    },
    findCompanion: {
      question: 'چگونه می‌توانم همسفر مورد علاقه خود را پیدا کنم؟',
      answer:
        'در صفحه جستجوی همسفر می‌توانید با انتخاب گزینه «همسفر بر مبنای علایق» همسفر خود را بر مبنای علاقه‌مندی‌هایشان پیدا کنید.',
    },
    travelWithSimilarSkills: {
      question:
        'چگونه می‌توانم با افراد با تخصص و مهارت شبیه به خود مسافرت بروم؟',
      answer:
        'در صفحه جستجوی همسفر می‌توانید با انتخاب گزینه «همسفر مشهور» همسفر خود را بر مبنای تخصص آنها پیدا کنید.',
    },
    createFavorites: {
      question: 'چگونه می‌توانم لیست علاقمندی‌های خود را ایجاد کنم؟',
      answer:
        'با انتخاب گزینه «افزودن به علاقمندی‌ها» نماد سه نقطه بالای صفحه چت، آن فرد به مخاطبان مورد علاقه شما در قسمت تنظیمات اضافه خواهد شد.',
    },
  },
};
export const Questions = () => {
  const [isOpen, setIsOpen] = useState<string | undefined>();
  return (
    <Page
      contentClassName="flex min-h-full flex-col gap-2 bg-gray-50 p-6 pt-20"
      header={<AppBar title="سوالات متداول"></AppBar>}
    >
      {Object.keys(faq).map((title) => (
        <div key={title} className="flex flex-col gap-2">
          <h1 className="px-4 text-sm font-bold text-gray-400">{title}</h1>
          {Object.values(faq[title]).map((val) => (
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
      ))}
    </Page>
  );
};
