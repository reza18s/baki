import BakiLogo from "../../../assets/img/signup/BakiLogo.svg";
import { useUpdateUserMutation } from "../../../graphql/generated/graphql.codegen";
import { useLocalStore } from "../../../store/useLocalStore";

export default function FinalStep() {
  const [updateUser, { loading }] = useUpdateUserMutation();

  const userInfo = useLocalStore((store) => store.userInfo);
  return (
    <div className="flex h-[calc(100%-32px)] w-full flex-col items-center justify-between">
      <div className="flex w-full flex-col items-center gap-y-[16px]">
        <h1 className="text-[32px] font-bold text-brand-black">پایان!</h1>
        <p className="text-sm font-medium leading-tight text-[#64748B]">
          وارد اپلیکیشن شوید و لذتشو ببرین!
        </p>
        <div className="flex h-full flex-col items-center justify-start pt-[10vh]">
          <img
            src={BakiLogo}
            alt="Baki Logo"
            className="max-w-fit text-black"
          />
          <p>راه حلی برای سفر های از دست رفته !</p>
        </div>
      </div>
      <button
        onClick={() => {
          updateUser({
            variables: {
              birthday: userInfo.birthdate,
              travelInterests: userInfo.travelsInterests,
              gender: userInfo.gender,
              province: userInfo.residenceCity,
              mySpecialty: userInfo.specialty,
            },
          });
        }}
        className={`mb-6 w-full rounded-[12px] bg-brand-yellow px-5 py-4 font-bold text-brand-black`}
      >
        ورود به اپلیکیشن
      </button>
    </div>
  );
}
