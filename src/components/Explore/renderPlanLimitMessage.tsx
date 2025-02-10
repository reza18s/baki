import React, { useEffect, useState } from 'react';
import { IcSearchTypeIntrests } from '../icons/IcSearchTypeIntrests';
import Button from '../base/Button/Button';
import { useIonRouter } from '@ionic/react';
import { paths } from '@/routes/paths';
import { useGetMeQuery } from '@/graphql/generated/graphql.codegen';

export const RenderPlanLimitMessage = ({
  searchType,
}: {
  searchType: string;
}) => {
  const hs = useIonRouter();
  const { data } = useGetMeQuery();
  const lastRoll = new Date(data?.getMe.planUse?.lastRoll || Date.now());
  const initialTimeLeft =
    12 * 60 * 60 - Math.floor((Date.now() - lastRoll.getTime()) / 1000);

  const [timeLeft, setTimeLeft] = useState<number>(
    initialTimeLeft > 0 ? initialTimeLeft : 0,
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (data?.getMe.planUse?.lastRoll && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const messages: { [key: string]: string } = {
    random: 'هر 24 ساعت میتوانید 3 بار از “همسفر تصادفی” استفاده کنید.',
    baseOnInterest:
      'هر 24 ساعت می‌توانید 1 بار از “همسفر برمبنای علایق” استفاده کنید.',
    famous: 'هر 24 ساعت میتوانید 1 بار از “همسفر مشهور” استفاده کنید.',
  };
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-2xl bg-warning-50 p-6">
      <IcSearchTypeIntrests className="size-9 rotate-[-120deg]" />
      <h1 className="text-center text-sm font-bold">{messages[searchType]}</h1>
      <div className="flex w-full flex-col gap-2">
        <span className="text-center text-[10px]">
          درصورت تمایل به رفع محدودیت‌ها نیاز به تهیه اشتراک ویژه دارید!
        </span>
        <Button
          className="h-10 w-full"
          onClick={() => hs.push(paths.plans.main)}
        >
          مشاهده اشتراک‌های ویژه
        </Button>
        {data?.getMe.planUse?.lastRoll && (
          <Button variant="outline" className="border-black">
            {formatTime(timeLeft)} تا شانس مجدد
          </Button>
        )}
      </div>
    </div>
  );
};
