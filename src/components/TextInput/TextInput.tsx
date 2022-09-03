import * as Style from './style';
import React from 'react';

interface TextInputProps {
  label: string;
  type: string;
  value: string;
  error: string;
  onChange?: React.FormEventHandler;
  onFocusOut?: React.FocusEventHandler<HTMLInputElement>;
}

export const TextInput = ({
  label,
  type,
  value = '',
  error,
  onChange,
  onFocusOut,
}: TextInputProps) => {
  return (
    <Style.container>
      <div>{label}</div>
      {error.length > 0 ? (
        <>
          <Style.ErrorTextInput onBlur={onFocusOut} type={type} onChange={onChange} value={value} />
          <Style.ErrorComment>{error}</Style.ErrorComment>
        </>
      ) : (
        <Style.TextInput onBlur={onFocusOut} type={type} onChange={onChange} value={value} />
      )}
    </Style.container>
  );
};
