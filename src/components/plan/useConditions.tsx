import React from 'react';

import * as SolarIconSet from 'solar-icon-set';
export const UseConditions = ({ hideRules }: { hideRules: () => void }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-3xl bg-white px-6 py-4 text-sm text-brand-black">
      <div className="w-full max-w-fit rounded-full bg-brand-yellow p-6">
        <SolarIconSet.Document size={32} />
      </div>
      <div className="flex h-full w-full max-w-full flex-col gap-4">
        <h1 className="w-full text-center text-base font-bold">
          شرایط استفاده از اپلیکیشن باکی
        </h1>
        <p className="h-full max-h-[90%] w-full max-w-full text-sm font-medium leading-tight text-brand-black">
          شرایط استفاده از اپلیکیشن باکی <br />
          به اپلیکیشن همسفریابی باکی خوش آمدید! ما در اینجا روشهای مختلف جستجوی
          همسفر و امکانات لازم جهت گفتگو، برنامه ریزی و مسافرت را برای شما فراهم
          نموده ایم. قبل از استفاده از اپلیکیشن، لطفا شرایط استفاده زیر را به
          دقت مطالعه کنید. <br />
          بخش پریمیوم:
          <br /> اپلیکیشن باکی علاوه بر بخش رایگان، دارای یک بخش پریمیوم نیز می
          باشد که با پرداخت هزینه اشتراک، امکانات و مزایای زیر را برای شما فراهم
          می کند:
          <br /> 1. بی نهایت همسفر: در حال عادی جستجوی همسفر به روش تصادفی
          حداکثر سه بار به روش «همسفر برمبنای علایق» حداکثر یکبار و روش «همسفر
          مشهور» حداکثر یکبار در هر ۲۴ ساعت می باشد با تهیه اشتراک ویژه، هیچ
          محدودیتی در پیدا کردن همسفر نخواهید داشت.
          <br /> 2.عینک سحرآمیز: در حال عادی متوجه میزان تشابه مخاطب با خود
          نخواهید شد در حالی که مشترکین ویژه با اولین مشاهده به نتایج جستجو
          همسفر، به میزان تشابه شخصیتی خود با مخاطب پی خواهند برد.
          <br /> 3. خاصیت آهنربا: به محض خرید اشتراک، به مدت ۲۴ ساعت یکی از
          پروفایل های برتر کشور خواهید بود این باعث میشود که بیشتر دیده شوید و
          از نقاط مختلف کشور درخواست های میزبانی و همسفری دریافت نمایید.
          <br /> 4. مشاهده علاقه مندان: در حالت عادی شما متوجه کسانی که شما را
          لایک کرده اند نخواهید شد در حالی که مشترکین ویژه قادر خواهند بود تمام
          کسانی که آنها را لایک کرده و یا نسبت به تصویر و مشخصات آنها عکس العملی
          نشان داده اند مطلع شوند.
          <br /> 5. رفع محدودیت زمانی: در حال عادی اگر در مدت ۲۴ ساعت به
          درخواست‌های همسفری، میزبانی یا پیام های دریافتی پاسخگو نباشید امکان
          برقراری ارتباط بین طرفین محدود خواهد شد مگر اینکه مخاطب شما دارای
          اشتراک ویژه باشد در حالت پریمیوم شما قادر خواهید بود بدون محدودیت
          زمانی با تمامی مشترکین ویژه و عادی گفتگو نمایید و درخواست ها و پیام
          های اولیه دیگران، بدون محدودیت زمانی۲۴ ساعت برای شما نمایش داده خواهد
          شد و بدون محدودیت به تمامی درخواست‌های گفتگو و چت پاسخ دهید.
          <br /> 6. حذف تبلیغات: از شر تبلیغات مزاحم خلاص خواهید شد و تجربه
          کاربری روان تری خواهید داشت.
          <br />
          انتظارات ما از شما:
          <br />
          1. از محتوای اپلیکیشن باکی فقط برای مصارف شخصی و غیر تجاری خود استفاده
          کنید. 2. از انتشار و توزیع محتوای اپلیکیشن بدون اجازه ما خودداری کنید.
          3. نظرات و پیشنهادات خود را برای بهبود کیفیت اپلیکیشن با ما در میان
          بگذارید. 4. در صورت مشاهده هرگونه مشکل یا نقص در اپلیکیشن، به ما اطلاع
          دهید.
          <br />
          انتظارات شما از ما:
          <br />
          1. ما تلاش می کنیم تا محتوای باکیفیت و قابل اعتمادی را در اختیار شما
          قرار دهیم. 2. ما به طور مداوم اپلیکیشن را به روز رسانی می کنیم و
          امکانات جدیدی به آن اضافه می کنیم. 3. ما به نظرات و پیشنهادات شما
          اهمیت می دهیم و برای بهبود کیفیت اپلیکیشن از آنها استفاده می کنیم. 4.
          ما در اسرع وقت به مشکلات و نقص های اپلیکیشن رسیدگی می کنیم.
        </p>
      </div>
      <button
        onClick={hideRules}
        className="mt-[22px] w-full rounded-[12px] bg-brand-yellow py-4 font-bold text-brand-black"
      >
        تایید و ادامه
      </button>
    </div>
  );
};
