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
import { paths } from '@/routes/paths';
import {
  RandomUser,
  useGetRandomUserLazyQuery,
  useLikeMutation,
} from '@/graphql/generated/graphql.codegen';
import { useStore } from '@/store/useStore';
import { CircleSpinner } from '@/components/base/Loader/Loader';
import { IcFilterNotFound } from '@/components/icons/IcFilterNotFound';
import Modal from '@/components/base/Modal/Modal';
import { customToast } from '@/components/base/toast';
import { IcSwapLeft } from '@/components/icons/IcSwapLeft';
import { IcSwapRight } from '@/components/icons/IcSwapRight';
import { IcHamburgerMenu } from '@/components/icons/IcHamburgerMenu';
import { IcUndo } from '@/components/icons/IcUndo';
import { IcTuning2 } from '@/components/icons/IcTuning2';
import { useIonRouter } from '@ionic/react';

export default function Explore() {
  const history = useIonRouter();
  const FirstEnter = useLocalStore((store) => store.firstEntered);
  const updateFirstEntered = useLocalStore((store) => store.updateFirstEntered);
  const [isOpen, setIsOpen] = useState<
    'searchType' | 'swipe' | 'swipe-left' | 'swipe-right'
  >();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [start, setStart] = useState(false);
  const [cardsHistory, setCardsHistory] = useState<RandomUser[]>([]);
  const [cards, setCards] = useState<RandomUser[]>([]);
  const { filters, searchType, searchStart, setSearchStart } = useStore(
    (store) => store,
  );
  const [getUser, { loading, refetch }] = useGetRandomUserLazyQuery({
    variables: {
      searchType: searchType,
      age: filters.age,
      languages: filters.language,
      mySpecialty: filters.mySpecialty,
      province: filters.provinces,
      travelInterests: filters.interest,
    },
    onCompleted: (data) => {
      setCards(
        data.getRandomUser?.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t?.id === item?.id),
        ) as RandomUser[],
      );
      setNoResult(data.getRandomUser?.length === 0);
    },

    onError: (err) => {
      customToast(err.message, 'error');
    },
  });
  const [Like] = useLikeMutation();

  useEffect(() => {
    if (!FirstEnter.showSearchType) {
      setIsOpen('searchType');
      updateFirstEntered({ showSearchType: true });
    }
  }, [FirstEnter]);
  useEffect(() => {
    if (start) {
      refetch();
    }
  }, [filters]);
  useEffect(() => {
    setTimeout(() => {
      if (start && cards.length <= 1) {
        refetch().then(({ data }) => {
          setCards((prev) =>
            [...(data.getRandomUser as RandomUser[]), ...prev].filter(
              (item, index, self) =>
                index === self.findIndex((t) => t?.id === item?.id),
            ),
          );
          setNoResult(data.getRandomUser?.length === 0);
        });
      }
    }, 200);
  }, [cards]);
  useEffect(() => {
    if (searchStart) {
      setStart(searchStart);
      setCards([]);
      refetch();
      setSearchStart(false);
    }
  }, [searchStart]);
  const handleSwipe = (id: string, direction: 'left' | 'right') => {
    if (direction === 'right') {
      if (!FirstEnter.swapRight) {
        setIsOpen('swipe-right');
      }
      Like({ variables: { likedUserId: id, searchType: searchType } });
    } else if (!FirstEnter.swapLeft) {
      setIsOpen('swipe-left');
    }
    setCardsHistory((prev) => [
      cards.find((card) => card.id === id)!,
      ...prev.filter((card) => id !== card.id),
    ]);
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };
  const handelUndo = () => {
    if (cardsHistory[0]) {
      setCards((prev) => {
        return [
          ...prev.filter((user) => user.id !== cardsHistory[0]?.id),
          cardsHistory[0],
        ].filter((e) => e);
      });
      setCardsHistory((prev) => prev.slice(1));
    }
  };
  return (
    <Page
      className="pb-14"
      contentClassName="h-[calc(100%)]"
      scrollY={false}
      header={
        <div className="relative flex h-12 w-full items-center justify-between p-3 px-6">
          <div className="flex gap-2">
            <IcHamburgerMenu
              onClick={() => {
                setIsSidebarOpen(true);
              }}
            />
            {cardsHistory.length > 0 && (
              <IcUndo
                onClick={() => {
                  handelUndo();
                }}
              ></IcUndo>
            )}
          </div>
          <img
            className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
            src={BakiLogo}
            alt="BakiLogo"
          />
          <IcTuning2
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
            <>
              {isOpen === 'swipe' && (
                <div
                  className="absolute z-[10] h-[calc(100%-16px)] w-[calc(100%-32px)] bg-white/70"
                  onClick={() => setIsOpen(undefined)}
                >
                  <div className="flex h-full w-full items-center justify-center gap-24">
                    <IcSwapRight></IcSwapRight>
                    <IcSwapLeft></IcSwapLeft>
                  </div>
                </div>
              )}
              <AnimatePresence>
                {cards.map((card, index) => (
                  <ExploreCard
                    key={card?.id}
                    inView={index == cards.length - 1}
                    handleSwipe={handleSwipe}
                    user={card}
                    searchMethod="تصادفی"
                  />
                ))}
              </AnimatePresence>
            </>
          )
        ) : (
          <div
            className="size-full bg-warning-50 p-4"
            onClick={() => {
              setStart(true);
              refetch();
            }}
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
        setClose={() => {
          setIsOpen('swipe');
          setStart(true);
          refetch();
        }}
      ></SearchTypeModal>
      <SearchTypeSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      ></SearchTypeSidebar>
      <Modal
        isOpen={isOpen === 'swipe-right'}
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
            className="h-7 w-16 border-black p-0 font-iransans"
            rounded="rounded-lg"
            onClick={() => {
              setIsOpen(undefined);
              updateFirstEntered({ swapRight: true });
            }}
          >
            درسته!
          </Button>
          <Button
            variant="outline"
            rounded="rounded-lg"
            className="h-y w-16 rounded-lg border-red-500 p-0 font-iransans text-red-500"
            onClick={() => {
              setIsOpen(undefined);
              updateFirstEntered({ swapRight: true });
              handelUndo();
            }}
          >
            بازگشت
          </Button>
        </div>
      </Modal>{' '}
      <Modal
        isOpen={isOpen === 'swipe-left'}
        onRequestClose={() => setIsOpen(undefined)}
        onCloseEnd={() => setIsOpen(undefined)}
        className="flex w-[70%] flex-col gap-3 rounded-3xl bg-white px-5 py-3"
      >
        <div className="flex flex-col gap-2 text-lg font-bold">
          خوشتون نیومد؟
          <span className="text-sm text-gray-500">
            کشیدن پروفایل همسفر به سمت چپ به معنای عدم علاقه به ایجاد ارتباط
            می‌باشد.
          </span>
        </div>
        <div className="mt-3 flex justify-end gap-2">
          <Button
            className="h-7 w-16 border-black p-0"
            rounded="rounded-lg"
            onClick={() => {
              setIsOpen(undefined);
            }}
          >
            درسته!
          </Button>
          <Button
            variant="outline"
            rounded="rounded-lg"
            className="h-y w-16 rounded-lg border-red-500 p-0 text-red-500"
            onClick={() => {
              setIsOpen(undefined);
              handelUndo();
            }}
          >
            بازگشت
          </Button>
        </div>
      </Modal>
    </Page>
  );
}
