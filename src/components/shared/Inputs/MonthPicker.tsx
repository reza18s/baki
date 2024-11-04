import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller } from "react-hook-form";

export default function MonthPicker(props: { control: any; name: string }) {
  const items = [
    { label: "فروردین", key: 0 },
    { label: "اردیبهشت", key: 1 },
    { label: "خرداد", key: 2 },
    { label: "تیر", key: 3 },
    { label: "مرداد", key: 4 },
    { label: "شهریور", key: 5 },
    { label: "مهر", key: 6 },
    { label: "آبان", key: 7 },
    { label: "آذر", key: 8 },
    { label: "دی", key: 9 },
    { label: "بهمن", key: 10 },
    { label: "اسفند", key: 11 },
  ];

  return (
    <Controller
      control={props.control}
      name={props.name}
      defaultValue={null}
      render={({ field }) => (
        <Autocomplete
          {...field}
          disablePortal
          options={items}
          getOptionLabel={(option) => option.label}
          className="!text-center text-base font-bold text-[#1a1d1e] h-[48px]"
          clearIcon={null} // حذف علامت ضربدر
          popupIcon={null} // حذف علامت فلش
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              borderWidth: "1.5px",
              borderColor: "#1a1d1e",
              paddingRight: "0 !important",
              height: "48px",
              width: "90px",
            },
            "& .MuiAutocomplete-input": {
              textAlign: "right", // تنظیم متن به راست
            },
            "& .MuiInputBase-input": {
              padding: "8px 14px", // تنظیم پدینگ برای ظاهری بهتر
              textAlign: "right", // تنظیم متن به راست
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className="!text-center h-[48px]"
              placeholder="انتخاب کنید"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: null, // حذف آیکون های پایانی
              }}
            />
          )}
        />
      )}
    />
  );
}
