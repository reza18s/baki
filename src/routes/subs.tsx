import { client } from '@/graphql/apollo/client';
import { socket } from '@/graphql/apollo/socket';
import {
  useGetMeQuery,
  useMessageSentSubscription,
  useUserStatusSubscription,
} from '@/graphql/generated/graphql.codegen';
import { useLocalStore } from '@/store/useLocalStore';
import React, { useEffect, useState } from 'react';
import { paths } from './paths';
import { LoaderPage } from '@/components/base/Loader/LoaderPage';
import { useIonRouter } from '@ionic/react';
type GuardState = 'normal' | 'loading' | 'offline';

export const Subs = ({ children }: { children: React.ReactNode }) => {
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
  const {
    data: isOnline,
    restart,
    error: userStatusError,
  } = useUserStatusSubscription({
    client: socket,
  });
  const {
    data: messages,
    restart: restartMessages,
    error: messageError,
  } = useMessageSentSubscription({
    client: socket,
    shouldResubscribe: true,
  });
  useEffect(() => {
    if (userStatusError) {
      setTimeout(() => {
        restart();
      }, 1000);
    }
    if (messageError) {
      setTimeout(() => {
        restartMessages();
      }, 1000);
    }
  }, [userStatusError, messageError]);

  useEffect(() => {
    client.refetchQueries({ include: ['GetChats'] });
    client.cache.evict({ fieldName: 'getChats' });
  }, [isOnline, messages]);
  useEffect(() => {
    client.refetchQueries({ include: ['GetChat'] });
    client.cache.evict({ fieldName: 'getChat' });
  }, [messages]);
  client.cache.evict({
    fieldName: 'getChat',
    args: { participantId: 'cm6cbq4fx000q4zo1i1lij95c' },
  });
  return <>{state === 'loading' ? <LoaderPage></LoaderPage> : children}</>;
};
