import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  ScrollDetail,
} from "@ionic/react";

import React from "react";
import { IonContentCustomEvent } from "@ionic/core/dist/types/components";
import clsx from "clsx";
import { forwardRef } from "react";
import { BasePropsWithChildren } from "../base/type/base";

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
      headerClassName = "rounded-b-13 font-vazir text-center absolute top-0 z-[1] inset-x-0 shadow-Appbar bg-white flex items-center h-14",
    },
    ref,
  ) => {
    return (
      <IonPage
        className={"h-full" + className}
        style={{
          position: "relative",
        }}
      >
        {header && <div className={headerClassName}>{header}</div>}
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
          <div className={clsx("w-full", header && "pt-14", contentClassName)}>
            {children}
          </div>
        </IonContent>
      </IonPage>
    );
  },
);

Page.displayName = "Page";
