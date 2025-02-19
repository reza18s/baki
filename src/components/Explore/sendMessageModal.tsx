import React from 'react';
import BottomSheetModal from '../base/Modal/BottomSheetModal';
import Button from '../base/Button/Button';
import { RandomUser, User } from '@/graphql/generated/graphql.codegen';
import { useStore } from '@/store/useStore';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Request } from '@/components/shared/request';

export const SendMessageModal = ({
  user,
  isOpen,
  setClose,
}: {
  user: RandomUser | User;
  isOpen: boolean;
  setClose: () => void;
}) => {
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
        <Request
          id={user.id}
          searchType={searchType}
          className="w-full p-0"
          buttonClassName="w-full"
          showSendMessage
          user={user as User}
        ></Request>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 border-t pt-4">
        <Button className="h-10 w-full p-0 text-sm" onClick={() => setClose()}>
          مشاهده بعدی
        </Button>
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
