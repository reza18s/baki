import React, { ReactNode, useEffect } from 'react';
import * as SolarIconSet from 'solar-icon-set';
import BakiLogo from "../../../assets/img/Explore/BakiLogo.svg";
import { MdOutlineTravelExplore } from 'react-icons/md';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';

interface MailLayoutProps extends RouteComponentProps {
    children: ReactNode;
}

function MailLayout({ children, location }: MailLayoutProps) {
    // Determine which icon should be brand-yellow based on the current URL
    const [isChatActive, setIsChatActive] = React.useState(false);
    const [isExploreActive, setIsExploreActive] = React.useState(false);
    const [isLikesActive, setIsLikesActive] = React.useState(false);
    const [isProfileActive, setIsProfileActive] = React.useState(false);

    useEffect(() => {
        setIsChatActive(location.pathname.startsWith('/Chat'))
        setIsExploreActive(location.pathname.startsWith('/explore'))
        setIsLikesActive(location.pathname.startsWith('/explore/likes'))
        setIsProfileActive(location.pathname.startsWith('/profile/'))
    }, [location.pathname])

    return (
        <div className='pt-5 pb-3 px-7 w-full min-h-full h-[100%] flex flex-col items-center justify-between'>
            {/* Head */}
            <div className='w-full flex items-center justify-between'>
                <SolarIconSet.HamburgerMenu size={24} />
                <img src={BakiLogo} alt='BakiLogo' />
                <SolarIconSet.Tuning2 size={24} />
            </div>
            {/* Body */}
            <div>
                {children}
            </div>
            {/* Footer */}
            <div className='w-full flex items-center justify-between'>
                <SolarIconSet.ChatRound size={30} className={isChatActive ? 'text-brand-yellow' : 'text-brand-black'} />
                <SolarIconSet.Heart size={30} className={isLikesActive ? 'text-brand-yellow' : 'text-brand-black'} />
                <Link to="/explore">
                    <MdOutlineTravelExplore size={30} className={isExploreActive ? 'text-brand-yellow' : 'text-brand-black'} />
                </Link>
                <Link to="/profile">
                    <SolarIconSet.UserRounded size={30} className={isProfileActive ? 'text-brand-yellow' : 'text-brand-black'} />
                </Link>
            </div>
        </div>
    );
}

export default withRouter(MailLayout);
