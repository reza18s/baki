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
import { VoiceRecorder } from 'capacitor-voice-recorder';
import { IcX } from '@/components/icons/IcX';
import EmojiPicker from 'emoji-picker-react';
import { client, refreshAccessToken } from '@/graphql/apollo/client';
import { IcTrash } from '@/components/icons/IcTrash';
const formatTime = (time: number): string => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  const tenths = Math.floor((time % 1) * 10); // For tenths of a second

  return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`;
};
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const [time, setTime] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null,
  );
  const { control, watch, handleSubmit, reset, setValue } = useForm<{
    message: string;
  }>();

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
      chatContainerRef.current.scrollToBottom(0);
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
      <Messages
        setReply={(message) => {
          setEdit(undefined);
          setReply(message);
        }}
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
                            ref={textareaRef}
                          />
                          <IcFace />
                        </div>
                      )}
                    />
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

        {/* <EmojiPicker width={'100%'} /> */}
      </div>
    </Page>
  );
};
