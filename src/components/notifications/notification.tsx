import {
  Notification as INotification,
  useGetUserQuery,
} from '@/graphql/generated/graphql.codegen';
import { calculateElapsedTime } from '@/utils/datetime';
import React from 'react';
import Button from '../base/Button/Button';
import CardImage from '../../assets/images/image.png';
import { customToast } from '../base/toast';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export const Notification = ({
  notification,
  onClick,
  disabled,
}: {
  notification: INotification;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const { data, loading } = useGetUserQuery({
    variables: { id: notification.actionId },
    onError() {
      customToast('کاربر موجود نیست', 'error');
    },
  });
  return (
    <div className="flex gap-2">
      <div className="relative">
        <Avatar className="size-12 rounded-xl">
          <AvatarImage
            src={data?.getUser?.mainImage || ''}
            className="object-cover"
          />
          <AvatarFallback className="rounded-xl">
            {data?.getUser?.name?.[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div
          className={`absolute -left-2 bottom-3 size-[14px] rounded-full border-[2.5px] border-white ${data?.getUser?.isOnline ? 'bg-brand-green' : 'bg-gray-400'}`}
        ></div>
      </div>
      <div className="flex h-16 flex-1 items-center justify-between gap-2 border-b border-gray-100 pb-2">
        <div>
          <h2 className="text-[14px] font-medium">{notification.content}</h2>
          <span className="text-[10px] text-gray-400">
            {calculateElapsedTime(notification.createdAt, true)}
          </span>
        </div>
        <Button
          className="flex h-8 items-center px-4"
          rounded=" rounded-lg"
          onClick={() => onClick?.()}
          disabled={disabled}
        >
          مشاهده
        </Button>
      </div>
    </div>
  );
};
