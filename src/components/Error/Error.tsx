import * as Style from './style';
interface ErrorProps {
  title: string;
}

export const Error = ({ title }: ErrorProps) => {
  return <Style.wrapper>{title}</Style.wrapper>;
};
