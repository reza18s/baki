import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  ScrollDetail,
} from '@ionic/react';

import React from 'react';
import { IonContentCustomEvent } from '@ionic/core/dist/types/components';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { BasePropsWithChildren } from '../base/type/base';
interface PageProps extends BasePropsWithChildren {
  contentClassName?: string;
  headerClassName?: string;
  refresher?: boolean;
  scrollY?: boolean;
  onScroll?: (event: IonContentCustomEvent<ScrollDetail>) => void;
  header?: React.ReactNode;
}

export const Page = forwardRef<HTMLIonContentElement, PageProps>(
  (
    {
      header,
      className,
      contentClassName,
      onScroll,
      scrollY = true,
      refresher = true,
      children,
      headerClassName,
    },
    ref,
  ) => {
    return (
      <IonPage
        className={'h-dvh ' + className}
        style={{
          position: 'relative',
        }}
      >
        {header && (
          <div
            className={clsx(
              'rounded-b-13 absolute inset-x-0 top-0 z-[1] flex h-14 items-center bg-white text-center font-vazir shadow-Appbar',
              headerClassName,
            )}
          >
            {header}
          </div>
        )}
        <IonContent
          id="ion-content"
          className={contentClassName}
          onIonScroll={onScroll}
          ref={ref}
          scrollY={scrollY}
          scrollEvents={!!onScroll} // Converts to a boolean
        >
          {refresher && (
            <IonRefresher
              slot="fixed"
              onIonRefresh={() => {
                history.go(0);
              }}
            >
              <IonRefresherContent />
            </IonRefresher>
          )}
          <div className={clsx('w-full', header && 'pt-14', contentClassName)}>
            {children}
          </div>
        </IonContent>
      </IonPage>
    );
  },
);

Page.displayName = 'Page';
