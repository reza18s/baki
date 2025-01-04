import {
  Message,
  useEditMessageMutation,
  useGetChatQuery,
  useGetUserQuery,
  useSendMessageMutation,
} from '@/graphql/generated/graphql.codegen';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import BgChat from '../../assets/images/bg-chat.png';
import { Page } from '@/components/layout/Page';
import { ContactBar } from '@/components/chat/contactBar';
import { Messages } from '@/components/chat/messages';
import Button from '@/components/base/Button/Button';
import { socket } from '@/graphql/apollo/socket';
import { IcSend } from '@/components/icons/IcSend';
import { IcMicrophone } from '@/components/icons/IcMicrophone';
import { IcFace } from '@/components/icons/IcFace';
import { IcChat } from '@/components/icons/IcChat';
import { IcPaperclip } from '@/components/icons/IcPaperclip';
import { IcXCircle } from '@/components/icons/IcXCircle';
import { IcReply } from '@/components/icons/IcReply';
import { IcPen } from '@/components/icons/IcPen';
import { useStore } from '@/store/useStore';
import { IcArrowLeft } from '@/components/icons/IcArrowLeft';
import { customToast } from '@/components/base/toast';

export const ContactPage = () => {
  const { id }: { id: string } = useParams();
  const chatContainerRef = useRef<HTMLIonContentElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const {
    isSearch,
    search,
    setSearches,
    searches,
    setSelectSearch,
    selectSearch,
  } = useStore((s) => s);
  const [selects, setSelects] = useState<Message[]>([]);
  const [reply, setReply] = useState<Message>();
  const [edit, setEdit] = useState<Message>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [once, setOnce] = useState(false);
  const { control, watch, handleSubmit, reset, setValue } = useForm<{
    message: string;
  }>();

  const { data: participant, loading } = useGetUserQuery({
    variables: { id: id },
    onError() {
      customToast('کاربر موجود نیست', 'error');
    },
  });
  const { data } = useGetChatQuery({
    variables: { participantId: id },
    onError(error) {
      console.log(error);
    },
  });
  const chat = data?.getChat;
  const [sendMessage] = useSendMessageMutation({
    client: socket,
  });
  const [editMessage] = useEditMessageMutation({
    client: socket,
  });

  useEffect(() => {
    if (isSearch && search.length) {
      const searches = messages
        .filter((el) => el.content.includes(search))
        .map((el) => el.id);
      setSearches(searches);
      setSelectSearch(searches[searches.length - 1]);
    }
  }, [search]);

  useEffect(() => {
    if (chat?.Message) {
      setMessages(chat.Message as Message[]);
    }
  }, [chat?.Message]);

  useEffect(() => {
    // Scroll to the bottom when messages are loaded
    if (chatContainerRef.current && messages.length > 0) {
      if (!once) {
        chatContainerRef.current.scrollToPoint(
          null,
          (chatContainerRef.current.children.item(1)?.clientHeight || 0) -
            chatContainerRef.current.clientHeight -
            100,
          0,
        );
        setOnce(true);
      }
      chatContainerRef.current.scrollToBottom(500);
    }
  }, [messages]);

  const handleInput = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      const lineHeight = parseInt(
        getComputedStyle(textarea).lineHeight || '20',
        10,
      );
      const maxHeight = lineHeight * 5;
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    }
  };
  useEffect(() => {
    if (watch('message')) {
      handleInput();
    }
  }, [watch('message')]);

  const toggleSelect = (message: Message) => {
    setSelects((prev) => {
      const isSelected = prev.some(
        (selectedChat) => selectedChat.id === message.id,
      );
      return isSelected
        ? prev.filter((selectedChat) => selectedChat.id !== message.id)
        : [...prev, message];
    });
  };

  const onSubmit = async (
    value: { message: string },
    action: 'send' | 'edit',
  ) => {
    if (!value.message.trim()) {
      return;
    }
    try {
      if (action == 'send') {
        await sendMessage({
          variables: {
            chatId: chat?.id,
            receiverId: participant?.getUser?.id,
            content: value.message,
            replyId: reply?.id,
          },
        });
        setReply(undefined);
      } else if (edit) {
        await editMessage({
          variables: {
            messageId: edit?.id,
            content: value.message,
          },
        });
        setEdit(undefined);
      }

      reset();
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <Page
      headerClassName="py-2 px-4"
      header={
        <ContactBar
          clearSelect={() => setSelects([])}
          selects={selects}
          //@ts-expect-error the
          contact={participant?.getUser}
          setEdit={(message) => {
            setReply(undefined);
            setEdit(message);
            setValue('message', message.content);
            setSelects([]);
          }}
          deleteMessages={(ids) => {
            setMessages((prev) => prev.filter((msg) => !ids.includes(msg.id)));
          }}
        />
      }
      contentClassName="min-h-full relative flex flex-col bg-transparent"
      scrollY
      ref={chatContainerRef}
      bgImage={BgChat}
    >
      <Messages
        setReply={(message) => {
          setEdit(undefined);
          setReply(message);
        }}
        messages={messages}
        selects={selects}
        toggleSelect={toggleSelect}
      />
      <div className="sticky bottom-0 w-screen bg-white px-3 py-[10px] transition-all duration-300 ease-in-out">
        {isSearch ? (
          <div className="flex w-full justify-between">
            <p>
              {`${searches.findIndex((el) => el === selectSearch) + 1} از
              ${searches.length}`}
            </p>
            <div className="flex gap-2">
              <IcArrowLeft
                className="rotate-90"
                onClick={() =>
                  setSelectSearch(
                    searches[
                      searches.findIndex((el) => el === selectSearch) - 1
                    ],
                  )
                }
              ></IcArrowLeft>
              <IcArrowLeft
                className="-rotate-90"
                onClick={() =>
                  setSelectSearch(
                    searches[
                      searches.findIndex((el) => el === selectSearch) + 1
                    ],
                  )
                }
              ></IcArrowLeft>
            </div>
          </div>
        ) : (
          <>
            {reply && (
              <div className="mb-4 flex w-full items-center gap-3 bg-white">
                <div className="flex flex-1 items-center rounded-lg bg-gray-100 px-3 py-2">
                  <div className="w-full">
                    <h1 className="truncate text-sm font-bold">
                      {reply.sender?.name}
                    </h1>
                    <div className="max-w-[70vw] overflow-hidden truncate text-xs text-gray-500">
                      {reply?.content}
                    </div>
                  </div>
                  <IcReply></IcReply>
                </div>
                <IcXCircle
                  onClick={() => setReply(undefined)}
                  className="stroke size-5 stroke-brand-black"
                ></IcXCircle>
              </div>
            )}
            {edit && (
              <div className="mb-4 flex w-full items-center gap-3 bg-white">
                <div className="flex flex-1 items-center rounded-lg bg-gray-100 px-3 py-2">
                  <div className="w-full">
                    <h1 className="truncate text-sm font-bold">
                      {edit.sender?.name}
                    </h1>
                    <div className="max-w-[70vw] overflow-hidden truncate text-xs text-gray-500">
                      {edit?.content}
                    </div>
                  </div>
                  <IcPen></IcPen>
                </div>
                <IcXCircle
                  onClick={() => setEdit(undefined)}
                  className="stroke size-5 stroke-brand-black"
                ></IcXCircle>
              </div>
            )}
            <form
              onSubmit={handleSubmit((val) =>
                edit ? onSubmit(val, 'edit') : onSubmit(val, 'send'),
              )}
            >
              <div className="flex items-end gap-3">
                {watch('message')?.trim().length > 0 ? (
                  <Button
                    variant="text"
                    type="submit"
                    className="mb-1 flex items-center justify-center p-0"
                  >
                    <IcSend />
                  </Button>
                ) : (
                  <IcMicrophone className="mb-1" />
                )}
                <Controller
                  name="message"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="flex flex-1 items-end justify-between rounded-lg bg-gray-50 px-2 py-[6px]">
                      <textarea
                        rows={1}
                        placeholder="پیام خود را یادداشت کنید"
                        onInput={handleInput}
                        className="flex-1 resize-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                        {...field}
                        ref={textareaRef}
                      />
                      <IcFace />
                    </div>
                  )}
                />
                <IcChat className="mb-1" />
                <IcPaperclip className="mb-1" />
              </div>
            </form>
          </>
        )}
      </div>
    </Page>
  );
};
