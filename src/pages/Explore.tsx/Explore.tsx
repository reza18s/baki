import ExploreCard from '../../components/layout/Explore/ExploreCard';
import CardImage from '../../assets/img/Explore/CardImage.svg';
import BakiLogo from '../../assets/img/Explore/BakiLogo.svg';
import * as SolarIconSet from 'solar-icon-set';
import { Page } from '@/components/layout/Page';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Explore() {
  const [cards, setCards] = useState([
    { id: 1, content: 'Page 54' },
    { id: 2, content: 'Page 55' },
    { id: 3, content: 'Page 56' },
    // Add more card data as needed
  ]);

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
          <SolarIconSet.Tuning2 size={24} />
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
    </Page>
  );
}
