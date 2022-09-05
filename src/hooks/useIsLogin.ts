import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getMe } from '../apis';
import { userState } from '../store';
import { getTokenByCookie, isLogin } from '../utilities';

export const useIsLogin = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [user, setUser] = useRecoilState(userState);
  const [isLoginState, setIsLoginState] = useState(false);

  useEffect(() => {
    const getUserDataFromServer = async () => {
      const userData = await getMe(getTokenByCookie());
      if (userData) {
        setUser({
          id: userData.user.ID,
          name: userData.user.NAME,
          token: userData.accessToken,
        });
      }
    };

    if (isLogin()) setIsLoginState(true);
    else setIsLoginState(false);

    if (isLogin() && user.name.length === 0) getUserDataFromServer();
  }, [user, setUser]);

  return [isLoginState, setIsLoginState];
};
