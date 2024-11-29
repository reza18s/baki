import React, { PropsWithChildren, useEffect, useState } from 'react';
import { paths } from './paths';
import { DotesLoading } from '@/components/base/Loader/Loader';
import { GetMeQuery, useGetMeQuery } from '@/graphql/generated/graphql.codegen';
import { useLocalStore } from '@/store/useLocalStore';
import { useHistory } from 'react-router';
import { customToast } from '@/components/base/toast';

type GuardState = 'normal' | 'loading';

const AppGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const history = useHistory();
  const [state, setState] = useState<GuardState>('loading');
  const updateUserInfo = useLocalStore((s) => s.updateUserInfo);
  const setSteps = useLocalStore((s) => s.setSteps);

  const { data } = useGetMeQuery({
    onError(err) {
      if (err.message == 'Failed to fetch') {
        return;
      }
      setSteps(0);
      history.push(paths.welcome.main);
      setState('normal');
    },
  });

  useEffect(() => {
    if (data?.getMe) {
      const getMe = data.getMe;
      updateUserInfo(getMe);
      setState('normal');
    }
  }, [data]);

  return (
    <>
      {state === 'loading' ? (
        <div className="fixed inset-0 z-50 bg-warning-100">
          <div className="absolute inset-x-0 top-[50%] flex translate-y-[-50%] flex-col items-center">
            x
          </div>

          <div className="absolute inset-x-0 bottom-10 flex justify-center">
            <DotesLoading className="bg-gray-800" size="h-2 w-2" />
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

const checkUserInfo = (getMeData: GetMeQuery['getMe']) => {
  return (
    getMeData?.name &&
    getMeData?.gender &&
    getMeData.birthday &&
    getMeData.province &&
    (getMeData.travelInterests?.length || 0) >= 5 &&
    (getMeData.personalInterests?.length || 0) >= 5 &&
    (getMeData.mySpecialty?.length || 0) >= 1
  );
};

export default AppGuard;
