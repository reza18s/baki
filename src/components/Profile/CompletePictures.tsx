import { Page } from '../layout/Page';
import AppBar from '../layout/Header/AppBar';
import GetPictures from '../Signup/GetPictures';
import { useUpdateUserMutation } from '@/graphql/generated/graphql.codegen';
import { useHistory } from 'react-router';
import { customToast } from '../base/toast';

export default function CompletePictures() {
  const [updateUser] = useUpdateUserMutation();
  const hs = useHistory();

  const handleSubmit = (data: { images?: string[]; mainImage?: string }) => {
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
      header={<AppBar title="تایید"></AppBar>}
    >
      <GetPictures update handleSubmit={handleSubmit} />
    </Page>
  );
}
