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
    <div className="w-full flex flex-col items-center gap-y-3 h-full pb-16 overflow-y-auto">
      {/* Head */}
      <Link
        to="/profile/complate_profile"
        className="w-full flex items-center py-4 px-6 justify-between shadow-md shadow-zinc-50 text-brand-black"
      >
        <SolarIconSet.AltArrowRight size={24} />
        <h1 className="text-lg font-bold my-auto">محل زندگی</h1>
        <div></div>
      </Link>
      {/* Body */}
      <div
        className="text-black p-[24px] relative h-full min-h-full min-w-[100vw] overflow-auto"
        dir="rtl"
      >
        <GetResidenceCity />
      </div>
    </div>
  );
}
