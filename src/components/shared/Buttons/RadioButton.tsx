import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Controller } from "react-hook-form";

interface Item {
  value: string;
  label: string;
}

interface RadioButtonProps {
  items: Item[];
  control: any;
  name: string;
}

export default function RadioButton(props: RadioButtonProps) {
  return (
    <FormControl sx={{ width: "100%", padding: "8px" }}>
      <Controller
        name="gender"
        control={props.control}
        defaultValue={null}
        render={({ field }) => (
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            {...field}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "100%",
            }}
          >
            {props.items.map((item) => (
              <FormControlLabel
                key={item.value}
                value={item.value}
                dir="ltr"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor:
                    field.value === item.value ? "#FEF3C7" : "#F1F5F9",
                  borderRadius: "12px",
                  padding: "16px",
                  width: "calc(100% - 16px)", // تنظیم فاصله از کناره‌ها
                  margin: "0 auto", // هم‌تراز کردن در وسط والد
                }}
                control={
                  <Radio
                    sx={{
                      color: "#64748B",
                      "&.Mui-checked": {
                        color: "#ffcc4e",
                      },
                      width: "24px",
                      height: "24px",
                    }}
                  />
                }
                label={
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "medium",
                      color: "#64748B",
                    }}
                  >
                    {item.label}
                  </span>
                }
              />
            ))}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
}
