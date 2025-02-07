import Button from '@/components/base/Button/Button';
import { Contact } from '@/components/chat/contact';
import { IcStar } from '@/components/icons/IcStar';
import { IcXCircle } from '@/components/icons/IcXCircle';
import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import {
  Chat,
  useGetFavoriteQuery,
  useGetMeQuery,
  User,
} from '@/graphql/generated/graphql.codegen';
import { paths } from '@/routes/paths';
import React, { useState } from 'react';

export const Favorite = () => {
  const [selects, setSelects] = useState<Chat[]>([]);
  const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isHold, setIsHold] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const { data, loading } = useGetFavoriteQuery();
  const hs = useIonRouter();

  const { data: me } = useGetMeQuery({
    onError(err) {
      if (err.message === 'Failed to fetch') {
        return;
      }
    },
  });

  const toggleSelect = (chat: Chat) => {
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

  const handleMouseDown = (chat: Chat) => {
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
      header={
        selects.length === 0 ? (
          <AppBar title="علاقه‌مندی‌ها"></AppBar>
        ) : (
          <div className="flex w-full items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2 text-lg">
              <IcXCircle className="size-5 stroke-black"></IcXCircle>
              {selects.length}
            </div>
            <Button variant="text" className="py-2 text-brand-red">
              حذف از علاقه مندی ها
            </Button>
          </div>
        )
      }
      contentClassName="p-6 pt-20 bg-gray-50 min-h-full h-full"
      isLoading={loading}
    >
      {(data?.getFavorite.chats?.length || 0) > 0 ? (
        <div
          className="flex flex-col rounded-xl border border-gray-300 bg-white px-3 py-2"
          onTouchMove={handleTouchMove}
        >
          {data?.getFavorite.chats?.map((chat) => (
            <Contact
              key={chat?.id}
              className="flex w-full items-center gap-2 transition-all duration-300 ease-in-out active:bg-gray-100"
              chat={chat as Chat}
              me={me?.getMe as User}
              onClick={
                selects.length > 0
                  ? () => !isHold && toggleSelect(chat as Chat)
                  : () => {
                      if (chat?.participants?.[0]?.id) {
                        hs.push(
                          paths.chat.contact.exactPath(
                            chat.participants[0]!.id,
                          ),
                        );
                      }
                    }
              }
              onTouchStart={() => handleMouseDown(chat as Chat)}
              onTouchEnd={handleMouseUpOrLeave}
              onMouseDown={() => handleMouseDown(chat as Chat)}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              checked={selects.some(
                (selectedChat) => selectedChat.id === chat?.id,
              )}
              hideChecked={selects.length <= 0}
            ></Contact>
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-full bg-brand-yellow">
            <IcStar className="size-8"></IcStar>
          </div>
          <h1 className="text-center text-base font-bold">
            هنوز کسی رو اضافه نکردی!
          </h1>
          <span className="text-center text-sm text-gray-500">
            با نگه داشتن روی مخاطبانت میتونی اون‌هارو به لیست علاقه‌مندی‌ها
            اضافه کنی.
          </span>
        </div>
      )}
    </Page>
  );
};
