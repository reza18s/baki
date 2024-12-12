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
  useGetChatsQuery,
  useGetMeQuery,
  useGetRequestsQuery,
} from '@/graphql/generated/graphql.codegen';
import React, { useState } from 'react';
import CardImage from '../../assets/images/image.png';
import CountdownCircle from '@/components/ui/countdownCircle';
import Button from '@/components/base/Button/Button';
const items = [
  { value: 'all', title: 'همه' },
  { value: 'random', title: 'تصادفی' },
  { value: 'baseOnInterest', title: 'علاقه‌مندی' },
  { value: 'famous', title: 'مشهور' },
];
const mainMenu = [
  {
    url: '',
    icon: <IcStar className="siz5"></IcStar>,
    title: 'لیست علاقه‌مندی‌ها',
  },
  {
    url: '',
    icon: <IcUserBlackList className="siz5"></IcUserBlackList>,
    title: 'لیست سیاه',
  },
];
export const Chat = () => {
  const [filter, setFilter] = useState('all');
  const { data: requests } = useGetRequestsQuery();
  const { data: chats } = useGetChatsQuery();
  const { data: me } = useGetMeQuery({
    onError(err) {
      if (err.message == 'Failed to fetch') {
        return;
      }
    },
  });
  console.log(chats?.getChats);
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
                    {val.icon}
                    <h1 className="text-sm">{val.title}</h1>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="scrollbar-hide flex items-center gap-2 overflow-scroll pl-2">
            {items.map((val, i) => (
              <div
                key={i}
                className={`${filter === val.value ? 'border border-brand-yellow bg-brand-yellow fill-brand-black text-brand-black' : 'border border-gray-300 text-gray-500'} flex h-7 items-center rounded-lg px-4 text-sm font-bold transition-all duration-300 ease-in-out`} // اضافه کردن transition
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
                <img src={CardImage}></img>
              </div>
              <CountdownCircle startDate={req.createdAt}></CountdownCircle>
            </div>
          ))}
        </div>
      </div>{' '}
      <div className="flex flex-col gap-4 pt-4">
        <h1 className="text-base font-bold">مخاطبین</h1>
        <div className="flex w-full flex-col items-center">
          {chats?.getChats.map((chat) => {
            const user = chat.participants?.find(
              (el) => el?.id !== me?.getMe?.id,
            );
            return (
              <div className="flex w-full gap-2" key={chat.id}>
                <div className="relative">
                  <div className="aspect-square size-12 overflow-hidden rounded-full">
                    <img src={CardImage}></img>
                  </div>
                  <div
                    className={`absolute bottom-3 left-0 size-[14px] rounded-full border-[2.5px] border-white ${false ? 'bg-brand-green' : 'bg-gray-400'}`}
                  ></div>
                </div>
                <div className="flex h-16 flex-1 items-center justify-between gap-2 border-b border-gray-100 pb-2">
                  <div>
                    <h2 className="text-[14px] font-medium">{user?.name}</h2>
                    <span className="text-[10px] text-gray-400">
                      {chat.Message?.length}
                    </span>
                  </div>
                  <Button
                    className="flex h-8 items-center px-4"
                    rounded=" rounded-lg"
                  >
                    مشاهده
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Page>
  );
};
