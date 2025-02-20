import React, { PropsWithChildren, useEffect, useState } from 'react';
import { paths } from './paths';
import {
  useAddDeviceTokenMutation,
  useGetMeQuery,
} from '@/graphql/generated/graphql.codegen';
import { useLocalStore } from '@/store/useLocalStore';
import { LoaderPage } from '@/components/base/Loader/LoaderPage';
import { useIonRouter } from '@ionic/react';
import { PushNotifications } from '@capacitor/push-notifications';
import { customToast } from '@/components/base/toast';

type GuardState = 'normal' | 'loading' | 'offline';

const AppGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const history = useIonRouter();
  const [state, setState] = useState<GuardState>('loading');
  const updateUserInfo = useLocalStore((s) => s.updateUserInfo);
  const setSteps = useLocalStore((s) => s.setSteps);
  const [addDeviceToken] = useAddDeviceTokenMutation();

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
    const initializePushNotifications = async () => {
      const permission = await PushNotifications.requestPermissions();
      if (permission.receive === 'granted') {
        await PushNotifications.register();
      }

      // Handle token
      PushNotifications.addListener('registration', (token) => {
        localStorage.setItem('deviceToken', token.value);
        if (data?.getMe) {
          addDeviceToken({
            variables: {
              token: token.value,
            },
          });
        }
      });

      // Handle notification received
      PushNotifications.addListener(
        'pushNotificationReceived',
        (notification) => {
          // customToast(`Notification Rceived: ${notification}`, 'warning');
        },
      );

      // Handle notification action
      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (action) => {
          if (action.notification.data.url) {
            customToast(action.notification.data.url, 'success');
            history.push(action.notification.data.url);
          } else {
            customToast(action.notification.data, 'success');
          }
        },
      );
    };

    initializePushNotifications();
  }, []);
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

export default AppGuard;
