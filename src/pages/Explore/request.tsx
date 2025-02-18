import Button from '@/components/base/Button/Button';
import BottomSheetModal from '@/components/base/Modal/BottomSheetModal';
import { customToast } from '@/components/base/toast';
import { IcCase } from '@/components/icons/IcCase';
import { IcChair } from '@/components/icons/IcChair';
import { IcSendMessage } from '@/components/icons/IcSendMessage';
import {
  RequestType,
  useCreateRequestMutation,
  useGetMeQuery,
  useGetRequestsQuery,
  User,
} from '@/graphql/generated/graphql.codegen';
import { cn } from '@/lib/utils';
import { useIonRouter } from '@ionic/react';
import React, { useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IcSend } from '@/components/icons/IcSend';
import { Controller, useForm } from 'react-hook-form';
import { IcFace } from '@/components/icons/IcFace';
import EmojiPicker from 'emoji-picker-react';
import { removeLastGrapheme } from '../chat/contact';
import { IcXCircle } from '@/components/icons/IcXCircle';
import { IcMessageRequest } from '@/components/icons/IcMessageRequest';

export const Request = ({
  id,
  searchType,
  className,
  user,
  buttonClassName,
  showSendMessage = false,
}: {
  user?: User;
  id: string;
  className?: string;
  buttonClassName?: string;
  searchType?: string;
  showSendMessage?: boolean;
}) => {
  const { control, watch, handleSubmit, setValue } = useForm<{
    message: string;
  }>();
  const [isOpen, setIsOpen] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const { data: me } = useGetMeQuery();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { data: requests, refetch } = useGetRequestsQuery({
    variables: { me: true },
  });
  const request = requests?.getRequests.find(
    (r) => r.requesterId === me?.getMe.id && r.receiverId === id,
  );
  const [createRequest, { loading: requestLoading }] =
    useCreateRequestMutation();
  const [createRequest2, { loading: requestLoading2 }] =
    useCreateRequestMutation();
  const [createRequest3, { loading: requestLoading3 }] =
    useCreateRequestMutation();
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
    <div
      className={cn(
        'flex min-h-full flex-1 flex-col items-center justify-center gap-2 p-6',
        className,
      )}
    >
      {request?.status !== 'accept' ||
        (showSendMessage && (
          <>
            {request ? (
              <>
                <div className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-4">
                  {request.type === 'companionRequest' ? (
                    <IcCase className="size-12"></IcCase>
                  ) : request.type === 'hostingInvitation' ? (
                    <IcChair className="size-12"></IcChair>
                  ) : (
                    <IcMessageRequest></IcMessageRequest>
                  )}
                  <h1 className="text-sm font-bold">
                    {request.type === 'companionRequest'
                      ? 'درخواست همسفری شما ارسال شد.'
                      : request.type === 'hostingInvitation'
                        ? 'درخواست میزبانی شما ارسال شد.'
                        : 'پیام شما ارسال شد'}
                  </h1>
                </div>
                {showSendMessage && (
                  <>
                    <div className="w-full">
                      <div
                        className={cn(
                          'w-fit max-w-[85%] rounded-xl rounded-br-sm bg-brand-yellow p-2 text-sm text-brand-black',
                        )}
                      >
                        {request.message}
                      </div>
                    </div>
                    {!me?.getMe.plan && (
                      <span className="mt-4 w-full text-center text-xs">
                        {user?.name} 24 ساعت زمان دارد تا به پیام شما پاسخ دهد.
                      </span>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className={cn(
                    'flex h-10 w-[230px] items-center justify-center gap-1 border-gray-300 bg-white p-0 text-sm font-medium',
                    buttonClassName,
                  )}
                  onClick={() => {
                    createRequest({
                      variables: {
                        receiverId: id,
                        searchType: searchType || 'random',
                        type: 'companionRequest' as RequestType,
                        message: 'دوست دارین با هم بریم سفر؟',
                      },
                      onCompleted: () => {
                        customToast('دعوت با موفقیت ارسال شد', 'success');
                        refetch();
                      },
                      onError: () => {
                        customToast(
                          'مشکلی پیش امد لطفا دوباره امتحان کنید',
                          'error',
                        );
                      },
                    });
                  }}
                  loading={requestLoading}
                >
                  <IcCase></IcCase>
                  ارسال درخواست همسفری
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    'flex h-10 w-[230px] items-center justify-center gap-1 border-gray-300 bg-white p-0 text-sm font-medium',
                    buttonClassName,
                  )}
                  onClick={() => {
                    createRequest2({
                      variables: {
                        receiverId: id,
                        searchType: searchType || 'random',
                        type: 'hostingInvitation' as RequestType,
                        message:
                          'مایلم میزبان شما باشم.خیلی خوشحال می‌شم اگه بیای',
                      },
                      onCompleted: () => {
                        customToast('دعوت با موفقیت ارسال شد', 'success');
                        refetch();
                      },
                      onError: (err) => {
                        customToast(err.message, 'error');
                      },
                    });
                  }}
                  loading={requestLoading2}
                >
                  <IcChair></IcChair>ارسال دعوت میزبانی
                </Button>
                {showSendMessage && (
                  <Button
                    onClick={() => setIsOpen(true)}
                    variant="outline"
                    className="mt-4 flex h-10 w-full items-center justify-center gap-1 border-gray-300 p-0 text-sm font-medium"
                  >
                    <IcSendMessage></IcSendMessage>ارسال پیام
                  </Button>
                )}
              </>
            )}
            <BottomSheetModal
              show={false}
              isOpen={isOpen}
              className="relative flex flex-col items-center justify-center"
              onRequestClose={() => setIsOpen(false)}
            >
              <div className="relative flex w-full flex-col items-center gap-4 p-4 px-6">
                <div className="absolute right-6">
                  <IcXCircle
                    className="size-5"
                    onClick={() => setIsOpen(false)}
                  ></IcXCircle>
                </div>
                <Avatar className="size-20">
                  <AvatarImage
                    src={user?.mainImage || ''}
                    className="object-cover"
                  />
                  <AvatarFallback className="3xl">
                    {user?.name?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex w-full flex-col items-center justify-center gap-4">
                  <h2 className="text-lg font-bold">
                    دوست داری به {user?.name} چی بگی؟
                  </h2>
                </div>

                <form
                  onSubmit={handleSubmit((val) => {
                    createRequest3({
                      variables: {
                        receiverId: id,
                        searchType: searchType || 'random',
                        type: 'message' as RequestType,
                        message: val.message,
                      },
                      onCompleted: () => {
                        customToast('پیام شما با موفقیت ارسال شد', 'success');
                        refetch();
                      },
                      onError: () => {
                        customToast(
                          'مشکلی پیش امد لطفا دوباره امتحان کنید',
                          'error',
                        );
                      },
                    });
                  })}
                  className="w-full"
                >
                  <div className="flex w-full items-end gap-3">
                    <Button
                      disabled={requestLoading3}
                      variant="text"
                      type="submit"
                      className="mb-1 flex items-center justify-center p-0"
                    >
                      <IcSend />
                    </Button>
                    <Controller
                      name="message"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <div className="flex w-full flex-1 items-end justify-between rounded-lg bg-gray-50 px-2 py-[6px]">
                          <textarea
                            rows={1}
                            placeholder="پیام خود را یادداشت کنید"
                            onInput={handleInput}
                            className="flex-1 resize-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                            {...field}
                            onClick={() => {
                              setEmoji(false);
                            }}
                            ref={textareaRef}
                          />
                          <IcFace onClick={() => setEmoji((prev) => !prev)} />
                        </div>
                      )}
                    />
                  </div>
                </form>
              </div>
              <div className={cn('flex w-full flex-col')}>
                <EmojiPicker
                  width={'100%'}
                  height={emoji ? 300 : 0}
                  // className={cn('transition-all delay-0 duration-300')}
                  searchDisabled
                  onEmojiClick={({ emoji }) => {
                    setValue('message', `${watch('message')}${emoji}`);
                  }}
                  skinTonesDisabled // Disable skin tone picker
                  previewConfig={{ showPreview: false }}
                />
                <div
                  className={cn(
                    'p-2 px-4 transition-all delay-300 duration-300',
                    !emoji && 'hidden',
                  )}
                >
                  <svg
                    onClick={() => {
                      setValue('message', removeLastGrapheme(watch('message')));
                    }}
                    fill="#000000"
                    height="20px"
                    width="20px"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 489.425 489.425"
                  >
                    <g>
                      <g>
                        <path
                          d="M122.825,394.663c17.8,19.4,43.2,30.6,69.5,30.6h216.9c44.2,0,80.2-36,80.2-80.2v-200.7c0-44.2-36-80.2-80.2-80.2h-216.9
			c-26.4,0-51.7,11.1-69.5,30.6l-111.8,121.7c-14.7,16.1-14.7,40.3,0,56.4L122.825,394.663z M29.125,233.063l111.8-121.8
			c13.2-14.4,32-22.6,51.5-22.6h216.9c30.7,0,55.7,25,55.7,55.7v200.6c0,30.7-25,55.7-55.7,55.7h-217c-19.5,0-38.3-8.2-51.5-22.6
			l-111.7-121.8C23.025,249.663,23.025,239.663,29.125,233.063z"
                        />
                        <path
                          d="M225.425,309.763c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6l47.8-47.8l47.8,47.8c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6
			c4.8-4.8,4.8-12.5,0-17.3l-47.9-47.8l47.8-47.8c4.8-4.8,4.8-12.5,0-17.3s-12.5-4.8-17.3,0l-47.8,47.8l-47.8-47.8
			c-4.8-4.8-12.5-4.8-17.3,0s-4.8,12.5,0,17.3l47.8,47.8l-47.8,47.8C220.725,297.263,220.725,304.962,225.425,309.763z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </BottomSheetModal>
          </>
        ))}
    </div>
  );
};
