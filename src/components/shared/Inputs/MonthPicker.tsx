import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller } from 'react-hook-form';
import { months } from '@/lib/constants';

export default function MonthPicker(props: { control: any; name: string }) {
  return (
    <Controller
      control={props.control}
      name={props.name}
      defaultValue={null}
      render={({ field }) => (
        <Autocomplete
          {...field}
          options={months}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.key === value?.key}
          disablePortal
          onChange={(_, selectedOption) => field.onChange(selectedOption)}
          value={field.value || null}
          className="h-[48px] !text-center text-base font-bold text-brand-black"
          clearIcon={null} // حذف علامت ضربدر
          popupIcon={null} // حذف علامت فلش
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              borderWidth: '1.5px',
              borderColor: '#1a1d1e',
              paddingRight: '0 !important',
              height: '48px',
              width: '120px',
            },
            '& .MuiAutocomplete-input': {
              textAlign: 'right', // تنظیم متن به راست
            },
            '& .MuiInputBase-input': {
              padding: '8px 14px', // تنظیم پدینگ برای ظاهری بهتر
              textAlign: 'right', // تنظیم متن به راست
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className="h-[48px] !text-center"
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
