import * as SolarIconSet from "solar-icon-set";
import { Button, Radio } from 'antd';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useState } from "react";

export default function PicturesStep(props: {
    control: any,
    name: string,
    handleSignup: () => void,
}) {
    const [showHelp, setShowHelp] = useState<boolean>(false)

    const viewHelp = () => {
        setShowHelp(true)
    }

    const hideHelp = () => {
        setShowHelp(false)
    }
    return (
        <div className="flex flex-col gap-y-[40px] w-full">
            <div className="flex flex-col gap-y-[16px]">
                <h1 className="text-[32px] font-bold text-brand-black">
                    تصاویر من
                </h1>
                <p className="text-sm font-medium leading-tight text-[#64748B]">
                    در صورت تمایل تصویر دلخواه خود را اپلود کنید.
                </p>
            </div>
            {/* Body */}
            <div className="max-w-fit flex flex-col items-center justify-center mx-auto gap-y-[9px]">
                <div className="bg-[#F1F5F9] p-[132px] rounded-[16px] relative">
                    <p className="bg-brand-yellow px-[8px] py-[4px] rounded-[16px] text-xs absolute top-[16.15px] right-[15.83px]">
                        تصویر اصلی
                    </p>
                    <SolarIconSet.AddCircle size={64} />
                </div>
                <div className="w-full flex items-center justify-between">
                    <div className="bg-[#F1F5F9] p-[40px] rounded-[16px] relative">
                        <p className="bg-brand-yellow px-[8px] py-[4px] rounded-[16px] text-xs absolute top-[16.15px] right-[15.83px]">
                            ۴
                        </p>
                        <SolarIconSet.AddCircle size={24} />
                    </div>
                    <div className="bg-[#F1F5F9] p-[40px] rounded-[16px] relative">
                        <p className="bg-brand-yellow px-[8px] py-[4px] rounded-[16px] text-xs absolute top-[16.15px] right-[15.83px]">
                            ۳
                        </p>
                        <SolarIconSet.AddCircle size={24} />
                    </div>
                    <div className="bg-[#F1F5F9] p-[40px] rounded-[16px] relative">
                        <p className="bg-brand-yellow px-[8px] py-[4px] rounded-[16px] text-xs absolute top-[16.15px] right-[15.83px]">
                        ۲
                        </p>
                        <SolarIconSet.AddCircle size={24} />
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div className="absolute bottom-[24px] flex items-center justify-between gap-x-[16px] min-w-fit w-[90%] px-2">
                <div className="flex items-center gap-x-[8px] min-w-fit justify-between">
                    <SolarIconSet.Gallery size={24} />
                    <div
                        className="text-[#1a1d1e] text-xs font-medium leading-none"
                    >
                        <p className="font-bold">
                            نمی دونی چی آپلود کنی ؟<span onClick={viewHelp} className="underline font-bold mx-1">مشاهده راهنما
                            </span>
                        </p>
                    </div>
                </div>
                <button
                    disabled={props.name?.length < 1}
                    onClick={props.handleSignup}
                    className={`px-[20px] py-[16px] ${props.name?.length > 1
                        ? 'bg-[#ffcc4e]'
                        : 'bg-slate-100'
                        } rounded-[12px] text-slate-400 font-bold leading-none`}
                >
                    بعدی
                </button>
            </div>
            {/* Help */}
            {
                showHelp &&
                <div className="absolute w-[100vw] h-[95vh] top-0 flex items-center justify-center px-[24px] py-[50px] bg-black bg-opacity-70">
                    <div className="bg-white w-full h-full rounded-[24px] flex flex-col items-center justify-center py-[16px] px-[24px] text-brand-black text-sm">
                        {/* Head */}
                        <div className="w-full bg-brand-yellow rounded-full p-[16px] max-w-fit">
                            <SolarIconSet.Document size={32} />
                        </div>
                        {/* Body */}
                        <div className="w-full h-full max-w-full max-h-[80%]">
                            <h1 className="text-base font-bold">
                                قوانین و مقررات حریم خصوصی باکی
                            </h1>
                            <p className="text-[#1a1d1e] text-sm font-medium leading-tight w-full h-full max-w-full max-h-[90%] overflow-auto">
                                با کی در چارچوب قوانین اینترنتی جمهوری اسلامی ایران فعالیت می کند.
                                <br />این اپلیکیشن بستری برای آشنایی مستقیم افرادی است که قصد سفر دارند و هیچ نقش و تعهد دیگری در قبال ارتباط و پاسخگویی سایر کاربران ندارد.
                                <br />ثبت نام و استفاده از هر یک از بخش های این اپلیکیشن به منزله مطالعه و پذیرش تمام قوانین باکی می باشد.
                                <br />تخطی از قوانین باکی توسط کاربران باعث مسدود شدن کاربری فرد خاطی می گردد و عضویت ویژه و پرداخت وجه هیچ حقی برای وی ایجاد نمی کند. همچنین در این شرایط، کاربر مذکور هیچ حقی در مورد استرداد هزینه های اشتراک استفاده نشده، یا سایر مبالغ پیش پرداختی را ندارد.
                                <br />ارسال مطالب مستهجن،افترا آمیز،دشنام و خارج از اخلاق یا بی حرمتی به مقدسات فرهنگی و مذهبی در پست ها و کامنت ها
                                <br />و هر گونه پیامی که محتوای آن مخالف قوانین جمهوری اسلامی ایران باشد، ممنوع است.
                                <br />تبلیغات و معرفی نرم افزارها و یا سایتها در پست ها و کامنت هاممنوع می باشد.
                                <br />استفاده از این نرم افزار به عنوان یک نرم افزار دوست یابی و یا به اشتراک گذاری اکانتهای شبکه های اجتماعی و دوست یابی و یاچت ممنوع می باشد.
                                <br />
                                <br />افراد مجاز به انتشار اطلاعات محرمانه مملکتی،اطلاعات محرمانه اشخاص ثالث، دراین نرم افزار نمی باشند.
                                <br />ثبت نام افراد پایین‌تر از 18 سال تمام،خلاف قوانین باکی بوده و پروفایل این افراد مسدود خواهد شد.
                                <br />فیلدهای ثبت نام و تصویر کاربران پس از بررسی و تایید توسط مدیریت، برای سایر کاربران قابل مشاهده خواهد بود و درج هرگونه اطلاعات تماس (شماره موبایل، آیدی تلگرام و سایر شبکه های اجتماعی) در آنها تخلف محسوب می شود.
                                <br />استفاده از اطلاعات جعلی، شماره موبایل یا اطلاعات سایرین در ثبت نام و یا ثبت نام برای دیگران خلاف قوانین باکی می باشد همچنین
                                <br />جعل هویت اشخاص حقیقی و یا حقوقی اعم از شرکتها،نهادها وسازمانها و نسبت دادن بیانات و سخنان دروغین به ایشان مجاز
                                <br />نمی باشد و منجر به مسدودیت پروفایل خواهد شد.
                                <br />اطلاعات شخصی شما مانند شماره موبایل به هیچ عنوان در اختیار سایر کاربران قرار داده نخواهد شد.
                                <br />قوانین اپلیکیشن ممکن است به مرور زمان به روزرسانی گردد و تغییراتی در آن اعمال شود، کاربران موظفند با مراجعه به این صفحه این تغییرات را مطالعه و رعایت نمایند.
                                <br />از کاربران و بازدیدکنندگان محترم تقاضا می شود در صورت مشاهده نقض قوانین، مورد را از طریق مربوط با ما در میان بگذارند.
                                <br />عضویت در باکی به منزله پذیرش و تایید قوانین آن از طرف کاربران می باشد.
                                <br />اپلیکیشن باکی خود را متعهد به حفاظت از حریم شخصی کاربران می‌داند. این خط مشی نحوه‌ی رفتار با اطلاعات دریافتی از کاربر را تعیین می‌کند.
                                <br />اگر تصمیم به استفاده از خدمات ما گرفته‌اید، شیوه‌های حفظ حریم خصوصی شما (به عنوان کاربر و استفاده کننده از خدمات باکی) در این خط مشی رازداری توضیح داده شده است و شما با توجه به آن، با استفاده از سرویس‌های ما، موافقت خود را اعلام می‌کنید.
                                <br />برای ایجاد یک تجربه بهتر از سفر، ما برخی از اطلاعات شما را که توسط خودتان وارد شده است را جمع‌آوری و برای تایید برخی از خدمات از آنها استفاده می‌کنیم. نکته مهم این که ما فقط اطلاعاتی را جمع آوری می‌کنیم که برای استفاده از خدمات ضروری می دانیم.
                                <br />
                                <br />اطلاعات شما در سرورهای امن ما نگهداری می‌شود و ما از این داده‌ها به عنوان دارایی‌های که باید حداکثر حفاظت از آنها وجود داشته باشد ، محافظت خواهیم کرد.
                                <br />تحت هیچ شرایطی مسئولیت خسارتهای وارده در اثر اعتماد و اتکابه اطلاعات قرار گرفته در نرم افزار پذیرفته نخواهد شد. ما تمامی تلاش خود در جهت حفظ و صیانت از اطلاعات شما را بعمل خواهیم آورد ولیکن اگر چنانچه به هر دلیل بدون اطلاع و رضایت شما اطلاعات شما توسط اشخاص ثالث مورد سوء استفاده و یا تخریب گردد ما مسئولیتی در مورد این اتفاقات نخواهیم داشت.
                                <br />در پایان امیدواریم با همکاری شما عزیزان محیط پاک و سالمی در باکی داشته باشیم
                            </p>
                        </div>
                        <button onClick={hideHelp} className="text-brand-black bg-brand-yellow rounded-[12px] w-full py-[16px] font-bold mt-[22px]">
                            تایید و ادامه
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}
