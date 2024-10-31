import * as SolarIconSet from 'solar-icon-set';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import GetGender from '../../Signup/GetGender';
// import GetPhoneNumber from '../components/layout/Signup/GetPhoneNumber';
// import { useState } from 'react';
// import { useSignupMutation } from '../graphql/generated/graphql.codegen';
// import VerifyOTP from '../components/layout/Signup/VerifyOTP';
// import GetName from '../components/layout/Signup/GetName';
// import GetGender from '../components/layout/Signup/GetGender';
// import GetBirthdate from '../components/layout/Signup/GetBirthdate';
// import GetResidenceCity from '../components/layout/Signup/GetResidenceCity';
// import GetPictures from '../components/layout/Signup/GetPictures';
// import GetGeneralInterests from '../components/layout/Signup/GetGeneralInterests';
// import GetPersonalInterests from '../components/layout/Signup/GetPersonalInterests';
// import GetSpecialty from '../components/layout/Signup/GetSpecialty';
// import FinalStep from '../components/layout/Signup/FinalStep';

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

    const [step, setStep] = useState<StepsNumber>(0);

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

    const handlePrevStep = () => {
        setStep((prevStep: StepsNumber) => {
            if (prevStep > 0) {
                return (prevStep - 1) as StepsNumber;
            } else {
                return prevStep;
            }
        });
    };

    const handleNextStep = () => {
        setStep((prevStep: StepsNumber) => {
            if (prevStep < 10) {
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
                <GetGender control={control} handleSignup={handleSignup} name={watch("name")} />
            }
        </div>
    );
}
