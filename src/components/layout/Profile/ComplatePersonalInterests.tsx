import { Link, useHistory } from "react-router-dom";
import * as SolarIconSet from "solar-icon-set";
import { useSignupMutation, useUpdateUserMutation } from "../../../graphql/generated/graphql.codegen";
import { useForm } from "react-hook-form";
import GetPersonalInterests from "../Signup/GetPersonalInterests";
import { useLocalStore } from "@/store/useLocalStore";
import SweetAlertToast from "@/components/shared/Toasts/SweetAlertToast";

export default function ComplatePersonalInterests() {
  const [updateUser, { loading }] = useUpdateUserMutation();
  const hs = useHistory();
  const userInfo = useLocalStore((store) => store.userInfo);

  const handleSubmit = () => {
    updateUser({
      variables: {
        personalInterests: userInfo.personalInterests,
      },
      onCompleted: () => {
        SweetAlertToast.fire({
          icon: "success",
          title: "اطلاعات شما با موفقیت ثبت شد",
        })
        setTimeout(() => {
          hs.push("/profile/complate_profile");
        }, 1000);
      },
      onError: () => {
        SweetAlertToast.fire({
          icon: "error",
          title: "خطا",
          text: "مشکلی پیش آمده است لطفا دوباره امتحان کنید",
        });
      },
    })
  };


  return (
    <div className="flex h-full w-full flex-col items-center gap-y-3 overflow-y-auto pb-16">
      {/* Head */}
      <Link
        to="/profile/complate_profile"
        className="flex w-full items-center justify-between px-6 py-4 text-brand-black shadow-md shadow-zinc-50"
      >
        <SolarIconSet.AltArrowRight size={24} />
        <h1 className="my-auto text-lg font-bold">علایق شخصی</h1>
        <div></div>
      </Link>
      {/* Body */}
      <div
        className="relative h-full min-h-full min-w-[100vw] overflow-auto p-[24px] text-black"
        dir="rtl"
      >
        <GetPersonalInterests handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
