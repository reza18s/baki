import { Link } from "react-router-dom"
import BackgroundImage from "../assets/img/home/BackgroundImage.svg"
import BakiLogo from "../assets/img/home/BakiLogo.svg"
import { useState } from "react"
import * as SolarIconSet from 'solar-icon-set';

export default function Index() {
    const [showRules, setShowRules] = useState<boolean>(false)

    const viewRules = () => {
        setShowRules(true)
    }

    const hideRules = () => {
        setShowRules(false)
    }
    return (
        <div
            className="bg-cover bg-center h-screen"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
            {/* content */}
            <div className="flex flex-col items-center justify-between w-full h-[90vh] text-white pt-[52px] pb-[6px] px-[24px]">
                {/* Head */}
                <div className="flex flex-col items-center justify-between max-h-fit">
                    <img src={BakiLogo} alt="BakiLogo" />
                    <h2 className="text-sm font-bold leading-tight">
                        راه حلی برای سفر های از دست رفته
                    </h2>
                </div>
                {/* Foot */}
                <div className="w-full flex flex-col items-center justify-between gap-y-[16px]">
                    <div className="flex flex-col items-center justify-between w-full gap-y-[8px] text-center">
                        <a href="/signup" className="text-brand-black bg-brand-yellow rounded-[12px] w-full py-[16px]">
                            ورود / ثبت نام
                        </a>
                        <button className="w-full rounded-[12px] border-solid border border-white py-[16px]">
                            ورود به صورت مهمان
                        </button>
                    </div>
                    <p className="font-bold px-[20px]">
                        ورود و استفاده از اپلیکی​شن باکی به معنای موافقت با <span onClick={viewRules} className="underline text-brand-yellow">قوانین و مقررات حریم خصوص​ی
                        </span>می‌باشد .
                    </p>
                </div>
                {/* Rules */}
                {
                    showRules &&
                    <div  className="absolute w-[100vw] h-[95vh] top-0 flex items-center justify-center px-[24px] py-[50px] bg-black bg-opacity-70">
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
                            <button onClick={hideRules} className="text-brand-black bg-brand-yellow rounded-[12px] w-full py-[16px] font-bold mt-[22px]">
                                تایید و ادامه
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}