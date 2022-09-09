import Link from 'next/link';
import * as Style from './style';
import { useRecoilState } from 'recoil';
import { userState } from '../../store';
import { useIsLogin } from '../../hooks/useIsLogin';
import { userLogout } from '../../apis';

export const Header = ({}) => {
  const [isLoginState, setIsLoginState] = useIsLogin();
  const [user, setUser] = useRecoilState(userState);

  const logoutOnClick = async () => {
    if (await userLogout(user.token)) {
      setUser({ id: '', name: '', token: '' });
    }

    setIsLoginState(false);
  };

  return (
    <Style.Header>
      <Link href='/'>
        <Style.Title href='/'>HAUS</Style.Title>
      </Link>
      {isLoginState ? (
        <Style.userInfo>
          <div>{user.name}</div>
          <p onClick={logoutOnClick}>logout</p>
        </Style.userInfo>
      ) : (
        <Link href='/login'>login</Link>
      )}
    </Style.Header>
  );
};
