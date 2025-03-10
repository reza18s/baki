import React, { FC, useState } from 'react';
import { Formik } from 'formik';
import BottomSheetModal from '../base/Modal/BottomSheetModal';
import Button from '../base/Button/Button';
import Checkbox from '../base/Input/checkboxSection/checkbox';
import {
  useAddToBlackListMutation,
  useCreateReportMutation,
} from '@/graphql/generated/graphql.codegen';
import { customToast } from '../base/toast';

interface ViolationReportModalProps {
  options: {
    label: string;
    icon?: ((select: boolean) => React.ReactNode) | React.ReactNode;
  }[];
  isOpen: boolean;
  title: string;
  loading: boolean;
  id: string;
  setClose: () => void;
  onReportSubmit?: (message: string, options: string[], block: boolean) => void;
}

const ViolationReportModal: FC<ViolationReportModalProps> = ({
  options,
  isOpen,
  title,
  id,
  setClose,
  onReportSubmit,
}) => {
  const [optionState, setOptionState] = useState<boolean[]>(
    options.map(() => false),
  );
  const [Report, { loading }] = useCreateReportMutation();
  const [addToBlackList, { loading: blocking }] = useAddToBlackListMutation();
  return (
    <BottomSheetModal
      closeOnClickOverlay
      isOpen={isOpen}
      onRequestClose={setClose}
      onCloseEnd={setClose}
      className="flex flex-col items-center justify-center px-5 py-2 pb-6"
    >
      <h1 className="mt-4 text-lg font-bold text-brand-red">{title}</h1>
      <span className="mx-4 text-center text-xs text-gray-500">
        خیالتون راحت! گزارش شما ناشناس خواهد بود و کسی متوجه نمی‌شود که شما آنها
        را گزارش و یا مسدود کرده اید.
      </span>
      <div className="flex w-full flex-col items-center justify-center">
        <Formik
          onSubmit={(values) => {
            if (!loading) {
              if (onReportSubmit) {
                onReportSubmit(
                  values.message,
                  options
                    .filter((_, index) => optionState[index])
                    .map((val) => val.label),
                  values.block,
                );
              } else {
                Report({
                  variables: {
                    reportedId: id,
                    description: values.message,
                    reasons: options
                      .filter((_, index) => optionState[index])
                      .map((val) => val.label),
                  },
                  onCompleted() {
                    customToast('گزارش با موفقیت ثبت شد', 'success');
                  },
                  onError: (err) => {
                    customToast(err.message, 'error');
                  },
                });
                if (values.block) {
                  addToBlackList({
                    variables: { blockedId: id },
                    onCompleted() {
                      customToast('کاربر به لیست  سیاه اضافه شد', 'success');
                    },
                    onError: (err) => {
                      customToast(err.message, 'error');
                    },
                  });
                }
              }
            }
          }}
          initialValues={
            { message: '', block: false } as { message: string; block: boolean }
          }
          validate={(values) => {
            const errors: { message?: string } = {};
            if (
              optionState.filter((option) => option).length < 1 ||
              values.message.trim().length < 1
            ) {
              errors.message =
                'حداقل یک گزینه را انتخاب کنید یا توضیحات را وارد کنید';
              return errors;
            } else {
              return {};
            }
          }}
        >
          {({
            errors,
            handleSubmit,
            values,
            handleChange,
            setErrors,
            setValues,
          }) => (
            <div className="flex w-full flex-col gap-2">
              <div className="mt-3 flex flex-col gap-2">
                {options.map((item, index) => (
                  <Option
                    key={index}
                    text={item.label}
                    icon={item.icon}
                    selected={optionState[index]}
                    onChange={(value) => {
                      const newOptions = [...optionState];
                      newOptions[index] = value;
                      setOptionState(newOptions);
                      if (value) {
                        setErrors({});
                      }
                    }}
                  />
                ))}
              </div>
              <textarea
                name="message"
                className="mt-2 box-border w-full resize-none rounded-lg border-[1.5px] border-solid border-brand-black bg-white p-2 font-vazir text-[12px] text-gray-800 outline-none"
                rows={4}
                onChange={handleChange}
                value={values.message}
                placeholder="توضیحات را اینجا بنویسید"
              />
              <div className="w-full text-center text-brand-red">
                {errors.message ?? ''}
              </div>
              <Button
                variant="danger"
                className="rounded-8 h-10 w-full p-0 text-sm"
                type="submit"
                onClick={() => {
                  setValues({ block: false, message: values.message });
                  handleSubmit();
                }}
                loading={loading}
              >
                گزارش کاربر
              </Button>
              <Button
                variant="danger-outline"
                className="rounded-8 h-10 w-full border border-brand-red p-0 text-sm"
                type="submit"
                onClick={() => {
                  setValues({ block: true, message: values.message });
                  handleSubmit();
                }}
                loading={loading || blocking}
              >
                گزارش و مسدودکردن کاربر
              </Button>
            </div>
          )}
        </Formik>
      </div>
    </BottomSheetModal>
  );
};

export default ViolationReportModal;

const Option: React.FC<{
  text: string;
  selected: boolean;
  onChange: (value: boolean) => void;
  icon?: ((select: boolean) => React.ReactNode) | React.ReactNode;
}> = ({ text, selected, onChange, icon }) => {
  return (
    <div
      className={`flex h-12 w-full items-center justify-between rounded-xl border-[1.5px] border-solid px-3 py-4 transition-colors active:bg-gray-200 active:bg-opacity-50 ${
        selected
          ? 'border-warning-100 bg-[#FFF7E5]'
          : 'border-gray-50 bg-gray-50'
      }`}
      onClick={() => onChange(!selected)}
    >
      <h2 className="flex gap-1 text-sm font-medium">
        {!!icon && (typeof icon === 'function' ? icon(selected) : icon)}
        {text}
      </h2>
      <Checkbox checked={selected} readOnly className="rounded-lg"></Checkbox>
    </div>
  );
};
