import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getMe } from '../apis';
import { userState } from '../store';
import { getTokenByCookie, isLogin } from '../utilities';

export const useIsLogin = () => {
  const [user, setUser] = useRecoilState(userState);
  const [isLoginState, setISLoginState] = useState(false);

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

  return [isLoginState, setISLoginState];
};
