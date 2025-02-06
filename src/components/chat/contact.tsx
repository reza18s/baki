import { Chat, User } from '@/graphql/generated/graphql.codegen';
import { getLastMessageTime } from '@/utils/datetime';
import React, { FC } from 'react';
import { IcStar } from '../icons/IcStar';
import Checkbox from '../base/Input/checkboxSection/checkbox';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export const Contact: FC<
  React.HTMLAttributes<HTMLSpanElement> & {
    chat: Chat;
    me?: User;
    className?: string;
    checked?: boolean;
    hideChecked?: boolean;
  }
> = ({ chat, me, checked, hideChecked = true, ...props }) => {
  const user = chat.participants?.filter((user) => user?.id !== me?.id)[0];
  return (
    <div {...props}>
      <Checkbox
        readOnly
        checked={checked}
        className={cn('flex', hideChecked && 'hidden')}
      ></Checkbox>
      <div className="flex w-full gap-2 rounded-lg transition-all duration-300 ease-in-out active:bg-gray-100">
        <div className="relative flex items-center justify-center">
          <Avatar className="size-12">
            <AvatarImage src={user?.mainImage || ''} className="object-cover" />
            <AvatarFallback>{user?.name?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div
            className={`absolute bottom-1 left-0 size-[14px] rounded-full border-[2.5px] border-white ${user?.isOnline ? 'bg-brand-green' : 'bg-gray-400'}`}
          ></div>
        </div>
        <div className="w-full border-b border-gray-100 pb-1">
          <div className="flex h-14 flex-1 items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold">{user?.name}</h2>
              <span className="text-xs text-gray-400">
                {chat.Message?.[chat.Message?.length - 1]?.content}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-500">
                {chat.Message?.[chat.Message?.length - 1]?.createdAt &&
                  getLastMessageTime(
                    chat.Message?.[chat.Message?.length - 1]?.createdAt,
                  )}
              </span>
              <div className="flex justify-end">
                <IcStar className="size-4 fill-gray-400"></IcStar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
