import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  ScrollDetail,
  useIonRouter,
} from '@ionic/react';
import React, { forwardRef, useEffect, useRef } from 'react';
import { IonContentCustomEvent } from '@ionic/core/dist/types/components';
import clsx from 'clsx';
import { BasePropsWithChildren } from '../base/type/base';
import { CircleSpinner } from '../base/Loader/Loader';
import { useLocalStore } from '@/store/useLocalStore';
import { useHistory, useLocation } from 'react-router';

interface PageProps extends BasePropsWithChildren {
  contentClassName?: string;
  headerClassName?: string;
  refresher?: boolean;
  scrollY?: boolean;
  onScroll?: (event: IonContentCustomEvent<ScrollDetail>) => void;
  header?: React.ReactNode;
  isLoading?: boolean;
  loading?: React.ReactNode;
  bgImage?: any;
  devRef?: React.MutableRefObject<HTMLDivElement | null>;
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
      loading,
      bgImage,
      isLoading,
      devRef,
    },
    ref,
  ) => {
    let contentRef = useRef<HTMLIonContentElement | null>(null);
    contentRef =
      (ref as React.MutableRefObject<HTMLIonContentElement | null>) ??
      contentRef;
    const scrollPositionRef = useRef<number>(0); // Persist scroll position
    const { scroll, setLastScroll } = useLocalStore((store) => store);
    const { pathname } = useLocation();
    const history = useIonRouter();

    // Save scroll position when leaving the page
    useEffect(() => {
      return () => {
        if (scrollPositionRef.current?.toString()) {
          setLastScroll(pathname, scrollPositionRef.current);
        }
      };
    }, []); // Runs when pathname changes (before unmount)

    // Restore the scroll position when the component mounts
    useEffect(() => {
      if (contentRef.current) {
        contentRef.current.getScrollElement().then((scrollElement) => {
          if (scroll?.[pathname] !== undefined) {
            scrollElement.scrollTo({
              top: scroll[pathname],
              behavior: 'auto', // Use 'smooth' for smooth scrolling
            });
          }
        });
      }
    }, []); // Runs when pathname or scroll changes

    return (
      <IonPage
        className={'h-dvh ' + className}
        style={{ position: 'relative' }}
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

        {bgImage && (
          <div
            className="absolute inset-0 z-0 bg-gray-50 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgImage})` }}
          ></div>
        )}

        <IonContent
          id="ion-content"
          className="max-h-screen overflow-scroll"
          onIonScroll={(e) => {
            scrollPositionRef.current = e.detail.scrollTop; // Save scroll position
            onScroll?.(e);
          }}
          ref={(el) => {
            contentRef.current = el;
            if (typeof ref === 'function') {
              ref(el);
            } else if (ref) {
              (
                ref as React.MutableRefObject<HTMLIonContentElement | null>
              ).current = el;
            }
          }}
          scrollY={scrollY}
          scrollEvents={true} // Enable scroll events if onScroll is provided
          style={
            bgImage && {
              backgroundColor: 'transparent',
              '--background': 'transparent',
            }
          }
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

          <div
            className={clsx('w-full', header && 'pt-14', contentClassName)}
            ref={devRef}
          >
            {isLoading
              ? loading || (
                  <div className="flex h-full w-full justify-center">
                    <CircleSpinner />
                  </div>
                )
              : children}
          </div>
        </IonContent>
      </IonPage>
    );
  },
);

Page.displayName = 'Page';
