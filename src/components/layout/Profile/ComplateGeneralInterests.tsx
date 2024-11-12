import { Link, useHistory } from 'react-router-dom';
import * as SolarIconSet from 'solar-icon-set';
import {
  useSignupMutation,
  useUpdateUserMutation,
} from '../../../graphql/generated/graphql.codegen';
import { useForm } from 'react-hook-form';
import GetTravelInterests from '../Signup/GetTravelInterests';
import { useLocalStore } from '@/store/useLocalStore';
import SweetAlertToast from '@/components/shared/Toasts/SweetAlertToast';
import { Page } from '../Page';
import AppBar from '../Header/AppBar';

export default function ComplateGeneralInterests() {
  const [updateUser, { loading }] = useUpdateUserMutation();
  const hs = useHistory();
  const userInfo = useLocalStore((store) => store.userInfo);

  const handleSubmit = () => {
    updateUser({
      variables: {
        travelInterests: userInfo.travelsInterests,
      },
      onCompleted: () => {
        SweetAlertToast.fire({
          icon: 'success',
          title: 'اطلاعات شما با موفقیت ثبت شد',
        });
        setTimeout(() => {
          hs.push('/profile/complate_profile');
        }, 1000);
      },
      onError: () => {
        SweetAlertToast.fire({
          icon: 'error',
          title: 'خطا',
          text: 'مشکلی پیش آمده است لطفا دوباره امتحان کنید',
        });
      },
    });
  };

  return (
    <Page
      className="flex h-full w-full flex-col items-center"
      contentClassName="h-[100dvh]"
      header={<AppBar title="علایق عمومی"></AppBar>}
    >
      <GetTravelInterests className="p-4" handleSubmit={handleSubmit} />
    </Page>
  );
}
