import { useState } from 'react';
import { DualRangeSlider } from './dualRangeSlider';

export const AgeFilter = () => {
  const [values, setValues] = useState([0, 100]);
  return (
    <div>
      <h2 className="my-2 text-sm text-gray-500">وضعیت:</h2>
      <div className="flex h-28 w-full flex-col justify-between rounded-xl border border-gray-300 bg-white p-4 font-medium text-black">
        بین {Math.min(values[0], values[1])} تا {Math.max(values[0], values[1])}{' '}
        سال
        <DualRangeSlider
          value={values}
          onValueChange={setValues}
          min={0}
          max={100}
          step={1}
          className="mt-3"
        />
        <span className="text-xs text-gray-500">
          بازه سنی مد نظر خود را انتخاب کنید.
        </span>
      </div>
    </div>
  );
};
