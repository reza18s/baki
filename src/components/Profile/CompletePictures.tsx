import { useForm } from 'react-hook-form';
import { Page } from '../layout/Page';
import AppBar from '../layout/Header/AppBar';
import GetPictures from '../Signup/GetPictures';

export default function CompletePictures() {
  const { control, watch } = useForm();
  return (
    <Page
      className="flex h-full w-full flex-col items-center"
      contentClassName="h-[100dvh] p-6"
      header={<AppBar title="تایید"></AppBar>}
    >
      <GetPictures control={control} name={watch('name')} />
    </Page>
  );
}
