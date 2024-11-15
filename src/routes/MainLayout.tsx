import React, { ReactNode, useEffect } from 'react';
import * as SolarIconSet from 'solar-icon-set';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

interface MailLayoutProps extends RouteComponentProps {
  children: ReactNode;
}

function MainLayout({ children, location }: MailLayoutProps) {
  // Determine which icon should be brand-yellow based on the current URL
  const [isChatActive, setIsChatActive] = React.useState(false);
  const [isExploreActive, setIsExploreActive] = React.useState(false);
  const [isLikesActive, setIsLikesActive] = React.useState(false);
  const [isProfileActive, setIsProfileActive] = React.useState(false);

  useEffect(() => {
    setIsChatActive(location.pathname.startsWith('/chat'));
    setIsExploreActive(location.pathname.startsWith('/explore'));
    setIsLikesActive(location.pathname.startsWith('/explore/likes'));
    setIsProfileActive(location.pathname.startsWith('/profile/'));
  }, [location.pathname]);

  return (
    <div className="relative flex h-dvh w-full flex-col items-center justify-between">
      {/* Body */}
      <div className="h-full w-full">{children}</div>
      {/* Footer */}
      <div className="absolute bottom-0 z-[101] flex h-14 w-full items-center justify-between bg-white px-5 py-3 shadow-[0_0_5px_#88888875]">
        <Link to="/chat">
          <SolarIconSet.ChatRound
            size={30}
            className={isChatActive ? 'text-brand-yellow' : 'text-brand-black'}
          />
        </Link>
        <SolarIconSet.Heart
          size={30}
          className={isLikesActive ? 'text-brand-yellow' : 'text-brand-black'}
        />
        <Link to="/explore">
          <MdOutlineTravelExplore
            size={30}
            className={
              isExploreActive ? 'text-brand-yellow' : 'text-brand-black'
            }
          />
        </Link>
        <Link to="/profile">
          <SolarIconSet.UserRounded
            size={30}
            className={
              isProfileActive ? 'text-brand-yellow' : 'text-brand-black'
            }
          />
        </Link>
      </div>
    </div>
  );
}

export default withRouter(MainLayout);
