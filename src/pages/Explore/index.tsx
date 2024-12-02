import ExploreCard from '../../components/Explore/exploreCard';
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
  useAddToFavoriteMutation,
  useGetRandomUserLazyQuery,
} from '@/graphql/generated/graphql.codegen';
import { useStore } from '@/store/useStore';
import { CircleSpinner } from '@/components/base/Loader/Loader';
import { IcFilterNotFound } from '@/components/icons/IcFilterNotFound';
import Modal from '@/components/base/Modal/Modal';
import { customToast } from '@/components/base/toast';

export default function Explore() {
  const FirstEnter = useLocalStore((store) => store.ExploreEntered);
  const setExploreEntered = useLocalStore((store) => store.setExploreEntered);
  const [isOpen, setIsOpen] = useState<'searchType' | 'swipe'>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [start, setStart] = useState(false);
  const { filters, searchType } = useStore((store) => store);
  const history = useHistory();
  const [getUser, { loading }] = useGetRandomUserLazyQuery();
  const [addToFavorite] = useAddToFavoriteMutation();

  const [cards, setCards] = useState<RandomUser[]>([]);
  useEffect(() => {
    if (!FirstEnter) {
      setIsOpen('searchType');
      setExploreEntered();
    }
  }, [FirstEnter]);
  useEffect(() => {
    if (start) {
      getUser({
        variables: {
          age: filters.age,
          languages: filters.language,
          mySpecialty: filters.mySpecialty,
          province: filters.provinces,
          travelInterests: filters.interest,
        },
        onCompleted: (data) => {
          // @ts-expect-error the
          setCards(data.getRandomUser);
          setNoResult(data.getRandomUser?.length === 0);
        },
        onError: () => {
          customToast('کاربر موجود نیست', 'error');
        },
      });
    }
  }, [start, filters]);
  const handleSwipe = (id: string, direction: 'left' | 'right') => {
    if (direction === 'right') {
      addToFavorite({ variables: { favoriteId: id, searchType: searchType } });
    }
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };
  return (
    <Page
      className="pb-14"
      contentClassName="h-[calc(100%)]"
      scrollY={false}
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
      <div className="relative flex h-full w-full flex-row-reverse p-4">
        {start ? (
          loading ? (
            <div
              className="size-full bg-warning-50 p-4"
              onClick={() => setStart(true)}
            >
              <div className="text flex h-[90%] flex-col items-center justify-center gap-4 text-base font-bold text-black">
                <CircleSpinner></CircleSpinner>در حال پیدا کردن همسفر...
              </div>
            </div>
          ) : noResult ? (
            <div
              className="size-full bg-warning-50 p-4"
              onClick={() => setStart(true)}
            >
              <div className="text flex h-[90%] flex-col items-center justify-center text-sm font-bold text-black">
                <IcFilterNotFound className="mb-4"></IcFilterNotFound>همسفری
                پیدا نشد!
                <span className="mb-2 mt-8 text-[10px]">
                  با کمتر کردن فیلترها می‌توانید همسفرهای بیشتری رو پیدا کنید!
                </span>
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
            </div>
          ) : (
            <AnimatePresence>
              {cards.map((card, index) => (
                <ExploreCard
                  key={card.id}
                  inView={index == cards.length - 1}
                  handleSwipe={handleSwipe}
                  user={card}
                  searchMethod="تصادفی"
                />
              ))}
            </AnimatePresence>
          )
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
      <SearchTypeModal
        isOpen={isOpen === 'searchType'}
        setClose={() => setIsOpen(undefined)}
      ></SearchTypeModal>
      <SearchTypeSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      ></SearchTypeSidebar>
      <Modal
        isOpen={isOpen === 'swipe'}
        onRequestClose={() => setIsOpen(undefined)}
        onCloseEnd={() => setIsOpen(undefined)}
        className="flex w-[70%] flex-col gap-3 rounded-3xl bg-white px-5 py-3"
      >
        <div className="flex flex-col gap-2 text-lg font-bold">
          خوشتون اومد؟
          <span className="text-sm text-gray-500">
            کشیدن پروفایل همسفر به سمت راست به معنای علاقه به ایجاد ارتباط
            می‌باشد.
          </span>
        </div>
        <div className="mt-3 flex justify-end gap-2">
          <Button
            className="h-7 w-16 border-black p-0"
            rounded="rounded-lg"
            onClick={() => setIsOpen(undefined)}
          >
            درسته!
          </Button>
          <Button
            variant="outline"
            rounded="rounded-lg"
            className="h-y w-16 rounded-lg border-red-500 p-0 text-red-500"
            onClick={() => history.goBack()}
          >
            بازگشت
          </Button>
        </div>
      </Modal>
    </Page>
  );
}
