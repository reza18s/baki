import { User } from '@/graphql/generated/graphql.codegen';
import React from 'react';
import CardImage from '../../assets/images/image.png';
import { RiMapPin2Fill } from 'react-icons/ri';
import { cn } from '@/lib/utils';

export const LikeCard = ({
  onClick,
  user,
  disabled,
  showInfo = true,
  className,
}: {
  user: User;
  onClick?: () => void;
  disabled?: boolean;
  showInfo?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'flex h-60 items-end gap-2 rounded-xl p-2',
        className,
        !showInfo && 'blur-sm',
      )}
      onClick={() => !disabled && onClick?.()}
      style={{
        backgroundImage: `url(${user?.mainImage || CardImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="text-sm text-white">
        {showInfo && (
          <>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-black text-white">
                {user?.name} ، {user?.age}
              </h1>
            </div>
            <div className="flex items-center gap-x-1 text-xs text-white">
              <RiMapPin2Fill size={16} fill="#fff" className="-mr-[2px]" />
              {user?.province}, {user?.city}
            </div>
            <div className="flex items-center gap-x-1 text-xs text-white">
              <div className="flex h-[12px] w-[12px] items-center justify-center rounded-full bg-white">
                <div
                  className={`h-[8px] w-[8px] rounded-full ${
                    user?.isOnline ? 'bg-brand-green' : 'bg-red-500'
                  }`}
                />
              </div>
              {user ? 'آنلاین' : 'آفلاین'}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
