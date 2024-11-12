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
import { ISeachType, useStore } from '@/store/useStore';

export default function Explore() {
  const FirstEnter = useLocalStore((store) => store.ExploreEntered);
  const setExploreEntered = useLocalStore((store) => store.setExploreEntered);
  const { searchType, setSearchType } = useStore((store) => store);
  const [search, setSearch] = useState<ISeachType>(searchType);
  const [isOpen, setIsOpen] = useState(false);

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
  useEffect(() => {
    setSearch(searchType);
  }, []);
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
          <SolarIconSet.HamburgerMenu size={24} />
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
      </div>
      <BottomSheetModal
        isOpen={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
          setSearch(searchType);
        }}
        onCloseEnd={() => {
          setIsOpen(false);
          setSearch(searchType);
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
                  setSearch(el.value);
                }}
              >
                <div
                  className={`size-6 rounded-full ${el.value === search ? 'border-[6px] border-brand-yellow' : 'border-2'}`}
                ></div>
                {el.label}
              </div>
            ))}
          </div>
          <Button
            className="h-10 w-full p-0"
            onClick={() => {
              setSearchType(search);
              setIsOpen(false);
            }}
          >
            تایید
          </Button>
        </div>
      </BottomSheetModal>
    </Page>
  );
}
