import React from 'react';
import BottomSheetModal from '../base/Modal/BottomSheetModal';
import Button from '../base/Button/Button';
import { IcCase } from '../icons/IcCase';
import { IcChair } from '../icons/IcChair';
import { IcSendMessage } from '../icons/IcSendMessage';
import {
  RandomUser,
  RequestType,
  useCreateRequestMutation,
  User,
} from '@/graphql/generated/graphql.codegen';
import { useStore } from '@/store/useStore';
import { customToast } from '../base/toast';
import { paths } from '@/routes/paths';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useIonRouter } from '@ionic/react';

export const SendMessageModal = ({
  user,
  isOpen,
  setClose,
}: {
  user: RandomUser | User;
  isOpen: boolean;
  setClose: () => void;
}) => {
  const hs = useIonRouter();
  const [createRequest, { loading: requestLoading }] =
    useCreateRequestMutation();
  const [createRequest2, { loading: requestLoading2 }] =
    useCreateRequestMutation();
  const { searchType } = useStore((store) => store);
  return (
    <BottomSheetModal
      show={false}
      isOpen={isOpen}
      onCloseEnd={() => setClose()}
      onRequestClose={() => setClose()}
      className="relative flex flex-col items-center justify-center gap-4 p-4 px-6"
    >
      <Avatar className="size-20">
        <AvatarImage src={user?.mainImage || ''} className="object-cover" />
        <AvatarFallback className="3xl">
          {user?.name?.[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <h2 className="text-lg font-bold">دوست داری به {user?.name} چی بگی؟</h2>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <Button
            variant="outline"
            className="flex h-10 w-full items-center justify-center gap-1 border-gray-300 p-0 text-sm font-medium"
            onClick={() => {
              createRequest({
                variables: {
                  receiverId: user.id,
                  searchType: searchType,
                  type: 'companionRequest' as RequestType,
                },
                onCompleted: () => {
                  customToast('دعوت با موفقیت ارسال شد', 'success');
                },
                onError: () => {
                  customToast('مشکلی پیش امد لطفا دوباره امتحان کنید', 'error');
                },
              });
            }}
            loading={requestLoading}
          >
            <IcCase></IcCase>
            ارسال درخواست همسفری
          </Button>
          <Button
            variant="outline"
            className="flex h-10 w-full items-center justify-center gap-1 border-gray-300 p-0 text-sm font-medium"
            onClick={() => {
              createRequest2({
                variables: {
                  receiverId: user.id,
                  searchType: searchType,
                  type: 'hostingInvitation' as RequestType,
                },
                onCompleted: () => {
                  customToast('دعوت با موفقیت ارسال شد', 'success');
                },
                onError: (err) => {
                  customToast(err.message, 'error');
                },
              });
            }}
            loading={requestLoading2}
          >
            <IcChair></IcChair>ارسال دعوت میزبانی
          </Button>
        </div>
        <Button
          onClick={() => hs.push(paths.chat.contact.exactPath(user.id))}
          variant="outline"
          className="mt-4 flex h-10 w-full items-center justify-center gap-1 border-gray-300 p-0 text-sm font-medium"
        >
          <IcSendMessage></IcSendMessage>ارسال پیام
        </Button>
      </div>
      <div className="mt-4 flex w-full flex-col items-center justify-center gap-2">
        <Button className="h-10 w-full p-0 text-sm">مشاهده بعدی</Button>
        <div className="flex items-center gap-1 text-xs" onClick={() => {}}>
          <input
            type="checkbox"
            readOnly
            className="custom-checkbox h-5 w-5 appearance-none rounded border-2 border-gray-400 bg-white transition-colors duration-200 checked:border-brand-yellow checked:bg-brand-yellow focus:outline-none focus:ring-0"
          />
          دیگر این صفحه را نمایش نده.
        </div>
      </div>
    </BottomSheetModal>
  );
};
