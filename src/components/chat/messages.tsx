import {
  Message as IMessage,
  useGetMeQuery,
} from '@/graphql/generated/graphql.codegen';
import { cn } from '@/lib/utils';
import { DateTime } from 'luxon';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Checkbox from '../base/Input/checkboxSection/checkbox';
import { useStore } from '@/store/useStore';
import VoicePlayer from './voice';
import { IcCheckRead } from '../icons/IcCheckRead';

let lastDate = '';

export const Messages = ({
  toggleSelect,
  messages,
  selects,
  setReply,
  handleImageLoad,
}: {
  toggleSelect: (message: IMessage) => void;
  messages: IMessage[];
  selects: IMessage[];
  handleImageLoad: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  setReply: (message: IMessage) => void;
}) => {
  const { selectSearch, isSearch } = useStore((s) => s);
  const messagesRef = useRef<HTMLDivElement>(null);
  const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isHold, setIsHold] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Cleanup hold timeout on unmount
  useEffect(() => {
    return () => {
      if (holdTimeout) {
        clearTimeout(holdTimeout);
      }
    };
  }, [holdTimeout]);
  useEffect(() => {
    if (isSearch && selectSearch) {
      for (let i = 0; i < (messagesRef.current?.children.length || 0); i++) {
        const item = messagesRef.current?.children.item(i) as HTMLDivElement;
        if (item?.id === selectSearch) {
          item.scrollIntoView({ behavior: 'smooth', block: 'center' });
          item.className = cn(item.className, 'bg-brand-black/10');
          setTimeout(() => {
            item.className = cn(item.className, 'bg-transparent');
          }, 1000);
          break;
        }
      }
    }
  }, [selectSearch]);
  const handleMouseUpOrLeave = () => {
    if (holdTimeout) {
      clearTimeout(holdTimeout);
      setHoldTimeout(null);
    }
  };

  const handleMouseDown = (message: IMessage) => {
    setIsScrolling(false);
    setIsHold(false);
    const timeout = setTimeout(() => {
      if (!isScrolling) {
        setIsHold(true);
        toggleSelect(message);
      }
    }, 500);
    setHoldTimeout(timeout);
  };

  const handleTouchMove = () => {
    setIsScrolling(true);
    if (holdTimeout) {
      clearTimeout(holdTimeout);
      setHoldTimeout(null);
    }
  };
  return (
    <div
      id="message-body"
      className="relative flex h-fit min-h-full max-w-[100vw] flex-col justify-end overflow-x-hidden"
      onTouchMove={handleTouchMove}
      ref={messagesRef}
    >
      {messages
        .slice()
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        )
        .map((message) => (
          <Message
            clickReply={(id) => {
              for (
                let i = 0;
                i < (messagesRef.current?.children.length || 0);
                i++
              ) {
                const item = messagesRef.current?.children.item(
                  i,
                ) as HTMLDivElement;
                if (item?.id === id) {
                  item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  item.className = cn(item.className, 'bg-brand-black/10');
                  setTimeout(() => {
                    item.className = cn(item.className, 'bg-transparent');
                  }, 1000);
                  break;
                }
              }
            }}
            handleImageLoad={handleImageLoad}
            setReply={setReply}
            handleMouseDown={handleMouseDown}
            handleMouseUpOrLeave={handleMouseUpOrLeave}
            isHold={isHold}
            message={message}
            selects={selects}
            toggleSelect={toggleSelect}
            key={message.id}
          ></Message>
        ))}
    </div>
  );
};
const Message = ({
  toggleSelect,
  message,
  selects,
  handleMouseDown,
  handleMouseUpOrLeave,
  isHold,
  setReply,
  clickReply,
  handleImageLoad,
}: {
  toggleSelect: (message: IMessage) => void;
  handleMouseDown: (message: IMessage) => void;
  handleMouseUpOrLeave: () => void;
  isHold: boolean;
  message: IMessage;
  selects: IMessage[];
  handleImageLoad: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  clickReply?: (id: string) => void;
  setReply: (message: IMessage) => void;
}) => {
  const { data: me } = useGetMeQuery({
    onError: (err) => {
      console.error('Error fetching user data:', err);
    },
  });
  const messageDate = DateTime.fromISO(message.createdAt)
    .setZone('Asia/Tehran')
    .toFormat('yyyy-MM-dd');

  const showDateDivider = messageDate !== lastDate;
  lastDate = messageDate;
  const formatDate = (isoDate: string) =>
    DateTime.fromISO(isoDate)
      .setZone('Asia/Tehran')
      .toLocaleString(DateTime.DATE_MED);

  return (
    <>
      {/* Date Divider */}
      {showDateDivider && (
        <div className="flex justify-center py-2 text-xs text-gray-500">
          {formatDate(message.createdAt)}
        </div>
      )}

      {/* Message Bubble */}
      <div
        id={message.id}
        className={cn(
          'relative flex items-center justify-end px-4 py-1 transition-all duration-300 ease-in-out',
          selects.length > 0 && 'justify-between',
          selects.some((val) => val.id === message.id) && 'bg-brand-yellow/10',
          message.senderId === me?.getMe?.id && 'justify-start gap-4',
        )}
        onTouchStart={() => handleMouseDown(message)}
        onTouchEnd={handleMouseUpOrLeave}
        onMouseDown={() => handleMouseDown(message)}
        onMouseUp={handleMouseUpOrLeave}
        onClick={
          selects.length > 0 && !isHold
            ? () => toggleSelect(message)
            : undefined
        }
      >
        {/* Checkbox for Selection */}
        <Checkbox
          readOnly
          className={cn(
            'flex rounded-lg border-[1.25px] border-brand-black',
            selects.length === 0 && 'hidden',
          )}
          checked={selects.some((val) => val.id === message.id)}
        />
        <motion.div
          key={message.id}
          drag={selects.length > 0 ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={{ left: 0.3, right: 0 }}
          dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
          onDragEnd={(event, info) => {
            if (info.offset.x < -100) {
              setReply(message);
            }
          }}
          className={cn(
            'relative flex w-full justify-end overflow-hidden',
            message.senderId === me?.getMe?.id && 'justify-start gap-4',
          )}
        >
          <div
            className={cn(
              'flex w-fit max-w-[85%] flex-col overflow-hidden rounded-xl text-sm font-medium shadow-md transition-colors duration-1000 ease-in-out',
              selects.some((val) => val.id === message.id) &&
                'bg-brand-yellow/10',
              message.senderId === me?.getMe?.id
                ? 'rounded-br-sm bg-brand-yellow'
                : 'rounded-bl-sm bg-white',
            )}
          >
            {message.type == 'message' && message.url && (
              <div className="my-auto flex items-center justify-center overflow-hidden bg-black">
                <img
                  className="max-h-96 object-cover"
                  src={message.url}
                  onLoad={handleImageLoad}
                ></img>
              </div>
            )}
            {message.type == 'audio' && message.url && (
              <VoicePlayer
                url={message.url}
                me={message.senderId === me?.getMe?.id}
              ></VoicePlayer>
            )}
            <div className="px-3 py-2">
              {message.reply && (
                <div
                  className={cn(
                    'mb-1 flex w-full overflow-hidden rounded-lg bg-gray-100',
                    message.senderId === me?.getMe?.id && 'bg-warning-100',
                  )}
                  onClick={() => clickReply?.(message.reply!.id)}
                >
                  <div
                    className={cn(
                      'flex max-h-full w-1 overflow-hidden bg-gray-400 text-transparent',
                      message.senderId === me?.getMe?.id && '',
                    )}
                  >
                    mmm
                  </div>
                  <div className="max-w-[calc(100%-4px)] p-1 px-2">
                    <h1 className="truncate text-sm font-bold">
                      {message.reply?.sender?.name}
                    </h1>
                    <div className="overflow-hidden truncate text-xs text-gray-500">
                      {message.reply?.type == 'message'
                        ? 'عکس'
                        : message.reply?.type == 'audio'
                          ? 'پیام صوتی'
                          : message.reply?.content}
                    </div>
                  </div>
                </div>
              )}
              <p className="whitespace-pre-wrap leading-normal">
                {message.content.trim()}
              </p>
              <div
                className={cn(
                  'flex w-full items-center gap-1 text-end text-[9px]',
                  message.senderId === me?.getMe?.id && 'text-start',
                )}
              >
                {DateTime.fromISO(message.createdAt)
                  .setZone('Asia/Tehran')
                  .toFormat('HH:mm')}
                <div>
                  <IcCheckRead
                    className={cn(!message.read && 'fill-gray-500')}
                  ></IcCheckRead>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
