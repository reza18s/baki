import { Page } from '@/components/layout/Page';

import {
  Message,
  useGetChatQuery,
  useGetMeQuery,
  useSendMessageMutation,
} from '@/graphql/generated/graphql.codegen';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import BgChat from '../../assets/images/bg-chat.png';
import { cn } from '@/lib/utils';
import Checkbox from '@/components/base/Input/checkboxSection/checkbox';
import { IcMicrophone } from '@/components/icons/IcMicrophone';
import { IcPaperclip } from '@/components/icons/IcPaperclip';
import { IcChat } from '@/components/icons/IcChat';
import { IcFace } from '@/components/icons/IcFace';
import { Controller, useForm } from 'react-hook-form';
import { ContactBar } from '@/components/chat/contactBar';
import { IcSend } from '@/components/icons/IcSend';
import Button from '@/components/base/Button/Button';
import { socket } from '@/graphql/apollo/socket';
import { DateTime } from 'luxon';

export const ContactPage = () => {
  const chatContainerRef = useRef<HTMLIonContentElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selects, setSelects] = useState<Message[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isHold, setIsHold] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const { control, watch, handleSubmit, reset } = useForm<{
    message: string;
  }>();

  const { id }: { id: string } = useParams();
  const { data } = useGetChatQuery({ variables: { chatId: id } });
  const { data: me } = useGetMeQuery({
    onError(err) {
      if (err.message === 'Failed to fetch') {
        return;
      }
    },
  });

  const [sendMessage] = useSendMessageMutation({ client: socket });
  const chat = data?.getChat;

  useEffect(() => {
    if (data?.getChat?.Message) {
      setMessages(data.getChat.Message);
    }
    chatContainerRef.current?.scrollToBottom(500);
  }, [chat?.Message, messages]);

  const toggleSelect = (message: Message) => {
    setSelects((prev) => {
      const isSelected = prev.some(
        (selectedChat) => selectedChat.id === message.id,
      );
      if (isSelected) {
        return prev.filter((selectedChat) => selectedChat.id !== message.id);
      } else {
        return [...prev, message];
      }
    });
  };

  const handleMouseDown = (message: Message) => {
    setIsScrolling(false);
    const timeout = setTimeout(() => {
      if (!isScrolling) {
        setIsHold(true);
        toggleSelect(message);
      }
    }, 500);
    setHoldTimeout(timeout);
  };

  const handleTouchMove = () => {
    setIsScrolling(true); // Mark as scrolling
    if (holdTimeout) {
      clearTimeout(holdTimeout); // Cancel long press
      setHoldTimeout(null);
    }
  };

  const handleMouseUpOrLeave = () => {
    if (holdTimeout) {
      clearTimeout(holdTimeout);
      setHoldTimeout(null);
    }
  };

  const handleClick = (message: Message) => {
    if (!isHold && !isScrolling) {
      // Handle regular click
      console.log('Message clicked:', message);
      toggleSelect(message);
    }
    setIsHold(false); // Reset hold state after click
    setIsScrolling(false); // Reset scrolling state
  };

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

  return (
    <Page
      headerClassName="py-2 px-4"
      header={
        <ContactBar
          clearSelect={() => setSelects([])}
          selects={selects}
          contact={chat?.participants?.[0]}
        />
      }
      contentClassName="min-h-full relative flex flex-col bg-transparent"
      scrollY
      ref={chatContainerRef}
      bgImage={BgChat}
    >
      <div
        className="relative flex min-h-full w-full flex-col justify-end"
        onTouchMove={handleTouchMove} // Detect scrolling
      >
        {messages.map((message) => (
          <div
            key={message?.id}
            className={cn(
              'flex w-full items-center justify-end px-4 py-1 opacity-0 transition-all duration-300 ease-in-out',
              selects.length > 0 && 'justify-between',
              selects.some((val) => val.id === message?.id) &&
                'bg-brand-yellow/10',
              message?.senderId === me?.getMe?.id && 'justify-start gap-4',
              'opacity-100',
            )}
            onTouchStart={() => handleMouseDown(message)}
            onTouchEnd={handleMouseUpOrLeave}
            onMouseDown={() => handleMouseDown(message)}
            onMouseUp={handleMouseUpOrLeave}
            onClick={selects.length > 0 ? () => handleClick(message) : () => {}} // Handle click
          >
            <Checkbox
              readOnly
              className={cn('flex', selects.length == 0 && 'hidden')}
              checked={selects.some((val) => val.id === message?.id)}
            />
            <div
              className={cn(
                'flex w-fit max-w-[85%] flex-col rounded-xl rounded-bl-sm bg-white px-3 py-2 text-sm font-medium shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10),0px_1px_2px_0px_rgba(0,0,0,0.06)] transition-colors duration-300 ease-in-out',
                selects.some((val) => val.id === message?.id) &&
                  'bg-brand-yellow/10',
                message?.senderId === me?.getMe?.id &&
                  'rounded-xl rounded-br-sm bg-brand-yellow',
              )}
            >
              <span>{message?.content}</span>
              <div
                className={cn(
                  'w-full text-end text-[9px]',
                  message?.senderId === me?.getMe?.id && 'text-start',
                )}
              >
                {DateTime.fromISO(message.createdAt)
                  .setZone('Asia/Tehran')
                  .toFormat('HH:mm')}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 w-full bg-white px-3 py-[10px] transition-all duration-300 ease-in-out">
        <form
          onSubmit={handleSubmit((value) => {
            setMessages((prev) => [
              ...prev,
              {
                chatId: chat!.id,
                read: false,
                content: value.message,
                createdAt: new Date(),
                id: '1',
                senderId: me!.getMe!.id,
              },
            ]);
            sendMessage({
              variables: {
                chatId: chat?.id,
                content: value.message,
              },
            });
            reset();
          })}
        >
          <div className="flex items-end gap-3">
            {watch('message')?.length > 0 ? (
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
              rules={{ required: true, min: 5 }}
              render={({ field }) => (
                <div className="flex flex-1 items-end justify-between rounded-lg bg-gray-50 px-2 py-[6px]">
                  <textarea
                    rows={1}
                    placeholder="پیام خود را یادداشت کنید"
                    onInput={handleInput}
                    className="flex-1 resize-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none transition-all duration-300 ease-in-out"
                    style={{
                      transition: 'height 0.2s ease',
                    }}
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
      </div>
    </Page>
  );
};
