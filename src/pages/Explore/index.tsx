import ExploreCard from '../../components/Explore/exploreCard';
import CardImage from '../../assets/img/Explore/CardImage.svg';
import BakiLogo from '../../assets/img/Explore/BakiLogo.svg';
import * as SolarIconSet from 'solar-icon-set';
import { Page } from '@/components/layout/Page';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocalStore } from '@/store/useLocalStore';
import Button from '@/components/base/Button/Button';
import { IcExploreStart } from '@/components/icons/IcExploreStart';
import { SearchTypeSidebar } from '@/components/Explore/searchTypeSidebar';
import { SearchTypeModal } from '@/components/Explore/searchTypeModal';
import { useHistory } from 'react-router';
import { paths } from '@/routes/paths';
import {
  RandomUser,
  useGetRandomUserLazyQuery,
} from '@/graphql/generated/graphql.codegen';
import toast from 'react-hot-toast';
import { Toast } from '@/components/base/toast/toast';
import { useStore } from '@/store/useStore';

export default function Explore() {
  const FirstEnter = useLocalStore((store) => store.ExploreEntered);
  const setExploreEntered = useLocalStore((store) => store.setExploreEntered);
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [start, setStart] = useState(false);
  const { filters } = useStore((store) => store);
  const history = useHistory();
  const [getUser] = useGetRandomUserLazyQuery();

  const [cards, setCards] = useState<RandomUser[]>([]);
  useEffect(() => {
    if (!FirstEnter) {
      setIsOpen(true);
      setExploreEntered();
    }
  }, [FirstEnter]);
  useEffect(() => {
    getUser({
      variables: {
        age: filters.age,
        languages: filters.language,
        mySpecialty: filters.specialty,
        province: filters.provinces,
        travelInterests: filters.interest,
      },
      onCompleted: (data) => {
        console.log(data.getRandomUser);
        // @ts-expect-error the
        setCards(data.getRandomUser);
      },
      onError: (err) => {
        toast.custom(<Toast type="error">{err.message}</Toast>);
      },
    });
  }, []);
  const handleSwipe = (id: string) => {
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
              history.push(paths.explore.filter);
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
                handleSwipe={handleSwipe}
                key={card.id}
                user={card}
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
            <Button
              className="h-12 w-full p-0"
              onClick={(e) => {
                e.stopPropagation();
                history.push(paths.explore.filter);
              }}
              type="button"
            >
              تغییر فیلترها
            </Button>
          </div>
        )}
      </div>
      <SearchTypeModal isOpen={isOpen} setIsOpen={setIsOpen}></SearchTypeModal>
      <SearchTypeSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      ></SearchTypeSidebar>
    </Page>
  );
}
