import { client } from '@/graphql/apollo/client';
import { socket } from '@/graphql/apollo/socket';
import {
  useMessageSentSubscription,
  useUserStatusSubscription,
} from '@/graphql/generated/graphql.codegen';
import React, { useEffect } from 'react';

export const Subs = ({ children }: { children: React.ReactNode }) => {
  // const {
  //   data,
  //   restart,
  //   error: userStatusError,
  // } = useUserStatusSubscription({
  //   client: socket,
  // });
  // const {
  //   data: messages,
  //   restart: restartMessages,
  //   error: messageError,
  // } = useMessageSentSubscription({
  //   client: socket,
  //   shouldResubscribe: true,
  // });

  // useEffect(() => {
  //   if (userStatusError) {
  //     setTimeout(() => {
  //       restart();
  //     }, 1000);
  //   }
  //   if (messageError) {
  //     setTimeout(() => {
  //       restartMessages();
  //     }, 1000);
  //   }
  // }, [userStatusError, messageError]);

  // useEffect(() => {
  //   client.refetchQueries({ include: ['GetChats'] });
  // }, [data, messages]);

  // useEffect(() => {
  //   client.refetchQueries({ include: ['GetChat'] });
  // }, [messages]);

  return <>{children}</>;
};
