import Link from 'next/link';
import * as Style from './style';
import { useRecoilState } from 'recoil';
import { userState } from '../../store';
import { getMe } from '../../apis';
import { getTokenByCookie } from '../../utilities/index';
import { useIsLogin } from '../../hooks/useIsLogin';

export const Header = ({}) => {
  const [isLoginState, setISLoginState] = useIsLogin();
  const [user, setUser] = useRecoilState(userState);

  const logoutOnClick = () => {};

  return (
    <Style.Header>
      <Link href='/'>
        <Style.Title>HAUS</Style.Title>
      </Link>
      {isLoginState ? (
        <Style.userInfo>
          <div>{user.name}</div>
          <p onClick={logoutOnClick}>logout</p>
        </Style.userInfo>
      ) : (
        <Link href='/login'>
          <p>login</p>
        </Link>
      )}
    </Style.Header>
  );
};
