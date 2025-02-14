import { Control, Controller } from 'react-hook-form';
import { months } from '@/constants';
import { Dropdown } from 'antd';
import { useEffect, useState } from 'react';

export default function MonthPicker(props: {
  control: Control<
    {
      month?: {
        label: string;
        key: number;
      };
      year: string;
    },
    any
  >;
}) {
  const [search, setSearch] = useState<string | undefined>();
  useEffect(() => {
    setSearch(props.control._formValues?.month?.label);
  }, [props.control._formValues?.month?.label]);
  return (
    <Controller
      control={props.control}
      name={'month'}
      defaultValue={undefined}
      render={({ field }) => (
        <Dropdown
          menu={{
            items: months
              .filter((e) => e.label.includes(search || ''))
              .map((val) => ({
                label: (
                  <div
                    onClick={() => {
                      setSearch(val.label);
                      field.onChange(val);
                    }}
                    className="w-full border-b p-2 font-iransans font-semibold"
                  >
                    {val.label}
                  </div>
                ),
                key: val.key,
              })),
            style: {
              maxHeight: '30vh', // Limit the height of the dropdown
              overflowY: 'auto', // Enable scrolling
            },
          }}
          trigger={['click']}
          className="w-[110px]"
          rootClassName="border-2 rounded-lg border-black"
        >
          <input
            onClick={(e) => e.preventDefault()}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (months.find((ob) => ob.label === e.target.value)) {
                field.onChange(
                  months.find((ob) => ob.label === e.target.value),
                );
              }
            }}
            className="flex h-[48px] w-full cursor-pointer items-center justify-start rounded-[12px] border-[1.5px] border-brand-black bg-white p-2 text-base font-bold"
            placeholder=""
          />
        </Dropdown>
      )}
    />
  );
}
