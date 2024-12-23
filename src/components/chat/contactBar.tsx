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
} from '@/graphql/generated/graphql.codegen';
import ViolationReportModal from '../Explore/violationReportModal';
import { optionTexts } from '@/utils';
import { IcCopy } from '../icons/IcCopy';
import { IcPenRound } from '../icons/IcPenRound';

export const ContactBar = ({
  selects,
  clearSelect,
  contact,
}: {
  contact: { id: string; name?: string; mainImage?: string; lastSeen: Date };
  selects: Message[];
  clearSelect: () => void;
}) => {
  const [isOpen, setIsOpen] = useState<'sendMessage' | 'violationReport'>();
  const [addToFavorite] = useAddToFavoriteMutation();
  const [addToBlackList] = useAddToBlackListMutation();
  return (
    <div className="flex h-full w-full items-center justify-between">
      {selects.length > 0 ? (
        <>
          <div className="flex items-center gap-2">
            <IcXCircle
              className="size-5 stroke-black"
              onClick={() => clearSelect()}
            ></IcXCircle>
            <span>{selects.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <IcPenRound></IcPenRound>
            <IcCopy></IcCopy>
            <IcTrash className=""></IcTrash>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <IcArrowRight></IcArrowRight>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                {contact?.name?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h1 className="w-full text-start text-sm font-bold">
                {contact?.name}
              </h1>
              <span className="text-xs text-gray-400">
                {formatLastSeen(contact?.lastSeen)}
              </span>
            </div>
          </div>
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger>
              <IcDotsMenu></IcDotsMenu>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-6 origin-top-right scale-95 transform divide-y rounded-xl px-3 py-1 transition-transform duration-300 ease-in-out">
              <DropdownMenuItem className="flex items-center gap-2 p-0 py-2">
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
                      customToast(res.addToBlackList.message, 'success');
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
              <DropdownMenuItem className="flex items-center gap-2 p-0 py-2">
                <IcTrash></IcTrash>
                <h1 className="text-sm text-brand-red">حذف گفتگو</h1>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
      <ViolationReportModal
        onReportSubmit={() => {}}
        loading={false}
        title="گزارش تخلف"
        options={optionTexts}
        setClose={() => {
          setIsOpen(undefined);
        }}
        isOpen={isOpen === 'violationReport'}
      ></ViolationReportModal>
    </div>
  );
};
