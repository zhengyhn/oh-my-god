import React from "react";
import { IOption } from "../lib/types";
import { Select } from "element-react";

type PropsType = {
  placeholder: string;
  value?: string;
  onChange: any;
  options: IOption<string>[];
};
export const CommonSelect = (props: PropsType) => {
  const { placeholder, value, onChange, options } = props;
  return (
    <Select value={value} clearable={true} placeholder={placeholder} onChange={onChange}>
      {options.map(option => {
        return (
          <Select.Option
            key={option.value}
            value={option.value}
            label={option.label}
          />
        );
      })}
    </Select>
  );
};
