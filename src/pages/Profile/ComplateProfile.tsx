import AppBar from '@/components/layout/Header/AppBar';
import { Page } from '@/components/layout/Page';
import { getCardsData } from '@/components/Profile/cardsData';
import CustomCard from '@/components/Profile/customCard';
import { useLocalStore } from '@/store/useLocalStore';
import { useMemo } from 'react';

export default function CompleteProfile() {
  const userInfo = useLocalStore((store) => store.userInfo);
  const calculateCompletionPercentage = useLocalStore(
    (store) => store.calculateCompletionPercentage,
  );

  // Memoized cards data to avoid unnecessary re-renders
  const cardsData = useMemo(() => getCardsData(userInfo), [userInfo]);

  return (
    <Page
      contentClassName="flex h-full w-full flex-col items-center p-6 pt-20"
      header={
        <AppBar
          title={`${calculateCompletionPercentage()} درصد تکمیل شده`}
        ></AppBar>
      }
    >
      {/* Page Header */}
      <div className="flex w-full flex-col items-center gap-y-3 text-center">
        <h1 className='font-bold text-[18px]'>پروفایل خودتو تکمیل کن!</h1>
        <p className="text-sm font-medium text-gray-500">
          هر چقدر در تکمیل اطلاعات صادقتر باشید افرادی با شرایط مشابه بیشتری به
          شما معرفی خواهد شد و امکان مسافرت مناسب‌تر برا شما فراهم می‌شود.
        </p>
      </div>
      {/* Cards Section */}
      <div className="grid w-full grid-cols-2 gap-5 px-2 py-4">
        {cardsData.map((card, index) => (
          <CustomCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            url={card.url}
            status={card.status}
          />
        ))}
      </div>
    </Page>
  );
}
