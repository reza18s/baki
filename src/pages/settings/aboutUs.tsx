import { IcEitaa } from '@/components/icons/IcEitaa';
import { IcInstagram } from '@/components/icons/IcInstagram';
import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import ArrowButton from '@/components/shared/Buttons/ArrowButton';
import React from 'react';

export const AboutUs = () => {
  return (
    <Page
      contentClassName="flex min-h-full flex-col gap-4 bg-gray-50 p-6 pt-20"
      header={<AppBar title="درباره ما"></AppBar>}
    >
      <div className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-500">
        پیدا کردن یک همسفر خوب که با سلیقه و سبک سفر شما سازگار باشد، می‌تواند
        چالش‌برانگیز باشد. اما نگران نباشید! اپلیکیشن «باکی» می‌تواند همسفر
        ایده‌آلتان را پیدا کند. همانطور که می دانید هر فردی سبک سفر خاص خود را
        دارد. برخی به دنبال ماجراجویی و هیجان هستند، در حالی که برخی دیگر ترجیح
        می‌دهند به مکان‌های آرام و خلوت سفر کنند. هر فردی انتظارات متفاوتی از یک
        سفر دارد. برخی به دنبال کشف فرهنگ‌های جدید هستند، در حالی که برخی دیگر
        بیشتر به دنبال استراحت و لذت بردن از طبیعت هستند. همچنین تفاوت در شخصیت
        نیز می‌تواند بر روی هماهنگی بین همسفران تأثیر بگذارد. برخی افراد
        اجتماعی‌تر هستند و به دنبال تعامل با افراد جدید، در حالی که برخی دیگر
        درون‌گراتر و به تنهایی بودن علاقه‌مندند. اپلیکیشن باکی با هدف برآوردن
        کلیه نیازهای سفر با هدف راه حلی برای سفرهای از دست رفته، طراحی شده است.
        در باکی شما می‌توانید به سهولت همسفر خود رو براساس علاقه مندی ها، تخصص
        یا به صورت تصادفی پیدا کنید، باهم گفتگو کنید و از قابلیت‌های پیشرفته
        باکی استفاده کنید.
      </div>
      <div className="flex flex-col gap-2">
        <ArrowButton
          className="bg-white"
          text="پشتیبانی اینستاگرام"
          icon={<IcInstagram></IcInstagram>}
        ></ArrowButton>
        <ArrowButton
          className="bg-white"
          text="پشتیبانی ایتا"
          icon={<IcEitaa></IcEitaa>}
        ></ArrowButton>
      </div>
    </Page>
  );
};
