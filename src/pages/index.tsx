import BackgroundImage from '../assets/img/home/BackgroundImage.svg';
import BakiLogo from '../assets/img/home/BakiLogo.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rules } from '@/components/layout/Signup/rules';
import Modal from '../components/base/Modal/Modal';
export default function Index() {
  const [showRules, setShowRules] = useState<boolean>(false);

  return (
    <div
      className="h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="flex h-[94vh] w-full flex-col items-center justify-between px-[24px] pt-[40px] text-white">
        <div className="flex max-h-fit flex-col items-center justify-between gap-y-[8px]">
          <img src={BakiLogo} alt="BakiLogo" />
          <h2 className="text-sm font-bold leading-tight text-white">
            راه حلی برای سفر های از دست رفته
          </h2>
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-y-[16px] z-10">
          <div className="flex w-full flex-col items-center justify-between gap-y-[8px] text-center">
            <Link
              to="/signup"
              className="w-full rounded-[12px] bg-brand-yellow py-[16px] text-brand-black text-base font-bold"
            >
              ورود / ثبت نام
            </Link>
            <button className="w-full rounded-[12px] border border-solid border-white py-[16px] text-white text-base font-bold">
              ورود به صورت مهمان
            </button>
          </div>
          <p className="px-[20px] font-bold text-sm text-center leading-tight text-white">
            {`ورود و استفاده از اپلیکیشن باکی به معنای موافقت با`}{' '}
            <span
              onClick={() => setShowRules(true)}
              className="text-brand-yellow underline"
            >
              {` قوانین و مقررات حریم خصوصی‌`}
            </span>
            می‌باشد .
          </p>
        </div>
        {showRules && (
          <Modal
            isOpen={showRules}
            onRequestClose={() => setShowRules(false)}
            className="w-4/5 rounded-xl"
          >
            <Rules hideRules={() => setShowRules(false)}></Rules>
          </Modal>
        )}
      </div>
      {/* gradient div */}
      <div className='absolute w-full h-[40vh] bottom-0 bg-gradient-to-t from-[#9a9692]' />
    </div>
  );
}
