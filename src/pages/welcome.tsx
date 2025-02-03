import BackgroundImage from '../assets/img/home/BackgroundImage.svg';
import BakiLogo from '../assets/img/home/BakiLogo.svg';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Rules } from '@/components/Signup/rules';
import Modal from '../components/base/Modal/Modal';
import { Page } from '@/components/layout/Page';
import { useGetMeQuery } from '@/graphql/generated/graphql.codegen';
import { paths } from '@/routes/paths';
import { App } from '@capacitor/app';
export default function Welcome() {
  const [showRules, setShowRules] = useState<boolean>(false);
  const hs = useHistory();
  const { data } = useGetMeQuery();
  useEffect(() => {
    if (data?.getMe) {
      hs.push(paths.explore.main);
    }
  }, [data]);
  useEffect(() => {
    const backButtonListener = App.addListener('backButton', (e) => {
      exitApp();
    });

    // Cleanup listener on component unmount
    return () => {
      backButtonListener.then((listener) => listener.remove());
    };
  }, []);

  const exitApp = () => {
    App.exitApp(); // Exit the app
  };
  return (
    <Page
      className="flex h-full w-full flex-col items-center"
      contentClassName="h-[100dvh]"
    >
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="flex h-[94vh] w-full flex-col items-center justify-between px-[24px] pt-[40px] text-white">
          <div className="flex max-h-fit flex-col items-center justify-between gap-y-[8px]">
            <img src={BakiLogo} alt="BakiLogo" />
            <h2 className="text-sm font-bold leading-tight text-white">
              راه حلی برای سفر های از دست رفته
            </h2>
          </div>
          <div className="z-10 flex w-full flex-col items-center justify-between gap-y-[16px]">
            <div className="flex w-full flex-col items-center justify-between gap-y-[8px] text-center">
              <Link
                to="/signup"
                className="w-full rounded-[12px] bg-brand-yellow py-[16px] text-base font-bold text-brand-black"
              >
                ورود / ثبت نام
              </Link>
            </div>
            <p className="px-[20px] text-center text-sm font-bold leading-tight text-white">
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
          <Modal
            isOpen={showRules}
            onRequestClose={() => setShowRules(false)}
            className="flex w-[90%] flex-col items-center rounded-3xl bg-white py-4"
          >
            <Rules hideRules={() => setShowRules(false)}></Rules>
          </Modal>
        </div>
        {/* gradient div */}
        <div className="absolute bottom-0 h-[50vh] w-full bg-gradient-to-t from-brand-black" />
      </div>
    </Page>
  );
}
