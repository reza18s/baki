import React, { ReactNode, useEffect, useState } from 'react';
import {
  Link,
  RouteComponentProps,
  useLocation,
  withRouter,
} from 'react-router-dom';
import { paths } from './paths';
import { IcProfileTap } from '@/components/icons/IcProfileTap';
import { IcExploreTap } from '@/components/icons/IcExploreTap';
import { IcHeardTap } from '@/components/icons/IcHeardTap';
import { IcChatTap } from '@/components/icons/IcChatTap';

interface MainLayoutProps extends RouteComponentProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const [activeTab, setActiveTab] = useState<
    'chat' | 'explore' | 'profile' | 'notifications'
  >();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === paths.main.explore) {
      setActiveTab('explore');
    } else if (pathname.startsWith(paths.main.chat)) {
      setActiveTab('chat');
    } else if (pathname.startsWith(paths.main.profile)) {
      setActiveTab('profile');
    } else if (pathname.startsWith(paths.main.notifications)) {
      setActiveTab('notifications');
    }
  }, [pathname]);
  return (
    <div className="relative flex h-dvh w-full flex-col items-center justify-between">
      <div className="h-full w-full">{children}</div>
      <div className="absolute bottom-0 z-[101] flex h-14 w-full items-center justify-between bg-white px-5 py-3 shadow-[0_0_5px_#88888875]">
        <Link to={paths.main.chat}>
          <IcChatTap
            className={activeTab === 'chat' ? 'fill-brand-yellow' : ''}
          ></IcChatTap>
        </Link>
        <Link to={paths.main.notifications}>
          <IcHeardTap
            className={`${activeTab === 'notifications' ? 'fill-brand-yellow' : ''} `}
          />
        </Link>
        <Link to={paths.main.explore}>
          <IcExploreTap
            className={activeTab === 'explore' ? 'fill-brand-yellow' : ''}
          />
        </Link>
        <Link to={paths.main.profile}>
          <IcProfileTap
            className={activeTab === 'profile' ? 'fill-brand-yellow' : ''}
          />
        </Link>
      </div>
    </div>
  );
}

export default withRouter(MainLayout);
