import { Controller } from 'react-hook-form';

export default function TextInput(props: {
  control: any;
  icon?: any;
  name: string;
  value: string;
  placeholder: string;
  multiline?: boolean;
  rows?: number;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full items-center justify-between gap-x-2 rounded-[12px] border-[1.5px] border-black py-4 pl-[12px] pr-4 ${props.className || ''} ${props.value?.length > 0 ? 'border-b-[4px]' : ''}`}
    >
      {props.icon}
      <Controller
        name={props.name}
        control={props.control}
        defaultValue={null}
        render={({ field }) =>
          props.multiline === true ? (
            <textarea
              {...field}
              rows={props.rows}
              placeholder={props.placeholder}
              className="w-full border-none bg-white outline-none"
            />
          ) : (
            <input
              {...field}
              type="text"
              placeholder={props.placeholder}
              className="w-full border-none bg-white outline-none"
            />
          )
        }
      />
    </div>
  );
}
