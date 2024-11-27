import {
  Notification as INotification,
  useGetUserQuery,
} from '@/graphql/generated/graphql.codegen';
import React from 'react';
import CardImage from '../../assets/images/image.png';
import { customToast } from '../base/toast';
import { MdVerified } from 'react-icons/md';
import { RiMapPin2Fill } from 'react-icons/ri';

export const LikeCard = ({
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

  const user = data?.getUser;
  return (
    <div
      className="flex h-60 items-end gap-2 rounded-lg p-2"
      onClick={() => !disabled && onClick?.()}
      style={{
        backgroundImage: `url(${CardImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="text-sm text-white">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-black text-white">
            {user?.name} ، {user?.age}
          </h1>
        </div>
        <div className="flex items-center gap-x-1 text-xs text-white">
          <RiMapPin2Fill size={16} fill="#fff" className="-mr-[2px]" />
          {user?.province}
        </div>
        <div className="flex items-center gap-x-1 text-xs text-white">
          <div className="flex h-[12px] w-[12px] items-center justify-center rounded-full bg-white">
            <div
              className={`h-[8px] w-[8px] rounded-full ${
                user ? 'bg-brand-green' : 'bg-red-500'
              }`}
            />
          </div>
          {user ? 'آنلاین' : 'آفلاین'}
        </div>
      </div>
    </div>
  );
};
