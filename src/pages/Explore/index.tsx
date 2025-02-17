import ExploreCard from '../../components/Explore/exploreCard';
import BakiLogo from '../../assets/img/Explore/BakiLogo.svg';
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
  useGetMeQuery,
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
import { RenderPlanLimitMessage } from '@/components/Explore/renderPlanLimitMessage';
import { isNotToday } from '@/utils/datetime';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IcCrownStar } from '@/components/icons/IcCrownStar';
import { IcStars } from '@/components/icons/IcStars';
import { IcExclamationMarkInCircle } from '@/components/icons/IcExclamationMarkInCircle';
import { IcNoImage } from '@/components/icons/IcNoImage';

export default function Explore() {
  const history = useIonRouter();
  const queryParams = new URLSearchParams(history.routeInfo.search);
  const FirstEnter = useLocalStore((store) => store.firstEntered);
  const updateFirstEntered = useLocalStore((store) => store.updateFirstEntered);
  const [isOpen, setIsOpen] = useState<
    | 'searchType'
    | 'swipe'
    | 'swipe-left'
    | 'swipe-right'
    | 'no-image'
    | 'new-plan'
    | 'extend-plan'
    | 'failed-plan'
  >();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [start, setStart] = useState(false);
  const [cardsHistory, setCardsHistory] = useState<RandomUser[]>([]);
  const [cards, setCards] = useState<RandomUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { filters, searchType, searchStart, setSearchStart } = useStore(
    (store) => store,
  );
  const { data: me, refetch: refetchMe } = useGetMeQuery();
  const planUse: { [key: string]: number } =
    me?.getMe.planUse?.updateAt &&
    !isNotToday(new Date(me?.getMe.planUse.updateAt))
      ? me?.getMe.planUse
      : {
          random: 0,
          baseOnInterest: 0,
          famous: 0,
        };
  const [__, { refetch }] = useGetRandomUserLazyQuery({
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
      setLoading(false);
    },

    onError: (err) => {
      setLoading(false);
      //@ts-expect-error the
      if (err.graphQLErrors[0].code === 'PLAN_LIMIT') {
        refetchMe();
      } else {
        customToast('همسفری پیدا نشد', 'error');
      }
    },
  });
  const randomRefetch = () => {
    if (
      me?.getMe.plan ||
      (searchType === 'random' && 3 > (planUse?.random || 0)) ||
      (searchType === 'baseOnInterest' && 1 > (planUse?.baseOnInterest || 0)) ||
      (searchType === 'famous' && 1 > (planUse?.famous || 0))
    ) {
      setLoading(true);
      return refetch({
        searchType: searchType,
        age: filters.age,
        languages: filters.language,
        mySpecialty: filters.mySpecialty,
        province: filters.provinces,
        travelInterests: filters.interest,
      }).catch((err) => {
        setLoading(false);
      });
    }
  };
  const [Like] = useLikeMutation();
  useEffect(() => {
    if (me?.getMe) {
      const pay = queryParams.get('pay');
      if (pay === 'success' && me.getMe.plan) {
        setIsOpen('new-plan');
      } else if (pay === 'failed') {
        setIsOpen('failed-plan');
      }
      const newUrl = `${history.routeInfo.pathname}?${queryParams.toString()}`;
      history.push(newUrl, 'forward', 'replace');
    }
  }, [queryParams.get('pay'), me?.getMe]);
  useEffect(() => {
    if (!FirstEnter.showSearchType) {
      setIsOpen('searchType');
      updateFirstEntered({ showSearchType: true });
    } else if (
      (!FirstEnter.noImage.lastShow ||
        new Date().getTime() - new Date(FirstEnter.noImage.lastShow).getTime() >
          1000 * 60 * 60) &&
      (!me?.getMe.mainImage || !me?.getMe.images || me.getMe.images.length < 3)
    ) {
      setIsOpen('no-image');
    }
  }, [FirstEnter]);
  useEffect(() => {
    if (start) {
      randomRefetch();
    }
  }, [filters]);
  useEffect(() => {
    setTimeout(() => {
      if (start && cards.length <= 1) {
        randomRefetch()?.then((data) => {
          const newResult = [
            ...(data?.data?.getRandomUser as RandomUser[]),
            ...cards,
          ].filter(
            (item, index, self) =>
              index === self.findIndex((t) => t?.id === item?.id),
          );
          setCards(newResult);
          setLoading(false);
        });
      }
    }, 200);
  }, [cards]);
  useEffect(() => {
    if (searchStart) {
      setStart(searchStart);
      setCards([]);
      randomRefetch();
      setSearchStart(false);
    }
  }, [searchStart]);
  console.log(planUse);
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
        {cards.length === 0 ? (
          !me?.getMe.plan &&
          searchType === 'random' &&
          (planUse?.random || 0) >= 3 ? (
            <RenderPlanLimitMessage
              searchType={searchType}
            ></RenderPlanLimitMessage>
          ) : !me?.getMe.plan &&
            searchType === 'baseOnInterest' &&
            (planUse?.baseOnInterest || 0) >= 1 ? (
            <RenderPlanLimitMessage
              searchType={searchType}
            ></RenderPlanLimitMessage>
          ) : !me?.getMe.plan &&
            searchType === 'famous' &&
            (planUse?.famous || 0) >= 1 ? (
            <RenderPlanLimitMessage
              searchType={searchType}
            ></RenderPlanLimitMessage>
          ) : !start ? (
            <div
              className="size-full bg-warning-50 p-4"
              onClick={() => {
                setStart(true);
                randomRefetch();
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
          ) : loading ? (
            <div
              className="size-full bg-warning-50 p-4"
              onClick={() => setStart(true)}
            >
              <div className="text flex h-[90%] flex-col items-center justify-center gap-4 text-base font-bold text-black">
                <CircleSpinner></CircleSpinner>در حال پیدا کردن همسفر...
              </div>
            </div>
          ) : (
            <div
              className="size-full bg-warning-50 p-4"
              onClick={() => setStart(true)}
            >
              <div className="text flex h-[90%] flex-col items-center justify-center text-sm font-bold text-black">
                <IcFilterNotFound className="mb-4"></IcFilterNotFound>همسفری
                پیدا نشد!
                <span className="mb-1 mt-4 text-[10px] font-normal text-gray-500">
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
          )
        ) : start ? (
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
        ) : (
          <div
            className="size-full bg-warning-50 p-4"
            onClick={() => {
              setStart(true);
              randomRefetch();
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
          randomRefetch();
        }}
      ></SearchTypeModal>
      <SearchTypeSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        changeHandler={() => {
          setStart(false);
          setCards([]);
        }}
      ></SearchTypeSidebar>
      <Modal
        isOpen={isOpen === 'swipe-right'}
        onRequestClose={() => setIsOpen(undefined)}
        onCloseEnd={() => setIsOpen(undefined)}
        className="flex w-[70%] flex-col gap-3 rounded-3xl bg-white px-5 py-3"
      >
        <div className="flex flex-col gap-2 text-lg font-bold">
          خوشتون اومد؟
          <span className="text-sm font-medium text-gray-500">
            کشیدن پروفایل همسفر به سمت راست به معنای علاقه به ایجاد ارتباط
            می‌باشد.
          </span>
        </div>
        <div className="mt-3 flex justify-end gap-2">
          <Button
            className="h-7 w-16 border-black p-0 font-iransans font-medium"
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
            className="h-y w-16 rounded-lg border-red-500 p-0 font-iransans font-medium text-red-500"
            onClick={() => {
              setIsOpen(undefined);
              updateFirstEntered({ swapRight: true });
              handelUndo();
            }}
          >
            بازگشت
          </Button>
        </div>
      </Modal>
      <Modal
        isOpen={isOpen === 'swipe-left'}
        onRequestClose={() => setIsOpen(undefined)}
        onCloseEnd={() => setIsOpen(undefined)}
        className="flex w-[70%] flex-col gap-3 rounded-3xl bg-white px-5 py-3"
      >
        <div className="flex flex-col gap-2 text-lg font-bold">
          خوشتون نیومد؟
          <span className="text-sm font-medium text-gray-500">
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
              updateFirstEntered({ swapLeft: true });
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
              updateFirstEntered({ swapLeft: true });
              handelUndo();
            }}
          >
            بازگشت
          </Button>
        </div>
      </Modal>
      <Modal
        isOpen={isOpen === 'new-plan'}
        positionY="end"
        onRequestClose={() => setIsOpen(undefined)}
        className="mb-6 flex w-[85%] flex-col items-center gap-4 rounded-3xl bg-brand-yellow px-6 py-4"
      >
        <div className="relative rounded-full bg-white p-1">
          <Avatar className="size-[78px]">
            <AvatarImage
              src={me?.getMe?.mainImage || ''}
              className="object-cover"
            />
            <AvatarFallback className="3xl">
              {me?.getMe.name?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 flex size-6 items-center justify-center rounded-full bg-white">
            <IcCrownStar className="size-4 fill-brand-black"></IcCrownStar>
          </div>{' '}
          <div className="absolute -left-5 bottom-0 flex">
            <IcStars className="size-7 -rotate-12"></IcStars>
          </div>
          <div className="absolute -left-5 top-0 flex opacity-50">
            <IcStars className="size-7"></IcStars>
          </div>
          <div className="absolute -right-5 top-[5px] flex rotate-12">
            <IcStars className="size-8"></IcStars>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-center text-lg font-bold">
          به خانواده ویژه باکی خوش اومدین!
          <span className="text-sm font-medium">
            باکی فقط یه اپلیکیشن نیست، یه همراه همیشگی برای سفرهای توئه!
            <br></br>و از حالا به بعد بهتر می‌تونی برنامه سفر بچینی.
          </span>
        </div>
        <Button
          variant="white"
          className="h-10 w-full"
          onClick={() => {
            setIsOpen('extend-plan');
          }}
        >
          متوجه شدم!
        </Button>
      </Modal>
      <Modal
        isOpen={isOpen === 'extend-plan'}
        positionY="end"
        onRequestClose={() => setIsOpen(undefined)}
        className="mb-6 flex w-[85%] flex-col items-center gap-4 rounded-3xl bg-brand-yellow px-6 py-4"
      >
        <div className="relative rounded-full bg-white p-1">
          <Avatar className="size-[78px]">
            <AvatarImage
              src={me?.getMe?.mainImage || ''}
              className="object-cover"
            />
            <AvatarFallback className="3xl">
              {me?.getMe.name?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 flex size-6 items-center justify-center rounded-full bg-white">
            <IcCrownStar className="size-4 fill-brand-black"></IcCrownStar>
          </div>{' '}
          <div className="absolute -left-5 bottom-0 flex">
            <IcStars className="size-7 -rotate-12"></IcStars>
          </div>
          <div className="absolute -left-5 top-0 flex opacity-50">
            <IcStars className="size-7"></IcStars>
          </div>
          <div className="absolute -right-5 top-[5px] flex rotate-12">
            <IcStars className="size-8"></IcStars>
          </div>
        </div>

        <h1 className="flex flex-col gap-4 text-center text-lg font-bold">
          اشتراک شما با موفقیت تمدید شد!
        </h1>
        <div className="flex w-full gap-2">
          <Button
            variant="white"
            className="h-10 w-full"
            onClick={() => {
              setIsOpen(undefined);
              history.push(paths.main.explore, 'forward', 'replace');
            }}
          >
            رفتن به صفحه اصلی
          </Button>{' '}
          <Button
            variant="outline"
            className="h-10 w-full border-black"
            onClick={() => {
              setIsOpen(undefined);
            }}
          >
            بستن
          </Button>
        </div>
      </Modal>
      <Modal
        className="flex w-[85%] flex-col items-center justify-center gap-4 rounded-3xl bg-white px-6 py-4"
        isOpen={isOpen === 'failed-plan'}
        onRequestClose={() => setIsOpen(undefined)}
      >
        <div className="flex items-center justify-center rounded-full bg-brand-red p-4">
          <IcExclamationMarkInCircle className="size-8 fill-white"></IcExclamationMarkInCircle>
        </div>

        <h1 className="text-center text-lg font-bold">پرداخت ناموفق</h1>
        <span className="text-center text-sm text-gray-500">
          درصورتی که مبلغ از حساب شما کسر شده است به پشتیبانی اطلاع دهید.
        </span>
        <div className="flex w-full flex-col gap-2">
          <Button
            className="h-10 w-full"
            onClick={() => {
              history.push(paths.settings.support, 'forward', 'replace');
            }}
          >
            ارتباط با پشتیبانی
          </Button>
          <Button
            variant="outline"
            className="h-10 w-full border-black"
            onClick={() => setIsOpen(undefined)}
          >
            بازگشت
          </Button>
        </div>
      </Modal>
      <Modal
        className="flex w-[85%] flex-col items-center justify-center gap-4 rounded-3xl bg-white px-6 py-4"
        isOpen={isOpen === 'no-image'}
        onRequestClose={() => {
          if (
            FirstEnter.noImage?.time <= 3 ||
            FirstEnter.noImage?.id !== me?.getMe.id
          ) {
            updateFirstEntered((prev) => ({
              noImage: {
                time:
                  prev.noImage.id === me?.getMe.id ? prev.noImage.time + 1 : 1,
                id: me?.getMe.id,
                lastShow: new Date().toISOString(),
              },
            }));
            setIsOpen(undefined);
          }
        }}
      >
        <div className="flex items-center justify-center rounded-full bg-brand-yellow p-4">
          <IcNoImage className="size-8"></IcNoImage>
        </div>

        <h1 className="text-center text-lg font-bold">
          هنوز تصویری آپلود نکردی؟
        </h1>
        <span className="text-center text-sm font-medium text-gray-500">
          داشتن تصویر پروفایل باعث پیدا شدن همسفرهای بیشتری میشه!
        </span>
        <div className="flex w-full gap-2">
          <Button
            className="h-10 w-full"
            onClick={() => {
              history.push(paths.profile.completePictures);
            }}
          >
            آپلود تصویر
          </Button>
          <Button
            variant="outline"
            className="h-10 w-full border-[1.5px] border-black"
            onClick={() => {
              if (!FirstEnter.noImage) {
                updateFirstEntered(() => ({
                  noImage: {
                    time: 0,
                    id: me?.getMe.id,
                    lastShow: new Date().toISOString(),
                  },
                }));
              }
              if (
                FirstEnter.noImage?.time <= 3 ||
                FirstEnter.noImage?.id !== me?.getMe.id
              ) {
                updateFirstEntered((prev) => ({
                  noImage: {
                    time:
                      prev.noImage.id === me?.getMe.id
                        ? prev.noImage.time + 1
                        : 1,
                    id: me?.getMe.id,
                    lastShow: new Date().toISOString(),
                  },
                }));
                setIsOpen(undefined);
              }
            }}
          >
            بازگشت
          </Button>
        </div>
      </Modal>
    </Page>
  );
}
