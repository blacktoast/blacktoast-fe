import * as Style from './style';
import React from 'react';

interface TextInputProps {
  label: string;
  type: string;
  value: string;
  error: string;
  onChange?: React.FormEventHandler;
  onFocusOut?: React.FocusEventHandler<HTMLInputElement>;
  style?: object;
}

export const InputWithLabel = ({
  label,
  type,
  value = '',
  error,
  onChange,
  onFocusOut,
  style,
}: TextInputProps) => {
  return (
    <Style.container style={{ ...style }}>
      <label htmlFor={label}>{label}</label>
      {error.length > 0 ? (
        <>
          <Style.ErrorTextInput
            onBlur={onFocusOut}
            type={type}
            onChange={onChange}
            value={value}
            name={label}
            id={label}
            aria-describedby={label + 't'}
          />

          <Style.ErrorComment id={label + 't'} aria-live='assertive' role='alert'>
            {error}
          </Style.ErrorComment>
        </>
      ) : (
        <Style.TextInput
          onBlur={onFocusOut}
          type={type}
          onChange={onChange}
          value={value}
          name={label}
          id={label}
        />
      )}
    </Style.container>
  );
};

React.memo(InputWithLabel);
