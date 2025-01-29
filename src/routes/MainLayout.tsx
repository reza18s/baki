import React, { ReactNode, useEffect, useState } from 'react';
import {
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';

import { paths } from './paths';
import { BottomNavItem } from '@/components/BottomNav/BottomNavItem';
import { IcChatTap } from '@/components/icons/IcChatTap';
import { IcHeardTap } from '@/components/icons/IcHeardTap';
import { IcExploreTap } from '@/components/icons/IcExploreTap';
import { IcExploreTap2 } from '@/components/icons/IcExploreTap2';
import { IcProfileTap } from '@/components/icons/IcProfileTap';
import { zoomInAnimation } from './routes';

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState<string>('');

  const TAB_MAP = {
    explore: paths.main.explore,
    chat: paths.main.chat,
    profile: paths.main.profile,
    notifications: paths.main.notifications,
  };

  useEffect(() => {
    const matchedTab = Object.keys(TAB_MAP).find(
      (key) => pathname === TAB_MAP[key as keyof typeof TAB_MAP],
    );
    setActiveTab(matchedTab || '');
  }, [pathname]);

  return (
    <IonTabs>
      {/* Router Outlet for Tab Content */}
      <IonRouterOutlet animated={false} animation={zoomInAnimation} mode="md">
        {children}
      </IonRouterOutlet>

      {/* Tab Bar for Navigation */}
      <IonTabBar slot="bottom" className="bg-white shadow-[0_0_5px_#88888875]">
        {/* Chat Tab */}
        <IonTabButton className="bg-white" tab="chat" href={paths.main.chat}>
          <BottomNavItem
            Icon={
              <IcChatTap
                className={`${
                  activeTab === 'chat'
                    ? 'fill-brand-yellow stroke-brand-yellow stroke-2'
                    : 'fill-none stroke-gray-500 stroke-2'
                } transition-colors duration-100 ease-in-out`}
              />
            }
            isActive={activeTab === 'chat'}
          />
        </IonTabButton>
        <IonTabButton
          className="bg-white"
          tab="notifications"
          href={paths.main.notifications}
        >
          <BottomNavItem
            Icon={
              <IcHeardTap
                className={`${
                  activeTab === 'notifications'
                    ? 'fill-brand-yellow stroke-brand-yellow stroke-2'
                    : 'fill-none stroke-gray-500 stroke-2'
                } transition-colors duration-100 ease-in-out`}
              />
            }
            isActive={activeTab === 'notifications'}
          />
        </IonTabButton>
        <IonTabButton
          className="bg-white"
          tab="explore"
          href={paths.main.explore}
        >
          <BottomNavItem
            Icon={
              activeTab === 'explore' ? (
                <IcExploreTap className="bg-transparent fill-brand-yellow transition-colors duration-100 ease-in-out" />
              ) : (
                <IcExploreTap2 />
              )
            }
            isActive={activeTab === 'explore'}
          />
        </IonTabButton>
        <IonTabButton
          className="bg-white"
          tab="profile"
          href={paths.main.profile}
        >
          <BottomNavItem
            Icon={
              <IcProfileTap
                className={`${
                  activeTab === 'profile'
                    ? 'fill-brand-yellow stroke-brand-yellow stroke-2'
                    : 'fill-none stroke-gray-500 stroke-2'
                } transition-colors duration-100 ease-in-out`}
              />
            }
            isActive={activeTab === 'profile'}
          />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

export default MainLayout;
