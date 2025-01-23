import React, { useState } from 'react';
import { IcXCircle } from '../icons/IcXCircle';
import { IcTrash } from '../icons/IcTrash';
import { IcArrowRight } from '../icons/IcArrowRight';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { formatLastSeen } from '@/utils/datetime';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { IcDotsMenu } from '../icons/IcDotsMenu';
import { IcSearch } from '../icons/IcSearch';
import { IcMuted } from '../icons/IcMuted';
import { IcStar } from '../icons/IcStar';
import { customToast } from '../base/toast';
import { IcUserBlackList } from '../icons/IcUserBlackList';
import { IcFlag } from '../icons/IcFlag';
import {
  Message,
  useAddToBlackListMutation,
  useAddToFavoriteMutation,
  useDelChatMutation,
  useDelMessagesMutation,
} from '@/graphql/generated/graphql.codegen';
import ViolationReportModal from '../Explore/violationReportModal';
import { optionTexts } from '@/utils';
import { IcCopy } from '../icons/IcCopy';
import { socket } from '@/graphql/apollo/socket';
import { IcPen } from '../icons/IcPen';
import { useStore } from '@/store/useStore';
import { useHistory } from 'react-router';
import { Input } from '../shared/Inputs/input';
import { Clipboard } from '@capacitor/clipboard';
import Modal from '../base/Modal/Modal';
import Button from '../base/Button/Button';
import Checkbox from '../base/Input/checkboxSection/checkbox';

export const ContactBar = ({
  selects,
  clearSelect,
  contact,
  chatId,
  deleteMessages,
  setEdit,
}: {
  contact: {
    id: string;
    name?: string;
    mainImage?: string;
    lastSeen: Date;
    isOnline: boolean;
  };
  chatId?: string;
  selects: Message[];
  clearSelect: () => void;
  deleteMessages: (ids: string[]) => void;
  setEdit: (message: Message) => void;
}) => {
  const { setIsSearch, isSearch, setSearch, search } = useStore((s) => s);
  const [isOpen, setIsOpen] = useState<
    'violationReport' | 'deleteMessages' | 'deleteChat'
  >();
  const [addToFavorite] = useAddToFavoriteMutation();
  const [addToBlackList] = useAddToBlackListMutation();
  const [del, setDel] = useState(false);
  const [delMessages] = useDelMessagesMutation({ client: socket });
  const [delChat] = useDelChatMutation({ client: socket });
  const hs = useHistory();
  return (
    <div className="flex h-full w-full items-center justify-between">
      {isSearch ? (
        <>
          <div className="flex w-full items-center gap-2">
            <IcArrowRight onClick={() => setIsSearch(false)}></IcArrowRight>
            <Input
              className="h-8 w-full"
              icon={<IcSearch></IcSearch>}
              
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجو"
            ></Input>
          </div>
        </>
      ) : selects.length > 0 ? (
        <>
          <div className="flex items-center gap-2">
            <IcXCircle
              className="size-5 stroke-black"
              onClick={() => clearSelect()}
            ></IcXCircle>
            <span>{selects.length}</span>
          </div>
          <div className="flex items-center gap-4">
            {selects.length === 1 && selects?.[0].senderId !== contact.id && (
              <IcPen onClick={() => setEdit(selects?.[0])}></IcPen>
            )}
            <IcCopy
              className="size-6"
              onClick={() => {
                if (selects.length === 0) {
                  customToast('No messages selected to copy', 'warning');
                  return;
                }

                // Sort selected messages by creation date
                const sortedMessages = selects
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(a.createdAt).getTime() -
                      new Date(b.createdAt).getTime(),
                  );

                // Format messages with sender?.name grouped
                let lastSenderName: string;
                const textToCopy = sortedMessages
                  .map((message) => {
                    const isNewGroup = message.sender?.name !== lastSenderName;
                    lastSenderName = message.sender?.name as string;

                    const title = isNewGroup
                      ? `${message.sender?.name || 'Unknown User'}:\n`
                      : '';
                    const content = `${message.content}\n`;

                    return `${title}${content}`;
                  })
                  .join('\n');

                // Copy to clipboard
                Clipboard.write({
                  string: textToCopy,
                })
                  .then(() =>
                    customToast('Messages copied to clipboard!', 'success'),
                  )
                  .catch(() => {
                    customToast(
                      'Failed to copy messages. Please try again.',
                      'error',
                    );
                  });
                clearSelect();
              }}
            ></IcCopy>

            <IcTrash
              className="size-6 active:bg-gray-100"
              onClick={() => setIsOpen('deleteMessages')}
            ></IcTrash>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <IcArrowRight onClick={() => hs.goBack()}></IcArrowRight>
            <Avatar>
              <AvatarImage src={contact?.mainImage || ''} />
              <AvatarFallback>
                {contact?.name?.[0].toUpperCase() || ''}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-start">
              <h1 className="w-full text-start font-iransans text-sm font-bold">
                {contact?.name || ''}
              </h1>
              <span className="font-iransans text-xs text-gray-400">
                {contact?.isOnline
                  ? 'انلاین'
                  : contact?.lastSeen
                    ? formatLastSeen(contact?.lastSeen)
                    : ''}
              </span>
            </div>
          </div>
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger>
              <IcDotsMenu></IcDotsMenu>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-6 origin-top-right scale-95 transform divide-y rounded-xl px-3 py-1 transition-transform duration-300 ease-in-out">
              <DropdownMenuItem
                className="flex items-center gap-2 p-0 py-2"
                onClick={() => setIsSearch(true)}
              >
                <IcSearch className="siz5"></IcSearch>
                <h1 className="text-sm">جستجو</h1>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 p-0 py-2">
                <IcMuted className="siz5"></IcMuted>
                <h1 className="text-sm">بی‌صدا کردن اعلان‌ها</h1>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 p-0 py-2"
                onClick={() => {
                  addToFavorite({
                    variables: {
                      favoriteIds: contact!.id,
                    },
                    onCompleted: (res) => {
                      customToast(res.addToFavorite.message, 'success');
                    },
                  });
                }}
              >
                <IcStar className="siz5"></IcStar>
                <h1 className="text-sm">افزودن به علاقه‌مندی‌ها</h1>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 p-0 py-2"
                onClick={() => {
                  addToBlackList({
                    variables: {
                      blockedId: contact!.id,
                    },
                    onCompleted: (res) => {
                      customToast(res.addToBlackList || '', 'success');
                    },
                  });
                }}
              >
                <IcUserBlackList className="siz5"></IcUserBlackList>
                <h1 className="text-sm">افزودن به لیست سیاه</h1>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 p-0 py-2"
                onClick={() => setIsOpen('violationReport')}
              >
                <IcFlag fill="#000"></IcFlag>
                <h1 className="text-sm">گزارش تخلف</h1>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsOpen('deleteChat')}
                className="flex items-center gap-2 p-0 py-2"
              >
                <IcTrash></IcTrash>
                <h1 className="text-sm text-brand-red">حذف گفتگو</h1>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
      <ViolationReportModal
        id={contact.id}
        loading={false}
        title="گزارش تخلف"
        options={optionTexts}
        setClose={() => {
          setIsOpen(undefined);
        }}
        isOpen={isOpen === 'violationReport'}
      ></ViolationReportModal>
      <Modal
        isOpen={isOpen === 'deleteMessages'}
        onRequestClose={() => setIsOpen(undefined)}
        className="flex w-[90%] flex-col gap-6 rounded-3xl bg-white p-6"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-lg font-bold">
            حذف {selects.length} پیام
          </h1>
          <span className="text-center text-sm text-gray-500">
            آیا از حذف این پیام ها اطمینان دارید؟
          </span>
        </div>
        <div className="flex gap-2">
          <Checkbox
            checked={del}
            onChange={() => setDel((prev) => !prev)}
            className="rounded-lg"
          ></Checkbox>
          <span className="text-center text-sm">
            همچنین حذف برای {contact.name}
          </span>
        </div>
        <div className="flex w-full flex-col gap-2">
          <Button
            variant="danger-outline"
            className="w-full"
            onClick={() => {
              deleteMessages(selects.map((val) => val.id));
              delMessages({
                variables: {
                  messagesId: selects.map((val) => val.id),
                  del: del,
                },
              });
              clearSelect();
              setIsOpen(undefined);
            }}
          >
            حذف
          </Button>
          <Button
            variant="outline"
            className="w-full border-brand-black"
            onClick={() => setIsOpen(undefined)}
          >
            لغو
          </Button>
        </div>
      </Modal>
      <Modal
        isOpen={isOpen === 'deleteChat'}
        onRequestClose={() => setIsOpen(undefined)}
        className="flex w-[90%] flex-col gap-6 rounded-3xl bg-white p-6"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-lg font-bold">
            آیا از حذف این گفتگو اطمینان دارید؟
          </h1>
          <span className="text-center text-sm text-gray-500">
            در صورت حذف گفتگو تمامی اطلاعات به اشتراک گذاشته شده حذف خواهند شد.
          </span>
        </div>
        <div className="flex w-full flex-col gap-2">
          <Button
            variant="danger-outline"
            className="w-full"
            onClick={() => {
              if (chatId) {
                delChat({
                  variables: {
                    chatsId: chatId,
                    del: true,
                  },
                });
                clearSelect();
                setIsOpen(undefined);
              }
            }}
          >
            حذف گفتگو با {contact.name}
          </Button>
          <Button
            variant="outline"
            className="w-full border-brand-black"
            onClick={() => setIsOpen(undefined)}
          >
            لغو
          </Button>
        </div>
      </Modal>
    </div>
  );
};
