import React, { useState } from 'react';
import { Page } from '@/components/layout/Page';
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
import { ChatHeader } from '@/components/chat/chatHeader';
import { IcUserGroup } from '@/components/icons/IcUserGroup';
import { CircleSpinner } from '@/components/base/Loader/Loader';

export const Chat = () => {
  const [filter, setFilter] = useState('all');
  const [selects, setSelects] = useState<IChat[]>([]);
  const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isHold, setIsHold] = useState(false);

  const { data: requests } = useGetRequestsQuery();
  const { data: chats, loading: contactLoading } = useGetChatsQuery();
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
          {(requests?.getRequests.length || 0) > 0 ? (
            <>
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
          <h1 className="text-base font-bold">مخاطبین</h1>
          <div className="flex w-full flex-col items-center gap-1">
            {chats?.getChats
              .filter((el) => filter === 'all' || el.searchType === filter)
              .map((chat) => (
                <Contact
                  key={chat.id}
                  onClick={
                    selects.length > 0
                      ? () => !isHold && toggleSelect(chat as IChat)
                      : () => {
                          console.log('lll');
                        }
                  }
                  onTouchStart={() => handleMouseDown(chat as IChat)}
                  onTouchEnd={handleMouseUpOrLeave}
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
