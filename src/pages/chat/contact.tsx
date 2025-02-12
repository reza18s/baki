import {
  Message,
  RequestType,
  useCreateRequestMutation,
  useEditMessageMutation,
  useGetChatQuery,
  useGetMeQuery,
  useGetUserQuery,
  useReadMessagesMutation,
  useSendMessageMutation,
} from '@/graphql/generated/graphql.codegen';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
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
import { IcPaperclip } from '@/components/icons/IcPaperclip';
import { IcXCircle } from '@/components/icons/IcXCircle';
import { IcReply } from '@/components/icons/IcReply';
import { IcPen } from '@/components/icons/IcPen';
import { useStore } from '@/store/useStore';
import { IcArrowLeft } from '@/components/icons/IcArrowLeft';
import { customToast } from '@/components/base/toast';
import { VoiceRecorder } from 'capacitor-voice-recorder';
import { IcX } from '@/components/icons/IcX';
import { client, refreshAccessToken } from '@/graphql/apollo/client';
import { IcTrash } from '@/components/icons/IcTrash';
import { useLocalStore } from '@/store/useLocalStore';
import EmojiPicker from 'emoji-picker-react';
import { Request } from '../Explore/request';
import { cn } from '@/lib/utils';
import Modal from '@/components/base/Modal/Modal';
import { IcChat } from '@/components/icons/IcChat';
const formatTime = (time: number): string => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  const tenths = Math.floor((time % 1) * 10); // For tenths of a second

  return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`;
};
type IContactPages = RouteComponentProps<{
  id: string;
}>;
const removeLastGrapheme = (str: string) => {
  const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
  const segments = Array.from(segmenter.segment(str)); // Split into graphemes
  return segments
    .slice(0, -1)
    .map((seg) => seg.segment)
    .join(''); // Remove the last grapheme
};
const defaultQs = [
  `اگر الان می تونستی جایی باشی دوست داشتی کجا بودی؟
`,
  `اگر پول زیادی در بخت آزمایی برنده بشی باهاش چکار میکردی؟`,
  `هدفت از مسافرت بیشتر چه چیزیه؟استراحت و ریلکس کردن یا آزادی!! میتونی بهم بگی؟`,
  `به نظرت یه همسفر خوب چه ویژگی باید داشته باشه؟
`,
  `اگر یک میلیون دلار داشتی می‌تونستی باهاش یک نفر رو ببری دور دنیا، چه کسی رو میبردی؟
`,
  `برای یک مسافرت چه چیزی رو میتونی با بقیه به اشتراک بزاری؟
`,
  `جالب ترین پیامی که تا حالا دریافت کردی چی بوده؟`,
];

export const ContactPage = ({ match }: IContactPages) => {
  const id = match.params.id;
  const chatContainerRef = useRef<HTMLIonContentElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isOpen, setIsOpen] = useState<'emoji' | 'defaultMessages' | undefined>(
    undefined,
  );
  const {
    isSearch,
    search,
    setSearches,
    searches,
    setSelectSearch,
    selectSearch,
  } = useStore((s) => s);
  const [defaultQ, setDefaultQ] = useState<string>(
    defaultQs[+(Math.random() * (defaultQs.length - 1)).toFixed(0)],
  );
  const [selects, setSelects] = useState<Message[]>([]);
  const [reply, setReply] = useState<Message>();
  const [edit, setEdit] = useState<Message>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [once, setOnce] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const [time, setTime] = useState<number>(0);

  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null,
  );
  const scroll = useLocalStore((s) => s.scroll);
  const { control, watch, handleSubmit, reset, setValue } = useForm<{
    message: string;
  }>();
  const { data: me } = useGetMeQuery({});
  const { data: participant } = useGetUserQuery({
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
  const [sendMessage, { loading: sendLoading }] = useSendMessageMutation({
    client: socket,
  });
  const [editMessage, { loading: editLoading }] = useEditMessageMutation({
    client: socket,
  });
  const [readMessages] = useReadMessagesMutation({ client: socket });
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

  useLayoutEffect(() => {
    // Scroll to the bottom when messages are loaded
    (async () => {
      if (chatContainerRef.current && messages.length > 0) {
        if (!once) {
          chatContainerRef.current.scrollToPoint(null, scroll?.[match.url], 0);
          setOnce(true);
        } else {
          const messageBody = chatContainerRef.current?.children
            .item(1)
            ?.children.item(0)?.children;
          const lastMessageH =
            messageBody?.item(messageBody.length - 1)?.clientHeight || 0;
          const scrollH =
            (await chatContainerRef.current?.getScrollElement())
              ?.scrollHeight || 0;
          if (messages[messages.length - 1].senderId === me?.getMe.id) {
            chatContainerRef.current?.scrollToBottom(300);
          } else if (
            (chatContainerRef.current?.clientHeight || 0) +
              ((await chatContainerRef.current?.getScrollElement())
                ?.scrollTop || 0) +
              500 >
            scrollH - lastMessageH
          ) {
            chatContainerRef.current?.scrollToBottom(300);
          }
        }
      }
    })();
  }, [messages]);
  useEffect(() => {
    if (
      messages.filter((message) => message.senderId === id && !message.read)
        .length > 0
    ) {
      readMessages({
        variables: { content: id },
      });
    }
  }, [messages]);

  useEffect(() => {
    if (watch('message')) {
      handleInput();
    }
  }, [watch('message')]);
  useEffect(() => {
    // Clean up the interval when the component unmounts or recording stops
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);
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
  const onSubmit = async (
    value: { message: string },
    action: 'send' | 'edit',
  ) => {
    if (
      (!value.message.trim() && !selectedImage) ||
      sendLoading ||
      editLoading
    ) {
      return;
    }
    try {
      if (action == 'send') {
        let imageUrl: string | undefined;
        if (selectedImage) {
          const formData = new FormData();
          const file = await fetch(selectedImage).then((res) => res.blob());
          formData.append('files', file, `Image.jpg`);
          const response = await fetch(
            `${import.meta.env.VITE_APP_BASE}/upload/upload-images`,
            {
              method: 'POST',
              body: formData,
              redirect: 'follow',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            },
          );
          if (response.ok) {
            imageUrl = (await response.json())?.files?.[0]?.original;
          } else {
            if ((await response.json()).code === 'INVALID_TOKEN') {
              refreshAccessToken(client);
            }
            customToast('مشکلی در اپلود عکس های پیش امد', 'error');
            return;
          }
          setSelectedImage(null);
        }
        await sendMessage({
          variables: {
            chatId: chat?.id,
            receiverId: participant?.getUser?.id,
            content: selectedImage ? value.message || '' : value.message,
            replyId: reply?.id,
            type: selectedImage ? 'message' : undefined,
            url: imageUrl,
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
      setSelectedImage(null);
      console.error('Error sending message:', err);
    }
  };
  const onStartRecording = async () => {
    if (!(await VoiceRecorder.canDeviceVoiceRecord()).value) {
      customToast(`دستگاه شما نمیتواند ریکورد کند`, 'error');
      return;
    }
    if (!(await VoiceRecorder.hasAudioRecordingPermission()).value) {
      VoiceRecorder.requestAudioRecordingPermission()
        .then((result) => {
          if (!result.value) {
            customToast(
              'لطفا درخواست استفاده از میکروفون را قبول کنید',
              'error',
            );
          }
        })
        .catch((err) => {
          customToast(err.message, 'error');
        });
    }

    if ((await VoiceRecorder.getCurrentStatus()).status === 'NONE') {
      await VoiceRecorder.startRecording();
      setRecording(true);

      const intervalId = setInterval(() => {
        setTime((prevTime) => +(prevTime + 0.1).toFixed(2));
      }, 100); // Update every second

      setTimerInterval(intervalId);
    }
  };
  const onStopRecording = async () => {
    if ((await VoiceRecorder.getCurrentStatus()).status === 'RECORDING') {
      const value = await VoiceRecorder.stopRecording();
      setRecording(false);
      setTime(0);
      if (timerInterval) {
        clearInterval(timerInterval); // Stop the timer
        setTimerInterval(null);
      }
      let voiceUrl: string | undefined = undefined;
      const formdata = new FormData();
      const base64Data = value.value.recordDataBase64;
      const audioBlob = await fetch(`data:audio/mp3;base64,${base64Data}`).then(
        (res) => res.blob(),
      );
      const file = new File([audioBlob], 'audio.mp3', {
        type: 'audio/mp3',
      });
      formdata.append('voice', file);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BASE}/upload/upload-voice`,
          {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
        const responseJson = await response.json();
        console.log('responseJson', responseJson);
        if (response.ok && responseJson?.file?.url) {
          voiceUrl = responseJson?.file?.url;
        } else if (responseJson.code === 'INVALID_TOKEN') {
          refreshAccessToken(client);
        }
        if (!voiceUrl) {
          customToast('مشکلی در اپلود ویس پیش آمد', 'error');
        } else {
          await sendMessage({
            variables: {
              chatId: chat?.id,
              receiverId: participant?.getUser?.id,
              content: '',
              replyId: reply?.id,
              type: 'audio',
              url: voiceUrl,
            },
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (ignored) {
        customToast('مشکلی در اپلود ', 'error');
      }
    }
  };
  const onConsoleRecording = async () => {
    if ((await VoiceRecorder.getCurrentStatus()).status === 'RECORDING') {
      setRecording(false);
      setTime(0);
      if (timerInterval) {
        clearInterval(timerInterval); // Stop the timer
        setTimerInterval(null);
      }
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string); // ذخیره URL تصویر در state
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const imageHeight = img.clientHeight; // Get the natural height of the image

    // if (chatContainerRef.current) {
    //   (async () => {
    //     console.log(imageHeight);
    //     chatContainerRef.current?.scrollToPoint(
    //       null,
    //       (await chatContainerRef.current?.getScrollElement())?.scrollTop +
    //         imageHeight,
    //     );
    //   })();
    // }
  };
  return (
    <Page
      headerClassName="py-2 px-4"
      header={
        <ContactBar
          clearSelect={() => setSelects([])}
          selects={selects}
          chatId={chat?.id}
          //@ts-expect-error the
          contact={participant?.getUser || { id: id, isOnline: false }}
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
      <Request id={id} searchType={chat?.searchType}></Request>
      <Messages
        setReply={(message) => {
          setEdit(undefined);
          setReply(message);
        }}
        handleImageLoad={handleImageLoad}
        messages={messages}
        selects={selects}
        toggleSelect={toggleSelect}
      />
      <div className="sticky bottom-0 z-10 w-screen bg-white transition-all duration-300 ease-in-out">
        <div className="px-3 py-[10px]">
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
          ) : selects.length > 0 ? (
            <div className="flex min-h-6 w-full justify-between">
              {selects.length === 1 && (
                <div
                  className="flex items-center gap-2 text-sm"
                  onClick={() => {
                    setReply(selects?.[0]);
                    setSelects([]);
                  }}
                >
                  <IcReply></IcReply>
                  پاسخ
                </div>
              )}
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
                        {reply.type == 'message'
                          ? 'عکس'
                          : reply.type == 'voice'
                            ? 'پیام صوتی'
                            : reply?.content}
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
              {recording ? (
                <div className="flex items-center gap-3">
                  <Button
                    className="mb-1 h-6 p-0"
                    variant="text"
                    onClick={() => onStopRecording()}
                  >
                    <IcSend />
                  </Button>
                  <div className="flex flex-1 items-center justify-end gap-2">
                    <span className="text-xs">{formatTime(time)}</span>
                    <div className="animate-fadeInOut size-2 rounded-full bg-brand-red"></div>
                  </div>
                  <IcTrash
                    className="mb-1"
                    onClick={() => onConsoleRecording()}
                  ></IcTrash>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit((val) =>
                    edit ? onSubmit(val, 'edit') : onSubmit(val, 'send'),
                  )}
                >
                  {selectedImage && (
                    <div className="mb-2">
                      <div className="flex">
                        <IcX
                          onClick={() => setSelectedImage(null)}
                          className="size-10"
                        ></IcX>
                        <h1 className="flex items-center text-center text-lg font-bold">
                          ارسال عکس
                        </h1>
                      </div>
                      <div className="flex items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-black">
                        <img
                          src={selectedImage}
                          alt="Selected"
                          className="max-h-64"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex items-end gap-3">
                    {watch('message')?.trim().length > 0 || selectedImage ? (
                      <Button
                        variant="text"
                        type="submit"
                        className="mb-1 flex items-center justify-center p-0"
                      >
                        <IcSend />
                      </Button>
                    ) : (
                      <IcMicrophone
                        className="mb-1"
                        onClick={onStartRecording}
                      />
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
                            onClick={() => {
                              setIsOpen(undefined);
                            }}
                            ref={textareaRef}
                          />
                          <IcFace
                            onClick={() =>
                              setIsOpen((prev) =>
                                prev === 'emoji' ? undefined : 'emoji',
                              )
                            }
                          />
                        </div>
                      )}
                    />
                    <IcChat
                      className="mb-1"
                      onClick={() => setIsOpen('defaultMessages')}
                    ></IcChat>
                    {!(watch('message')?.trim().length > 0) && (
                      <label
                        className="mb-1 cursor-pointer text-white"
                        title="Upload Image"
                      >
                        <IcPaperclip className="h-6 w-6" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </form>
              )}
            </>
          )}
        </div>

        <div className={cn('flex flex-col')}>
          <EmojiPicker
            width={'100%'}
            height={isOpen === 'emoji' ? 300 : 0}
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
              isOpen !== 'emoji' && 'hidden',
            )}
          >
            <svg
              onClick={() => {
                console.log(watch('message'));
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
        <Modal
          positionY="end"
          className="mb-10 flex w-[85%] flex-col overflow-hidden rounded-2xl bg-white"
          isOpen={isOpen === 'defaultMessages'}
          onRequestClose={() => setIsOpen(undefined)}
        >
          <div className="flex h-48 w-full flex-col items-center justify-between p-4 text-center">
            <span className="w-full text-sm">
              پیام مدنظر خودتون رو انتخاب کنید.
            </span>
            <h1 className="text-lg font-bold">{defaultQ}</h1>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm"
              onClick={() =>
                setDefaultQ(
                  (prev) =>
                    defaultQs.filter((q) => q !== prev)[
                      +(Math.random() * (defaultQs.length - 2)).toFixed(0)
                    ],
                )
              }
            >
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5657 1.875C6.57112 1.875 3.28727 4.9275 2.96709 8.81944H2.16664C1.91341 8.81944 1.6852 8.97225 1.58875 9.2064C1.4923 9.44055 1.54668 9.70976 1.72644 9.88812L3.12629 11.277C3.36996 11.5188 3.76302 11.5188 4.00669 11.277L5.40653 9.88812C5.5863 9.70976 5.64067 9.44055 5.54422 9.2064C5.44777 8.97225 5.21957 8.81944 4.96633 8.81944H4.22229C4.53872 5.62639 7.25395 3.125 10.5657 3.125C12.8736 3.125 14.8939 4.34037 16.0129 6.16066C16.1937 6.45471 16.5786 6.54654 16.8727 6.36576C17.1668 6.18499 17.2586 5.80006 17.0778 5.50601C15.7392 3.32856 13.3227 1.875 10.5657 1.875Z"
                  fill="#1A1D1E"
                />
                <path
                  d="M17.8676 8.72215C17.6241 8.4815 17.2323 8.4815 16.9889 8.72215L15.5837 10.111C15.4034 10.2892 15.3486 10.5586 15.4449 10.793C15.5412 11.0275 15.7696 11.1806 16.023 11.1806H16.7723C16.4546 14.3718 13.7299 16.875 10.4023 16.875C8.08351 16.875 6.05485 15.6586 4.93159 13.8384C4.75031 13.5447 4.36523 13.4535 4.07149 13.6348C3.77774 13.8161 3.68657 14.2012 3.86784 14.4949C5.21169 16.6725 7.63667 18.125 10.4023 18.125C14.4088 18.125 17.7062 15.0744 18.0275 11.1806H18.8334C19.0869 11.1806 19.3152 11.0275 19.4115 10.793C19.5078 10.5586 19.453 10.2892 19.2728 10.111L17.8676 8.72215Z"
                  fill="#1A1D1E"
                />
              </svg>
              دریافت سوال جدید
            </Button>
          </div>
          <Button
            className="flex h-12 w-full items-center justify-center gap-2 rounded-t-none"
            onClick={() => {
              onSubmit({ message: defaultQ || '' }, 'send');
              setIsOpen(undefined);
            }}
          >
            <IcSend className="fill-brand-black"></IcSend> ارسال سوال
          </Button>
        </Modal>
      </div>
    </Page>
  );
};
