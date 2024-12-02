import { useHistory } from 'react-router-dom';
import { useLocalStore } from '@/store/useLocalStore';
import { useUpdateUserMutation } from '@/graphql/generated/graphql.codegen';
import { Page } from '../layout/Page';
import AppBar from '../layout/Header/AppBar';
import GetSpecialty from '../Signup/GetSpecialty';
import { customToast } from '../base/toast';

export default function CompleteSpecialty() {
  const [updateUser] = useUpdateUserMutation();
  const hs = useHistory();
  const userInfo = useLocalStore((store) => store.userInfo);

  const handleSubmit = () => {
    updateUser({
      variables: {
        mySpecialty: userInfo.mySpecialty,
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
      contentClassName="h-[100dvh]  p-6"
      header={<AppBar title="تخصص"></AppBar>}
    >
      <GetSpecialty handleSubmit={handleSubmit} />
    </Page>
  );
}
