import { useHistory } from 'react-router-dom';

import { useUpdateUserMutation } from '../../../graphql/generated/graphql.codegen';
import GetPersonalInterests from '../Signup/GetPersonalInterests';
import { useLocalStore } from '@/store/useLocalStore';
import toast from 'react-hot-toast';
import { Toast } from '@/components/base/toast/toast';
import { Page } from '../Page';
import AppBar from '../Header/AppBar';

export default function ComplatePersonalInterests() {
  const [updateUser] = useUpdateUserMutation();
  const hs = useHistory();
  const userInfo = useLocalStore((store) => store.userInfo);

  const handleSubmit = () => {
    updateUser({
      variables: {
        personalInterests: userInfo.personalInterests,
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
          hs.push('/profile/complate_profile');
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
    });
  };

  return (
    <Page
      className="flex h-full w-full flex-col items-center"
      contentClassName="h-[100dvh]"
      header={<AppBar title="علایق شخصی"></AppBar>}
    >
      <GetPersonalInterests handleSubmit={handleSubmit} />
    </Page>
  );
}
