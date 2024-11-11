import { Link } from "react-router-dom";
import * as SolarIconSet from "solar-icon-set";
import { useSignupMutation } from "../../../graphql/generated/graphql.codegen";
import { useForm } from "react-hook-form";
import GetResidenceCity from "../Signup/GetResidenceCity";

export default function ComplateResidenceCity() {
  const { control, watch } = useForm();

  const [signup, { data, loading, error }] = useSignupMutation();

  const handleSignup = () => {
    signup({
      variables: { phoneNumber: watch("phoneNumber") },
      onCompleted: (data) => {
        // setStep(1);
      },
      onError(error) {
        //
      },
    });
  };

  const handleNextStep = () => {
    // setStep((prevStep: StepsNumber) => {
    //   if (prevStep < 10) {
    //     return (prevStep + 1) as StepsNumber;
    //   } else {
    //     return prevStep;
    //   }
    // });
  };

  return (
    <div className="flex h-full w-full flex-col items-center gap-y-3 overflow-y-auto pb-16">
      {/* Head */}
      <Link
        to="/profile/complate_profile"
        className="flex w-full items-center justify-between px-6 py-4 text-brand-black shadow-md shadow-zinc-50"
      >
        <SolarIconSet.AltArrowRight size={24} />
        <h1 className="my-auto text-lg font-bold">محل زندگی</h1>
        <div></div>
      </Link>
      {/* Body */}
      <div
        className="relative h-full min-h-full min-w-[100vw] overflow-auto p-[24px] text-black"
        dir="rtl"
      >
        <GetResidenceCity />
      </div>
    </div>
  );
}
