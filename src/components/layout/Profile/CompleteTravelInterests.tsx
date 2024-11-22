import { useUpdateUserMutation } from '../../../graphql/generated/graphql.codegen';
import GetTravelInterests from '../Signup/GetTravelInterests';
import { useLocalStore } from '@/store/useLocalStore';
import { Page } from '../Page';
import AppBar from '../Header/AppBar';
import { useHistory } from 'react-router';
import toast from 'react-hot-toast';
import { Toast } from '@/components/base/toast/toast';

export default function CompleteTravelInterests() {
  const [updateUser] = useUpdateUserMutation();
  const hs = useHistory();
  const userInfo = useLocalStore((store) => store.userInfo);

  const handleSubmit = () => {
    updateUser({
      variables: {
        travelInterests: userInfo.travelInterests,
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
      header={<AppBar title="علایق عمومی"></AppBar>}
    >
      <GetTravelInterests handleSubmit={handleSubmit} />
    </Page>
  );
}
