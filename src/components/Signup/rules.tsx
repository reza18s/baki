import React from 'react';

import * as SolarIconSet from 'solar-icon-set';
export const Rules = ({ hideRules }: { hideRules: () => void }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-3xl bg-white px-6 py-4 text-sm text-brand-black">
      <div className="w-full max-w-fit rounded-full bg-brand-yellow p-6">
        <SolarIconSet.Document size={32} />
      </div>
      <div className="flex h-full w-full max-w-full flex-col gap-4">
        <h1 className="text-center text-base font-bold">
          قوانین و مقررات حریم خصوصی باکی
        </h1>
        <p className="h-full max-h-[90%] w-full max-w-full text-sm font-medium leading-tight text-brand-black">
          با کی در چارچوب قوانین اینترنتی جمهوری اسلامی ایران فعالیت می کند.
          <br />
          این اپلیکیشن بستری برای آشنایی مستقیم افرادی است که قصد سفر دارند و
          هیچ نقش و تعهد دیگری در قبال ارتباط و پاسخگویی سایر کاربران ندارد.
          <br />
          ثبت نام و استفاده از هر یک از بخش های این اپلیکیشن به منزله مطالعه و
          پذیرش تمام قوانین باکی می باشد.
          <br />
          تخطی از قوانین باکی توسط کاربران باعث مسدود شدن کاربری فرد خاطی می
          گردد و عضویت ویژه و پرداخت وجه هیچ حقی برای وی ایجاد نمی کند. همچنین
          در این شرایط، کاربر مذکور هیچ حقی در مورد استرداد هزینه های اشتراک
          استفاده نشده، یا سایر مبالغ پیش پرداختی را ندارد.
          <br />
          ارسال مطالب مستهجن،افترا آمیز،دشنام و خارج از اخلاق یا بی حرمتی به
          مقدسات فرهنگی و مذهبی در پست ها و کامنت ها
          <br />و هر گونه پیامی که محتوای آن مخالف قوانین جمهوری اسلامی ایران
          باشد، ممنوع است.
          <br />
          تبلیغات و معرفی نرم افزارها و یا سایتها در پست ها و کامنت هاممنوع می
          باشد.
          <br />
          استفاده از این نرم افزار به عنوان یک نرم افزار دوست یابی و یا به
          اشتراک گذاری اکانتهای شبکه های اجتماعی و دوست یابی و یاچت ممنوع می
          باشد.
          <br />
          <br />
          افراد مجاز به انتشار اطلاعات محرمانه مملکتی،اطلاعات محرمانه اشخاص
          ثالث، دراین نرم افزار نمی باشند.
          <br />
          ثبت نام افراد پایین‌تر از 18 سال تمام،خلاف قوانین باکی بوده و پروفایل
          این افراد مسدود خواهد شد.
          <br />
          فیلدهای ثبت نام و تصویر کاربران پس از بررسی و تایید توسط مدیریت، برای
          سایر کاربران قابل مشاهده خواهد بود و درج هرگونه اطلاعات تماس (شماره
          موبایل، آیدی تلگرام و سایر شبکه های اجتماعی) در آنها تخلف محسوب می
          شود.
          <br />
          استفاده از اطلاعات جعلی، شماره موبایل یا اطلاعات سایرین در ثبت نام و
          یا ثبت نام برای دیگران خلاف قوانین باکی می باشد همچنین
          <br />
          جعل هویت اشخاص حقیقی و یا حقوقی اعم از شرکتها،نهادها وسازمانها و نسبت
          دادن بیانات و سخنان دروغین به ایشان مجاز
          <br />
          نمی باشد و منجر به مسدودیت پروفایل خواهد شد.
          <br />
          اطلاعات شخصی شما مانند شماره موبایل به هیچ عنوان در اختیار سایر
          کاربران قرار داده نخواهد شد.
          <br />
          قوانین اپلیکیشن ممکن است به مرور زمان به روزرسانی گردد و تغییراتی در
          آن اعمال شود، کاربران موظفند با مراجعه به این صفحه این تغییرات را
          مطالعه و رعایت نمایند.
          <br />
          از کاربران و بازدیدکنندگان محترم تقاضا می شود در صورت مشاهده نقض
          قوانین، مورد را از طریق مربوط با ما در میان بگذارند.
          <br />
          عضویت در باکی به منزله پذیرش و تایید قوانین آن از طرف کاربران می باشد.
          <br />
          اپلیکیشن باکی خود را متعهد به حفاظت از حریم شخصی کاربران می‌داند. این
          خط مشی نحوه‌ی رفتار با اطلاعات دریافتی از کاربر را تعیین می‌کند.
          <br />
          اگر تصمیم به استفاده از خدمات ما گرفته‌اید، شیوه‌های حفظ حریم خصوصی
          شما (به عنوان کاربر و استفاده کننده از خدمات باکی) در این خط مشی
          رازداری توضیح داده شده است و شما با توجه به آن، با استفاده از
          سرویس‌های ما، موافقت خود را اعلام می‌کنید.
          <br />
          برای ایجاد یک تجربه بهتر از سفر، ما برخی از اطلاعات شما را که توسط
          خودتان وارد شده است را جمع‌آوری و برای تایید برخی از خدمات از آنها
          استفاده می‌کنیم. نکته مهم این که ما فقط اطلاعاتی را جمع آوری می‌کنیم
          که برای استفاده از خدمات ضروری می دانیم.
          <br />
          <br />
          اطلاعات شما در سرورهای امن ما نگهداری می‌شود و ما از این داده‌ها به
          عنوان دارایی‌های که باید حداکثر حفاظت از آنها وجود داشته باشد ، محافظت
          خواهیم کرد.
          <br />
          تحت هیچ شرایطی مسئولیت خسارتهای وارده در اثر اعتماد و اتکابه اطلاعات
          قرار گرفته در نرم افزار پذیرفته نخواهد شد. ما تمامی تلاش خود در جهت
          حفظ و صیانت از اطلاعات شما را بعمل خواهیم آورد ولیکن اگر چنانچه به هر
          دلیل بدون اطلاع و رضایت شما اطلاعات شما توسط اشخاص ثالث مورد سوء
          استفاده و یا تخریب گردد ما مسئولیتی در مورد این اتفاقات نخواهیم داشت.
          <br />
          در پایان امیدواریم با همکاری شما عزیزان محیط پاک و سالمی در باکی داشته
          باشیم
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
