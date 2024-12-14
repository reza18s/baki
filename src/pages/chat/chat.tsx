import React, { useState } from 'react';
import { IcDotsMenu } from '@/components/icons/IcDotsMenu';
import { IcSearch } from '@/components/icons/IcSearch';
import { IcStar } from '@/components/icons/IcStar';
import { IcUserBlackList } from '@/components/icons/IcUserBlackList';
import { Page } from '@/components/layout/Page';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Chat as IChat,
  useGetChatsQuery,
  useGetMeQuery,
  useGetRequestsQuery,
  User,
} from '@/graphql/generated/graphql.codegen';
import CardImage from '../../assets/images/image.png';
import CountdownCircle from '@/components/ui/countdownCircle';
import { Contact } from '@/components/chat/contact';
import { Link } from 'react-router-dom';
import { paths } from '@/routes/paths';

const items = [
  { value: 'all', title: 'همه' },
  { value: 'random', title: 'تصادفی' },
  { value: 'baseOnInterest', title: 'علاقه‌مندی' },
  { value: 'famous', title: 'مشهور' },
];

const mainMenu = [
  {
    url: paths.favorite.main,
    icon: <IcStar className="siz5"></IcStar>,
    title: 'لیست علاقه‌مندی‌ها',
  },
  {
    url: paths.blocked.main,
    icon: <IcUserBlackList className="siz5"></IcUserBlackList>,
    title: 'لیست سیاه',
  },
];

export const Chat = () => {
  const [filter, setFilter] = useState('all');
  const [selects, setSelects] = useState<IChat[]>([]);
  const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isHold, setIsHold] = useState(false);

  const { data: requests } = useGetRequestsQuery();
  const { data: chats } = useGetChatsQuery();
  const { data: me } = useGetMeQuery({
    onError(err) {
      if (err.message === 'Failed to fetch') {
        return;
      }
    },
  });

  const toggleSelect = (chat: IChat) => {
    setSelects((prev) => {
      const isSelected = prev.some(
        (selectedChat) => selectedChat.id === chat.id,
      );
      if (isSelected) {
        // Remove chat if it's already in the array
        return prev.filter((selectedChat) => selectedChat.id !== chat.id);
      } else {
        // Add chat if it's not in the array
        return [...prev, chat];
      }
    });
  };

  const handleMouseDown = (chat: IChat) => {
    setIsHold(false);
    const timeout = setTimeout(() => {
      setIsHold(true);
      toggleSelect(chat);
    }, 500); // 500ms for long press
    setHoldTimeout(timeout);
  };

  const handleMouseUpOrLeave = () => {
    if (holdTimeout) {
      clearTimeout(holdTimeout);
      setHoldTimeout(null);
    }
  };

  return (
    <Page
      headerClassName="py-3 px-6 h-[88px]"
      contentClassName="h-full px-6 pb-20 pt-28 "
      header={
        <div className="flex w-full flex-col justify-center gap-3">
          <div className="flex w-full justify-between">
            <IcSearch className="size-6"></IcSearch>
            <h1 className="text-center text-lg font-bold">پیام‌ها</h1>
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger>
                <IcDotsMenu></IcDotsMenu>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="ml-6 divide-y rounded-xl px-3 py-1">
                {mainMenu.map((val) => (
                  <DropdownMenuItem
                    key={val.title}
                    className="flex items-center gap-2 p-0 py-2"
                  >
                    <Link to={val.url} className="flex w-full">
                      {val.icon}
                      <h1 className="text-sm">{val.title}</h1>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="scrollbar-hide flex items-center gap-2 overflow-scroll pl-2">
            {items.map((val, i) => (
              <div
                key={i}
                className={`${
                  filter === val.value
                    ? 'border border-brand-yellow bg-brand-yellow fill-brand-black text-brand-black'
                    : 'border border-gray-300 text-gray-500'
                } flex h-7 items-center rounded-lg px-4 text-sm font-bold transition-all duration-300 ease-in-out`}
                onClick={() => setFilter(val.value)}
              >
                {val.title}
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-base font-bold">درخواست‌های جدید</h1>
        <div className="flex h-fit w-full gap-2 overflow-x-scroll border-b pb-6">
          {requests?.getRequests.map((req) => (
            <div
              key={req.id}
              className="relative size-[75px] items-center justify-center rounded-full"
            >
              <div
                className="absolute size-16 overflow-hidden rounded-full"
                style={{
                  left: `calc(50%)`,
                  top: `calc(50%)`,
                  transform: 'translate(-50%,-50%)',
                }}
              >
                <img src={CardImage} alt="Card" />
              </div>
              <CountdownCircle startDate={req.createdAt}></CountdownCircle>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-4">
        <h1 className="text-base font-bold">مخاطبین</h1>
        <div className="flex w-full flex-col items-center gap-1">
          {chats?.getChats.map((chat) => (
            <Contact
              key={chat.id}
              onClick={
                selects.length > 0
                  ? () => !isHold && toggleSelect(chat as IChat)
                  : () => {
                      console.log('lll');
                    }
              }
              onMouseDown={() => handleMouseDown(chat as IChat)}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              className="flex w-full items-center gap-2 transition-all duration-300 ease-in-out active:bg-gray-100"
              checked={selects.some(
                (selectedChat) => selectedChat.id === chat.id,
              )}
              hideChecked={selects.length <= 0}
              chat={chat as IChat}
              me={me?.getMe as User}
            ></Contact>
          ))}
        </div>
      </div>
    </Page>
  );
};
