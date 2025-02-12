import React, { useEffect, useState } from 'react';
import { Page } from '@/components/layout/Page';
import {
  Chat as IChat,
  useGetChatsQuery,
  useGetFavoriteQuery,
  useGetMeQuery,
  useGetRequestsQuery,
  User,
} from '@/graphql/generated/graphql.codegen';
import CountdownCircle from '@/components/ui/countdownCircle';
import { Contact } from '@/components/chat/contact';
import { ChatHeader } from '@/components/chat/chatHeader';
import { IcUserGroup } from '@/components/icons/IcUserGroup';
import { CircleSpinner } from '@/components/base/Loader/Loader';
import { paths } from '@/routes/paths';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIonRouter } from '@ionic/react';
import { IcTuning2 } from '@/components/icons/IcTuning2';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Checkbox from '@/components/base/Input/checkboxSection/checkbox';
const chatFilterItem = [
  { label: 'همه', key: 'all' },
  { label: 'جدید', key: 'new' },
  { label: 'خوانده نشده', key: 'notRead' },
  { label: 'علاقه مندی', key: 'favorite' },
  { label: 'انلاین', key: 'online' },
];
export const Chat = () => {
  const [filter, setFilter] = useState('all');
  const [chatsFilter, setChatsFilter] = useState<{
    new: boolean;
    online: boolean;
    favorite: boolean;
    notRead: boolean;
  }>({
    new: false,
    online: false,
    favorite: false,
    notRead: false,
  });
  const [selects, setSelects] = useState<IChat[]>([]);
  const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isHold, setIsHold] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const hs = useIonRouter();

  const { data: requests } = useGetRequestsQuery();
  const { data: chats, loading: contactLoading } = useGetChatsQuery();
  const { data: favorites, loading } = useGetFavoriteQuery();
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
    setIsScrolling(false);
    const timeout = setTimeout(() => {
      setIsHold(true);
      if (!isScrolling) {
        toggleSelect(chat);
      }
    }, 500); // 500ms for long press
    setHoldTimeout(timeout);
  };
  const handleTouchMove = () => {
    setIsScrolling(true);
    if (holdTimeout) {
      clearTimeout(holdTimeout);
      setHoldTimeout(null);
    }
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
        <ChatHeader
          clearSelect={() => setSelects([])}
          filter={filter}
          selects={selects}
          setFilter={setFilter}
        ></ChatHeader>
      }
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-base font-bold">درخواست‌های جدید</h1>
        <div className="flex h-fit max-w-full gap-2 overflow-scroll border-b pb-6">
          {(requests?.getRequests.filter((r) => {
            const chat = chats?.getChats.find((chat) =>
              chat.participants?.find((user) => user?.id === r.requesterId),
            );

            return (
              r.status !== 'accept' &&
              (!chat ||
                (chat?.Message?.filter(
                  (message) => message?.senderId === me?.getMe.id,
                ).length || 0) === 0)
            );
          }).length || 0) > 0 ? (
            <>
              {requests?.getRequests
                .filter((r) => r.status !== 'accept')
                .map((req) => (
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
                      <Avatar className="size-full">
                        <AvatarImage
                          src={req.requester?.mainImage || ''}
                          className="object-cover"
                        />
                        <AvatarFallback className="2xl">
                          {req.requester?.name?.[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <CountdownCircle
                      startDate={req.createdAt}
                    ></CountdownCircle>
                  </div>
                ))}
            </>
          ) : (
            <>
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className="border-d min-size-[74px] size-[74px] rounded-full border-2 border-dashed border-gray-300 text-transparent"
                >
                  kkkkkkkkkkkk
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {contactLoading ? (
        <div className="mt-10 flex justify-center">
          <CircleSpinner></CircleSpinner>
        </div>
      ) : (chats?.getChats.filter(
          (el) => filter === 'all' || el.searchType === filter,
        ).length || 0) > 0 ? (
        <div className="flex flex-col gap-4 pt-4">
          <div className="flex items-center justify-between">
            <h1 className="text-base font-bold">مخاطبین</h1>
            <Popover>
              <PopoverTrigger>
                <IcTuning2 />
              </PopoverTrigger>
              <PopoverContent className="ml-5 flex w-fit flex-col gap-2 divide-y rounded-xl p-4 pt-2">
                {chatFilterItem.map(({ key, label }) => (
                  <div
                    className="flex items-center gap-1 text-nowrap pt-2 text-xs"
                    key={key}
                    onClick={() => {
                      if (key !== 'all') {
                        setChatsFilter((prev) => ({
                          ...prev,
                          //@ts-expect-error the
                          [key]: !prev[key],
                        }));
                      } else {
                        setChatsFilter({
                          favorite: true,
                          new: true,
                          notRead: true,
                          online: true,
                        });
                      }
                    }}
                  >
                    <Checkbox
                      white
                      checked={
                        key === 'all'
                          ? Object.values(chatsFilter).every((val) => val) ||
                            Object.values(chatsFilter).every((val) => !val)
                          : //@ts-expect-error the
                            chatsFilter[key]
                      }
                      className="size-4 border border-brand-black text-xs"
                    ></Checkbox>
                    {label}
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </div>

          <div
            className="flex w-full flex-col items-center gap-1"
            onTouchMove={handleTouchMove}
          >
            {chats?.getChats
              .filter((el) => filter === 'all' || el.searchType === filter)
              .filter((chat) => {
                if (
                  Object.values(chatsFilter).every((val) => val) ||
                  Object.values(chatsFilter).every((val) => !val)
                ) {
                  return true;
                }
                const newChat =
                  new Date().getTime() - new Date(chat.createdAt).getTime() <
                  1000 * 60 * 60 * 24;
                const contact = chat.participants?.find(
                  (user) => user?.id !== me?.getMe.id,
                );
                if (
                  (chatsFilter.new && newChat) ||
                  (chatsFilter.favorite &&
                    favorites?.getFavorite.favorites?.map(
                      (f) => f?.favoriteUserId === contact?.id,
                    )) ||
                  (chatsFilter.notRead &&
                    chat.Message?.find(
                      (m) => m?.senderId === contact?.id && !m?.read,
                    )) ||
                  (chatsFilter.online && contact?.isOnline)
                ) {
                  return true;
                }
              })

              .map((chat) => (
                <Contact
                  key={chat.id}
                  onClick={
                    selects.length > 0
                      ? () => !isHold && toggleSelect(chat as IChat)
                      : () => {
                          const contactId = chat.participants?.filter(
                            (user) => user?.id !== me?.getMe.id,
                          )[0]?.id;
                          if (contactId) {
                            hs.push(paths.chat.contact.exactPath(contactId));
                          }
                        }
                  }
                  onTouchStart={() => handleMouseDown(chat as IChat)}
                  onTouchEnd={handleMouseUpOrLeave}
                  onMouseDown={() => handleMouseDown(chat as IChat)}
                  onMouseUp={handleMouseUpOrLeave}
                  onMouseLeave={handleMouseUpOrLeave}
                  checked={selects.some(
                    (selectedChat) => selectedChat.id === chat.id,
                  )}
                  hideChecked={selects.length <= 0}
                  className="flex w-full items-center gap-2 transition-all duration-300 ease-in-out active:bg-gray-100"
                  chat={chat as IChat}
                  me={me?.getMe as User}
                ></Contact>
              ))}
          </div>
        </div>
      ) : (
        <div className="mt-20 flex w-full flex-col items-center justify-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-full bg-brand-yellow">
            <IcUserGroup></IcUserGroup>
          </div>
          <h1 className="text-center text-base font-bold">
            مخاطبین شما اینجا نمایش داده می‌شود.
          </h1>
        </div>
      )}
    </Page>
  );
};
