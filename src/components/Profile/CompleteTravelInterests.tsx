import { useHistory } from 'react-router';
import { useUpdateUserMutation } from '@/graphql/generated/graphql.codegen';
import { Page } from '../layout/Page';
import AppBar from '../layout/Header/AppBar';
import GetTravelInterests from '../Signup/GetTravelInterests';
import { customToast } from '../base/toast';

export default function CompleteTravelInterests() {
  const [updateUser] = useUpdateUserMutation();
  const hs = useHistory();
  const handleSubmit = (data: { travelInterests?: string[] }) => {
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
      header={<AppBar title="علایق عمومی"></AppBar>}
    >
      <GetTravelInterests handleSubmit={handleSubmit} />
    </Page>
  );
}
