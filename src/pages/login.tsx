import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar , IonInput, IonItem,IonIcon,IonButton} from '@ionic/react';
import phoneicon from "../assets/icon/telephone.png"
import lock from "../assets/icon/lock.png"
import previous from "../assets/icon/previous.png"
const Login: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleClick = (step) => {
      setCurrentStep(step);
  };
  return (
    <IonPage>
      <div className='main-login-wrapper'>
        <div className='flex  h-[80px] justify-end items-center stepper-wrapper'>
        <div className="stepper-container">
            <div className="stepper-line"></div>
            <div dir='rtl' className="steps">
                {[1, 2, 3, 4, 5, 6,7,8,9,10].map(step => (
                    <div
                        key={step}
                        className={`step ${currentStep >= step ? 'completed' : ''} ${step === 6 ? 'final-step' : ''}`}
                        onClick={() => handleClick(step)}
                    >
                        {step}
                    </div>
                ))}
            </div>
        </div>
          <img className='w-10 h-10 mr-5' src={previous}></img>
        </div>
    <div className='grid justify-end  pr-4 pt-2'>
      <h3 className='text-black text-end'>شماره موبایل</h3>
      <p className='text-black text-end p-2'>ما با اطمینان از واقعی بودن همه افراد در باکی از کاربران خود محافظت میکنیم </p>
    </div>
    <div className='phoen-number-wrapper flex justify-center pt-10'>
    <IonInput labelPlacement="stacked" className='phone-input  relative color-black rounded-lg h-[40px] w-[80%] shadow' aria-label="Email" >
    <img slot="end" className='w-7 h-7 p-1 mb-1 absolute right-2'  src={phoneicon} ></img>
    </IonInput>
    </div>
    </div>
    <div dir='rtl' className='flex footer-button-wrapper'>
      <img className='w-10 h-10 mr-2 ml-2' src={lock}></img>
      <p className='text-black'>شماره موبایل شما در پروفایل شما نمایش داده نخواهد شد</p>
      <IonButton className='w-30 h-10 pl-2 next-button-login mr-2'>بعدی</IonButton>

    </div>
    </IonPage>

  );
};

export default Login;