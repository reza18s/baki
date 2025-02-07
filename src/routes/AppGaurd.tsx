import React, { PropsWithChildren, useEffect, useState } from 'react';
import { paths } from './paths';
import { GetMeQuery, useGetMeQuery } from '@/graphql/generated/graphql.codegen';
import { useLocalStore } from '@/store/useLocalStore';
import { LoaderPage } from '@/components/base/Loader/LoaderPage';
import { useIonRouter } from '@ionic/react';

type GuardState = 'normal' | 'loading' | 'offline';

const AppGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const history = useIonRouter();
  const [state, setState] = useState<GuardState>('loading');
  const updateUserInfo = useLocalStore((s) => s.updateUserInfo);
  const setSteps = useLocalStore((s) => s.setSteps);

  const { data, refetch } = useGetMeQuery({
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
      // @ts-expect-error the
      updateUserInfo({ ...getMe });
      setState('normal');
    }
  }, [data, refetch]);

  return <>{state === 'loading' ? <LoaderPage></LoaderPage> : children}</>;
};

const checkUserInfo = (getMeData: GetMeQuery['getMe']) => {
  return (
    getMeData?.name &&
    getMeData?.gender &&
    getMeData.birthdate &&
    getMeData.province &&
    (getMeData.travelInterests?.length || 0) >= 5 &&
    (getMeData.personalInterests?.length || 0) >= 5 &&
    (getMeData.mySpecialty?.length || 0) >= 1
  );
};

export default AppGuard;
