import { IcArrowRight } from '@/components/base/icons/IcArrowRight';
import React from 'react';

import { useHistory } from 'react-router-dom';

interface AppBarProps {
  title?: string;
  backButt?: React.ReactNode;
  showBackButt?: boolean;
  actions?: React.ReactNode;
  onBack?: () => void;
}
const AppBar: React.FC<AppBarProps> = ({
  title: text,
  showBackButt = true,
  backButt,
  actions,
  onBack,
}) => {
  const history = useHistory();
  if (showBackButt) {
    onBack ??= () => {
      history.goBack();
    };
  }
  return (
    <div className="relative flex w-full items-center justify-between px-6">
      {showBackButt ? (
        <button onClick={onBack} className="text-gray-800">
          {backButt ? backButt : <IcArrowRight />}
        </button>
      ) : (
        <div />
      )}
      <div className="absolute inset-x-0 mx-12 text-center font-semibold text-gray-800">
        {text}
      </div>
      {actions}
    </div>
  );
};

export default AppBar;
