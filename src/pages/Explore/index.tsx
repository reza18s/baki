import ExploreCard from '../../components/Explore/ExploreCard';
import CardImage from '../../assets/img/Explore/CardImage.svg';
import BakiLogo from '../../assets/img/Explore/BakiLogo.svg';
import * as SolarIconSet from 'solar-icon-set';
import { Page } from '@/components/layout/Page';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocalStore } from '@/store/useLocalStore';
import BottomSheetModal from '@/components/base/Modal/BottomSheetModal';
import Button from '@/components/base/Button/Button';
import { SearchTypes } from '@/lib';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';
import { IcExclamationMarkInCircle } from '@/components/icons/IcExclamationMarkInCircle';
import { IcExploreStart } from '@/components/icons/IcExploreStart';
import Sidebar from '@/components/base/sidebar/sidebar';

export default function Explore() {
  const FirstEnter = useLocalStore((store) => store.ExploreEntered);
  const setExploreEntered = useLocalStore((store) => store.setExploreEntered);
  const { searchType, setSearchType } = useStore((store) => store);
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [start, setStart] = useState(false);

  const [cards, setCards] = useState([
    { id: 1, content: 'Page 54' },
    { id: 2, content: 'Page 55' },
    { id: 3, content: 'Page 56' },
    // Add more card data as needed
  ]);
  useEffect(() => {
    if (!FirstEnter) {
      setIsOpen(true);
      setExploreEntered();
    }
  }, [FirstEnter]);
  const handleSwipe = (id: number) => {
    // Remove the card after swipe or change its state as needed
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };
  return (
    <Page
      className="pb-14"
      contentClassName="h-[calc(100%)]"
      header={
        <div className="flex h-12 w-full items-center justify-between p-3">
          <SolarIconSet.HamburgerMenu
            size={24}
            onClick={() => {
              setIsSidebarOpen(true);
            }}
          />
          <img src={BakiLogo} alt="BakiLogo" />
          <SolarIconSet.Tuning2
            size={24}
            onClick={() => {
              setIsOpen(true);
            }}
          />
        </div>
      }
    >
      <div className="relative flex h-full w-full flex-row-reverse p-2">
        {start ? (
          <AnimatePresence>
            {cards.map((card, index) => (
              <ExploreCard
                inView={index == cards.length - 1}
                id={card.id}
                handleSwipe={handleSwipe}
                key={card.id}
                image={CardImage}
                name="سحر رضایی"
                age={24}
                isOnline={false}
                location="گلستان گرگان"
                searchMethod="تصادفی"
              />
            ))}
          </AnimatePresence>
        ) : (
          <div
            className="size-full bg-warning-50 p-4"
            onClick={() => setStart(true)}
          >
            <div className="text flex h-[90%] flex-col items-center justify-center gap-4 text-base font-bold text-black">
              <IcExploreStart></IcExploreStart>
              برای شروع ماجراجویی روی صفحه کلیک کنید.
            </div>
            <Button className="h-12 w-full p-0">تغییر فیلترها</Button>
          </div>
        )}
      </div>
      <BottomSheetModal
        isOpen={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        onCloseEnd={() => {
          setIsOpen(false);
          setSearchType(searchType);
          toast.custom(() => (
            <div className="flex h-10 flex-nowrap items-center gap-2 text-nowrap rounded-xl border-2 border-brand-yellow bg-white p-3 px-7 text-base font-bold">
              <IcExclamationMarkInCircle className="fill-none"></IcExclamationMarkInCircle>
              شما وارد حالت جستجوی تصادفی شدید!
            </div>
          ));
        }}
        className="flex items-center justify-center p-4"
      >
        <div className="h-full w-full px-6 pb-2">
          <h1 className="my-3 text-center text-lg font-bold">
            یکی از حالت‌های زیر را انتخاب کنید
          </h1>
          <div className="flex flex-col">
            {SearchTypes.map((el) => (
              <div
                key={el.value}
                className="flex h-16 items-center gap-2 border-t text-sm"
                onClick={() => {
                  setSearchType(el.value);
                }}
              >
                <div
                  className={`size-6 rounded-full ${el.value === searchType ? 'border-[6px] border-brand-yellow' : 'border-2'}`}
                ></div>
                {el.label}
              </div>
            ))}
          </div>
          <Button
            className="h-10 w-full p-0"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            تایید
          </Button>
        </div>
      </BottomSheetModal>
      <Sidebar
        isOpen={isSidebarOpen}
        onRequestClose={() => {
          setIsSidebarOpen(false);
        }}
        onCloseEnd={() => {
          setIsSidebarOpen(false);
          toast.custom(() => (
            <div className="flex h-10 flex-nowrap items-center gap-2 text-nowrap rounded-xl border-2 border-brand-yellow bg-white p-3 px-7 text-base font-bold">
              <IcExclamationMarkInCircle className="fill-none"></IcExclamationMarkInCircle>
              شما وارد حالت جستجوی تصادفی شدید!
            </div>
          ));
        }}
        className="flex w-[80%] items-center justify-center"
      >
        <div className="h-full w-full">
          <h1 className="my-5 text-sm">یکی از حالت‌های زیر را انتخاب کنید:</h1>
          <div className="flex flex-col gap-5">
            {SearchTypes.map((el) => (
              <div
                key={el.value}
                className={`flex items-center justify-between gap-4 px-2 py-3 text-sm ${searchType === el.value && 'bg-warning-50'}`}
                onClick={() => {
                  setSearchType(el.value);
                }}
              >
                <div className="flex w-[90%] items-center gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-6"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9.99998"
                      fill="#94A3B8"
                      stroke="#94A3B8"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M16.7248 16.7029C16.1072 17.3234 15.3734 17.8162 14.5653 18.1531C13.7573 18.4899 12.8908 18.6644 12.0153 18.6664C11.1398 18.6684 10.2725 18.498 9.4629 18.1648C8.6533 17.8316 7.91724 17.3423 7.29676 16.7246"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="w-[90%]">
                    <h2 className="text-nowrap text-base font-bold">
                      {el.label}
                    </h2>
                    <span className="text-xs text-gray-500">
                      {el.description}
                    </span>
                  </div>
                </div>
                <div
                  className={`min-size-5 size-5 rounded-full ${el.value === searchType ? 'border-[6px] border-brand-yellow' : 'border-2'}`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </Sidebar>
    </Page>
  );
}
