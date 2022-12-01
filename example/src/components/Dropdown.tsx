import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { v4 as uuidv4 } from 'uuid';

import { Div } from './Layout';

type DropdownOption = string
  | {
      value: string | number;
      text: string;
    };

type DropdownProps = {
  defaultValue?: string;
  label?: string;
  localStorageKey?: string;
  options: DropdownOption[];
  onChange: (value: any) => void,
};

export default function Dropdown(props: DropdownProps) {
  const { 
    localStorageKey, 
    label, 
    defaultValue, 
    options 
  } = props;
  const labelId = uuidv4();

  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(
    () => {
      const storedString: string | null = localStorageKey
        ? localStorage.getItem(localStorageKey)
        : null;
      return storedString || defaultValue;
    },
  );

  const selectedValueExists = options.find((option: any) => {
    // const t = typeof option;
    const obj = option as any;
    const value = typeof obj === 'object' ? obj.value : option;
    return selectedValue === value;
  });
  const auxOptions = !selectedValueExists 
    ? [{ value: selectedValue, text: selectedValue, aux: true }]
    : []; 

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    if (localStorageKey) {
      localStorage.setItem(localStorageKey, value);
    }
    setSelectedValue(value);
    props.onChange && props.onChange(value);
  };

  return (
    <FormControl>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <Select
        labelId={labelId}
        value={selectedValue}
        onChange={handleChange}
      >
        {[...options, ...auxOptions].map((option) => {
          // const t = typeof option;
          const obj = option as any;
          const text = typeof obj === 'object' ? obj.text : option;
          const value = typeof obj === 'object' ? obj.value : option;
          const aux = typeof obj === 'object' ? obj.aux === true : false;
          return (
            <MenuItem key={value} value={value}>
              {
                !aux && text
              }
              {
                aux && <Div opacity={0.5} fontStyle="italic">{text}</Div>
              }
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
