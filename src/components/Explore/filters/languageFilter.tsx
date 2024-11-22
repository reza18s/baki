import Button from '@/components/base/Button/Button';
import { IcArrowLeft } from '@/components/icons/IcArrowLeft';
import { LanguageModal } from '@/components/shared/modals/languageModal';
import React, { useState } from 'react';

export const LanguageFilter = ({
  value,
  setValue,
}: {
  value?: string;
  setValue: (val?: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <h2 className="my-2 text-sm text-gray-500">زبانی که بداند:</h2>
      <Button
        variant="outline"
        className="flex h-10 w-full items-center justify-between bg-white px-3 py-0 font-medium"
        onClick={() => setIsOpen(true)}
      >
        {value || 'اضافه کردن فیلتر'}
        <IcArrowLeft></IcArrowLeft>
      </Button>
      <LanguageModal
        value={value}
        setValue={setValue}
        setClose={() => setIsOpen(false)}
        isOpen={isOpen}
      ></LanguageModal>
    </div>
  );
};
