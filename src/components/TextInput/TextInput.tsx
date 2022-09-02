import * as Style from './style';
import React from 'react';

interface TextInputProps {
  label: string;
  type: string;
  onInput?: React.FormEventHandler;
}

export const TextInput = ({ label, type, onInput }: TextInputProps) => {
  const inputOnBlur = () => {
    console.log('test');
  };

  return (
    <Style.container>
      <div>{label}</div>
      <Style.TextInput onBlur={inputOnBlur} type={type} onInput={onInput} />
    </Style.container>
  );
};
