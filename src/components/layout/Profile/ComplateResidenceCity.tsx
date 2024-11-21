import { Link, useHistory } from "react-router-dom";
import * as SolarIconSet from "solar-icon-set";
import { useSignupMutation, useUpdateUserMutation } from "../../../graphql/generated/graphql.codegen";
import { useForm } from "react-hook-form";
import GetResidenceCity from "../Signup/GetResidenceCity";
import { useLocalStore } from "@/store/useLocalStore";
import toast from "react-hot-toast";
import { Toast } from "@/components/base/toast/toast";
import { Page } from "../Page";

export default function ComplateResidenceCity() {
  const [updateUser, { loading }] = useUpdateUserMutation();
  const hs = useHistory();
  const userInfo = useLocalStore((store) => store.userInfo);

  const handleSubmit = () => {
    updateUser({
      variables: {
        city: userInfo.residenceCity,
      },
      onCompleted: () => {
        toast.custom(
          (t) => (
            <Toast t={t} type="success">
              اطلاعات شما با موفقیت ثبت شد
            </Toast>
          ),
          { duration: 1500 },
        );
        setTimeout(() => {
          hs.push("/profile/complate_profile");
        }, 1000);
      },
      onError: () => {
        toast.custom(
          (t) => (
            <Toast t={t} type="error">
              مشکلی پیش آمده است لطفا دوباره امتحان کنید
            </Toast>
          ),
          { duration: 1500 },
        );
      },
    })
  };

  return (
    <Page
      className="flex h-full w-full flex-col items-center"
      contentClassName="h-[100dvh]"
    >
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
          <GetResidenceCity handleSubmit={handleSubmit} />
        </div>
      </div>
    </Page>
  );
}
