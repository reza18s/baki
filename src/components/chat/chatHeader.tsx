import React, { useState } from 'react';
import { IcXCircle } from '../icons/IcXCircle';
import { IcTrash } from '../icons/IcTrash';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { IcDotsMenu } from '../icons/IcDotsMenu';
import { IcStar } from '../icons/IcStar';
import { customToast } from '../base/toast';
import { IcUserBlackList } from '../icons/IcUserBlackList';
import { IcFlag } from '../icons/IcFlag';
import { IcSearch } from '../icons/IcSearch';
import {
  Chat,
  useAddToBlackListMutation,
  useAddToFavoriteMutation,
  useDelChatMutation,
} from '@/graphql/generated/graphql.codegen';
import { paths } from '@/routes/paths';
import { Link } from 'react-router-dom';
import { socket } from '@/graphql/apollo/socket';
import Button from '../base/Button/Button';
import Modal from '../base/Modal/Modal';
import Checkbox from '../base/Input/checkboxSection/checkbox';
const items = [
  { value: 'all', title: 'همه' },
  { value: 'random', title: 'تصادفی' },
  { value: 'baseOnInterest', title: 'علاقه‌مندی' },
  { value: 'famous', title: 'مشهور' },
];
const mainMenu = [
  {
    url: paths.favorite.main,
    icon: <IcStar className="siz5"></IcStar>,
    title: 'لیست علاقه‌مندی‌ها',
  },
  {
    url: paths.blocked.main,
    icon: <IcUserBlackList className="siz5"></IcUserBlackList>,
    title: 'لیست سیاه',
  },
];
export const ChatHeader = ({
  selects,
  clearSelect,
  filter,
  setFilter,
}: {
  selects: Chat[];
  clearSelect: () => void;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isOpen, setIsOpen] = useState<'deleteChat'>();
  const [addToFavorite] = useAddToFavoriteMutation();
  const [addToBlackList] = useAddToBlackListMutation();
  const [delChat] = useDelChatMutation({ client: socket });
  const [del, setDel] = useState(false);
  return (
    <div className="flex w-full flex-col justify-center gap-3">
      <div className="flex w-full justify-between">
        {selects.length > 0 ? (
          <>
            <div className="flex items-center gap-2">
              <IcXCircle
                className="size-5 stroke-black"
                onClick={() => clearSelect()}
              ></IcXCircle>
              <span>{selects.length}</span>
            </div>
            <div className="flex items-center">
              <IcTrash
                className="ml-4"
                onClick={() => setIsOpen('deleteChat')}
              ></IcTrash>
              <DropdownMenu dir="rtl">
                <DropdownMenuTrigger>
                  <IcDotsMenu></IcDotsMenu>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="ml-6 divide-y rounded-xl px-3 py-1">
                  <DropdownMenuItem
                    className="flex items-center gap-2 p-0 py-2"
                    onClick={() => {
                      addToFavorite({
                        variables: {
                          favoriteIds: selects
                            .map((el) => el.participants?.[0]?.id)
                            .filter((id) => id) as string[],
                        },
                        onCompleted: (res) => {
                          customToast(res.addToFavorite.message, 'success');
                          clearSelect();
                        },
                      });
                    }}
                  >
                    <IcStar className="siz5"></IcStar>
                    <h1 className="text-sm">افزودن به علاقه‌مندی‌ها</h1>
                  </DropdownMenuItem>{' '}
                  <DropdownMenuItem
                    className="flex items-center gap-2 p-0 py-2"
                    onClick={() => {
                      addToBlackList({
                        variables: {
                          blockedId: selects
                            .map((el) => el.participants?.[0]?.id)
                            .filter((id) => id) as string[],
                        },
                        onCompleted: (res) => {
                          customToast(res.addToBlackList || '', 'success');
                          clearSelect();
                        },
                      });
                    }}
                  >
                    <IcUserBlackList className="siz5"></IcUserBlackList>
                    <h1 className="text-sm">افزودن به لیست سیاه</h1>
                  </DropdownMenuItem>{' '}
                  {selects.length === 1 && (
                    <DropdownMenuItem className="flex items-center gap-2 p-0 py-2">
                      <IcFlag></IcFlag>
                      <h1 className="text-sm text-brand-red">گزارش تخلف</h1>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        ) : (
          <>
            <Link to={paths.chat.search}>
              <IcSearch className="size-6"></IcSearch>
            </Link>
            <h1 className="text-center font-iransans text-lg font-bold">
              پیام‌ها
            </h1>
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger>
                <IcDotsMenu></IcDotsMenu>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="ml-6 divide-y rounded-xl px-3 py-1">
                {mainMenu.map((val) => (
                  <DropdownMenuItem
                    key={val.title}
                    className="flex items-center gap-2 p-0 py-2"
                  >
                    <Link
                      to={val.url}
                      className="flex w-full items-center gap-2"
                    >
                      {val.icon}
                      <h1 className="text-sm">{val.title}</h1>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
      <div className="scrollbar-hide flex items-center gap-2 overflow-scroll pl-2">
        {items.map((val, i) => (
          <div
            key={i}
            className={`${
              filter === val.value
                ? 'border border-brand-yellow bg-brand-yellow fill-brand-black text-brand-black'
                : 'border border-gray-300 text-gray-500'
            } flex h-7 items-center rounded-lg px-4 font-iransans text-sm font-bold transition-all duration-300 ease-in-out`}
            onClick={() => setFilter(val.value)}
          >
            {val.title}
          </div>
        ))}
      </div>
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

        <div className="flex gap-2">
          <Checkbox
            checked={del}
            onChange={() => setDel((prev) => !prev)}
            className="rounded-lg"
          ></Checkbox>
          <span className="text-center text-sm">حذف برای دو طرف</span>
        </div>
        <div className="flex w-full flex-col gap-2">
          <Button
            variant="danger-outline"
            className="w-full"
            onClick={() => {
              if (selects) {
                delChat({
                  variables: {
                    chatsId: selects.map((chat) => chat.id),
                    del,
                  },
                });
                clearSelect();
                setIsOpen(undefined);
              }
            }}
          >
            حذف {selects.length} گفتگو
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
