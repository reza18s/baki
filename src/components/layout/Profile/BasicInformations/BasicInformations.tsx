import * as SolarIconSet from 'solar-icon-set';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import GenderStep from './GenderStep';
import BirthdateStep from './BirthdateStep';

type StepsNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

interface SignupForm {
    phoneNumber: string;
    name: string;
    gender: string;
    birthdate: string;
    residenceCity: string;
    pictures: string[];
}

const HeadStep = ({ stepNum, activeStep }: { stepNum: StepsNumber, activeStep: StepsNumber }) => {
    return (
        <div
            className={`w-[27.16px] h-[3.62px] ${activeStep === stepNum ? 'bg-[#ffcc4e]' : 'bg-slate-100'
                } rounded-xl`}
        />
    )
}

export default function BasicInformations() {
    const { register, watch, control } = useForm<SignupForm>(
        {
            // defaultValues: {
            //   phoneNumber: '09395608390'}
        }
    );

    const [step, setStep] = useState<StepsNumber>(1);

    //   const [signup, { data, loading, error }] = useSignupMutation();

    const handleSignup = () => {
        // signup({
        //   variables: { phoneNumber: watch('phoneNumber') },
        //   onCompleted: (data) => {
        //     setStep(1);
        //   },
        //   onError(error) {
        //     //
        //   },
        // });
    };

    const handleNextStep = () => {
        setStep((prevStep: StepsNumber) => {
            if (prevStep < 7) {
                return (prevStep + 1) as StepsNumber;
            } else {
                return prevStep;
            }
        });
    };

    return (
        <div className="text-black p-[24px] pt-0 relative h-full max-w-[100vw] overflow-auto" dir="rtl">
            {/* Head */}
            <div className='w-full flex flex-col items-center justify-between gap-y-6'>
                <Link to="/profile/complate_profile" className='w-full flex items-center py-4 px-6 justify-between shadow-md shadow-zinc-50 text-brand-black'>
                    <SolarIconSet.AltArrowRight size={24} />
                    <h1 className='text-lg font-bold my-auto'>
                        اطلاعات اولیه
                    </h1>
                    <div></div>
                </Link>
                <div className="flex items-center justify-between gap-x-[7px] w-full">
                    {/* Progress bar */}
                    <div className="flex justify-around gap-x-[1.81px] w-full">
                        {/* Steps */}
                        {[...Array(7)].map((_, i) => (
                            <HeadStep key={i} stepNum={i as StepsNumber} activeStep={step} />
                        ))}
                    </div>
                </div>
            </div>
            {/* Body */}
            {step === 0 &&
                <GenderStep control={control} handleSignup={handleSignup} handleNextStep={handleNextStep} name={watch("name")} />
            }
            {step === 1 &&
                <BirthdateStep control={control} handleSignup={handleSignup} handleNextStep={handleNextStep} name={watch("name")} />
            }
        </div>
    );
}
