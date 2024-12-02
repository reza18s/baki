import { useHistory } from 'react-router-dom';

import { useLocalStore } from '@/store/useLocalStore';
import toast from 'react-hot-toast';
import { Toast } from '@/components/base/toast/toast';
import { useUpdateUserMutation } from '@/graphql/generated/graphql.codegen';
import { Page } from '../layout/Page';
import AppBar from '../layout/Header/AppBar';
import GetPersonalInterests from '../Signup/GetPersonalInterests';
import { customToast } from '../base/toast';

export default function CompletePersonalInterests() {
  const [updateUser] = useUpdateUserMutation();
  const hs = useHistory();
  const userInfo = useLocalStore((store) => store.userInfo);

  const handleSubmit = () => {
    updateUser({
      variables: {
        personalInterests: userInfo.personalInterests,
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
      contentClassName="h-[100dvh] p-6"
      header={<AppBar title="علایق شخصی"></AppBar>}
    >
      <GetPersonalInterests handleSubmit={handleSubmit} />
    </Page>
  );
}
