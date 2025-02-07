import { IcArrowRight } from '@/components/icons/IcArrowRight';
import { useIonRouter } from '@ionic/react';
import clsx from 'clsx';
import React from 'react';

import { useHistory } from 'react-router-dom';

interface AppBarProps {
  title?: string;
  backButt?: React.ReactNode;
  showBackButt?: boolean;
  children?: React.ReactNode;
  onBack?: () => void;
  className?: string;
}
const AppBar: React.FC<AppBarProps> = ({
  title: text,
  showBackButt = true,
  backButt,
  className,
  children,
  onBack,
}) => {
  const history = useIonRouter();
  if (showBackButt) {
    onBack ??= () => {
      history.goBack();
    };
  }
  return (
    <div
      className={clsx(
        'relative flex w-full items-center justify-between px-6',
        className,
      )}
    >
      {showBackButt ? (
        <button onClick={onBack} className="text-gray-800">
          {backButt ? backButt : <IcArrowRight />}
        </button>
      ) : (
        <div />
      )}
      <div className="absolute inset-x-0 mx-12 text-center font-iransans text-lg font-semibold text-gray-800">
        {text}
      </div>
      {children}
    </div>
  );
};

export default AppBar;
