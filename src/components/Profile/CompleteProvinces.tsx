import { useHistory } from 'react-router-dom';
import { useLocalStore } from '@/store/useLocalStore';
import toast from 'react-hot-toast';
import { Toast } from '@/components/base/toast/toast';
import { useUpdateUserMutation } from '@/graphql/generated/graphql.codegen';
import AppBar from '../layout/Header/AppBar';
import { Page } from '../layout/Page';
import GetProvinces from '../Signup/GetProvinces';

export default function CompleteProvinces() {
  const [updateUser] = useUpdateUserMutation();
  const hs = useHistory();
  const userInfo = useLocalStore((store) => store.userInfo);

  const handleSubmit = () => {
    updateUser({
      variables: {
        city: userInfo.province,
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
          hs.push('/profile/complete_profile');
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
      contentClassName="h-[100dvh] p-6"
      header={<AppBar title="علایق شخصی"></AppBar>}
    >
      <GetProvinces handleSubmit={handleSubmit} />
    </Page>
  );
}
