import { useForm } from 'react-hook-form';
import GetPictures from '../Signup/GetPictures';
import { Page } from '../Page';
import AppBar from '../Header/AppBar';

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
