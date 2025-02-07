import { useHistory } from 'react-router-dom';
import { useUpdateUserMutation } from '@/graphql/generated/graphql.codegen';
import AppBar from '../layout/Header/AppBar';
import { Page } from '../layout/Page';
import GetProvinces from '../Signup/GetProvinces';
import { customToast } from '../base/toast';
import { useIonRouter } from '@ionic/react';

export default function CompleteProvinces() {
  const [updateUser] = useUpdateUserMutation();
  const hs = useIonRouter();

  const handleSubmit = (data: { city?: string; province?: string }) => {
    updateUser({
      variables: {
        ...data,
      },
      onCompleted: () => {
        customToast(' اطلاعات شما با موفقیت ثبت شد', 'success');
        setTimeout(() => {
          hs.goBack();
        }, 1500);
      },
      onError: () => {
        customToast('مشکلی پیش آمده است لطفا دوباره امتحان کنید', 'error');
      },
    });
  };

  return (
    <Page
      className="flex h-full w-full flex-col items-center"
      contentClassName="h-[100dvh] p-6"
      header={<AppBar title="محل زندگی"></AppBar>}
    >
      <GetProvinces handleSubmit={handleSubmit} textAction="ذخیره و بستن" />
    </Page>
  );
}
