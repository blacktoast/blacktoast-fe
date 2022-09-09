import styled from 'styled-components';

export const TextInput = styled.input`
  margin-top: 8px;
  padding: 16px;
  background-color: #f7f7fa;
  border-radius: 12px;
`;

export const ErrorTextInput = styled.input`
  margin-top: 8px;
  padding: 16px;
  background-color: #fdedee;
  border-radius: 12px;
`;

export const ErrorComment = styled.span`
  margin-top: 8px;
  font-weight: 400;
  font-size: 13px;
  color: #ed4e5c;
`;

export const Label = styled.label`
  font-weight: 700;
  font-size: 13px;
  color: #6c6c7d;
`;

export const container = styled.div`
  display: flex;
  flex-direction: column;
`;
