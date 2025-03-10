import {
  Notification as INotification,
  User,
} from '@/graphql/generated/graphql.codegen';
import { calculateElapsedTime } from '@/utils/datetime';
import React from 'react';
import Button from '../base/Button/Button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export const Notification = ({
  notification,
  onClick,
  disabled,
  user,
}: {
  user: User;
  notification: INotification;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <div className="flex gap-2">
      <div className="relative">
        <Avatar className="size-12 rounded-xl">
          <AvatarImage src={user.mainImage || ''} className="object-cover" />
          <AvatarFallback className="rounded-xl">
            {user.name?.[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div
          className={`absolute -left-2 bottom-3 size-[14px] rounded-full border-[2.5px] border-white ${user.isOnline ? 'bg-brand-green' : 'bg-gray-400'}`}
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
