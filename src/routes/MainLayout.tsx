import React, { ReactNode, useEffect, useState } from 'react';
import * as SolarIconSet from 'solar-icon-set';
import { MdOutlineTravelExplore } from 'react-icons/md';
import {
  Link,
  RouteComponentProps,
  useLocation,
  withRouter,
} from 'react-router-dom';
import { paths } from './paths';

interface MainLayoutProps extends RouteComponentProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const [activeTab, setActiveTab] = useState<
    'chat' | 'explore' | 'profile' | ''
  >('');
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === paths.main.explore) {
      setActiveTab('explore');
    } else if (pathname.startsWith(paths.main.chat)) {
      setActiveTab('chat');
    } else if (pathname.startsWith(paths.main.profile)) {
      setActiveTab('profile');
    } else {
      setActiveTab('');
    }
  }, [pathname]);
  return (
    <div className="relative flex h-dvh w-full flex-col items-center justify-between">
      <div className="h-full w-full">{children}</div>
      <div className="absolute bottom-0 z-[101] flex h-14 w-full items-center justify-between bg-white px-5 py-3 shadow-[0_0_5px_#88888875]">
        <Link to={paths.main.chat}>
          <SolarIconSet.ChatRound
            size={30}
            className={
              activeTab === 'chat' ? 'fill-brand-yellow' : 'fill-brand-black'
            }
          />
        </Link>
        <SolarIconSet.Heart
          size={30}
          className={
            activeTab === '' ? 'fill-brand-yellow' : 'fill-brand-black'
          }
        />
        <Link to={paths.main.explore}>
          <SolarIconSet.Heart
            size={30}
            color={
              activeTab === 'explore' ? 'fill-brand-yellow' : 'fill-brand-black'
            }
          />
        </Link>
        <Link to={paths.main.profile}>
          <SolarIconSet.UserRounded
            size={30}
            className={
              activeTab === 'profile' ? 'fill-brand-yellow' : 'fill-brand-black'
            }
          />
        </Link>
      </div>
    </div>
  );
}

export default withRouter(MainLayout);
