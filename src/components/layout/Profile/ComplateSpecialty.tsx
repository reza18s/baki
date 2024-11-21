import { useHistory } from 'react-router-dom';
import { useUpdateUserMutation } from '../../../graphql/generated/graphql.codegen';
import GetSpecialty from '../Signup/GetSpecialty';
import { useLocalStore } from '@/store/useLocalStore';
import toast from 'react-hot-toast';
import { Toast } from '@/components/base/toast/toast';
import { Page } from '../Page';
import AppBar from '../Header/AppBar';

export default function CompleteSpecialty() {
  const [updateUser] = useUpdateUserMutation();
  const hs = useHistory();
  const userInfo = useLocalStore((store) => store.userInfo);

  const handleSubmit = () => {
    updateUser({
      variables: {
        mySpecialty: userInfo.specialty,
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
      header={<AppBar title="تخصص"></AppBar>}
    >
      <GetSpecialty className="px-4 pt-4" handleSubmit={handleSubmit} />
    </Page>
  );
}
