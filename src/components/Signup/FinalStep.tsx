import { useHistory } from 'react-router';
import BakiLogo from '../../assets/img/signup/BakiLogo.svg';
import { useUpdateUserMutation } from '../../graphql/generated/graphql.codegen';
import { useLocalStore } from '../../store/useLocalStore';
import { paths } from '@/routes/paths';
import { useIonRouter } from '@ionic/react';

export default function FinalStep() {
  const [updateUser, { loading }] = useUpdateUserMutation();
  const hs = useIonRouter();
  const userInfo = useLocalStore((store) => store.userInfo);
  const setSteps = useLocalStore((store) => store.setSteps);

  return (
    <div className="flex h-[calc(100%)] w-full flex-col items-center justify-between">
      <div className="flex w-full flex-col items-center gap-y-4 pt-10">
        <h1 className="text-[32px] font-bold text-brand-black">پایان!</h1>
        <p className="text-sm font-medium leading-tight text-gray-500">
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
              images: userInfo.images,
              mainImage: userInfo.mainImage,
              birthdate: userInfo.birthdate,
              travelInterests: userInfo.travelInterests,
              gender: userInfo.gender,
              province: userInfo.province,
              city: userInfo.city,
              mySpecialty: userInfo.mySpecialty,
              personalInterests: userInfo.personalInterests,
              name: userInfo.name,
            },
            onCompleted: (data) => {
              hs.push(paths.main.explore);
              setSteps(0);
            },
            onError: (err) => {
              console.log(err.message);
            },
          });
        }}
        className={`w-full rounded-[12px] bg-brand-yellow px-5 py-4 font-bold text-brand-black`}
      >
        ورود به اپلیکیشن
      </button>
    </div>
  );
}
