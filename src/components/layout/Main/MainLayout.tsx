import * as SolarIconSet from 'solar-icon-set';
import BakiLogo from "../../../assets/img/Explore/BakiLogo.svg"

export default function MailLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
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
        </div>
    )
}