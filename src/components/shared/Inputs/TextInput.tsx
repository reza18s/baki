import { Controller } from "react-hook-form";

export default function TextInput(props: {
    control: any,
    icon?: any,
    name: string,
    value: string,
    placeholder: string,
    multiline?: boolean,
    rows?: number,
}) {
    return (
        <div className={`rounded-[12px] border-[1.5px] border-black flex items-center justify-between gap-x-2 py-[16px] pr-[16px] pl-[12px] w-full ${ props.value?.length > 0 ? "border-b-[4px]" : ""}`}>
        {props.icon}
        <Controller
          name={props.name}
          control={props.control}
          defaultValue={null}
          render={({ field }) => (
            props.multiline === true
            ?
            <textarea
              {...field}
              rows={props.rows}
              placeholder={props.placeholder}
              className="bg-white border-none outline-none w-full"
            />
            :
            <input
              {...field}
              type="text"
              placeholder={props.placeholder}
              className="bg-white border-none outline-none w-full"
            />
          )}
        />
      </div>
    )
}