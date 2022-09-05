import Link from 'next/link';
import * as Style from './style';
import { useEffect, useState } from 'react';
import { isLogin } from '../../utilities';
import { useRecoilState } from 'recoil';
import { userState } from '../../store';
import { getMe } from '../../apis';
import { getTokenByCookie } from '../../utilities/index';

export const Header = ({}) => {
  const [isLoginState, setISLoginState] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const getUserDataFromServer = async () => {
      const userData = await getMe(getTokenByCookie());
      if (userData) {
        setUser({
          id: userData.user.ID,
          name: userData.user.NAME,
        });
      }
    };

    if (isLogin()) setISLoginState(true);
    else setISLoginState(false);

    if (isLogin() && user.name.length === 0) getUserDataFromServer();
  }, [user, setUser]);

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
