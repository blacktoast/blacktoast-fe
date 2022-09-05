import type { NextPage } from 'next';
import React, { ChangeEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextInput } from '../components/';
import { userLogin } from '../apis';
import { isLogin, setCookieForToken } from '../utilities/index';
import { useRecoilState } from 'recoil';
import { userState } from '../store/index';
import { useRouter } from 'next/router';
import { Header } from '../components/Header';
import { ERROR_INPUT_ID, ERROR_INPUT_PASSWORD } from '../utilities/constants';

const LoginPage: NextPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    id,
    password,
  });
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    if (isLogin()) router.push('/');
  }, [router]);

  const isLoginBtnAble = () => {
    if (
      id.length === 0 ||
      password.length === 0 ||
      error.id.length > 0 ||
      error.password.length > 0
    )
      return false;

    return true;
  };

  const idOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setId(value);
    if (idValidate(value)) {
      setError({ ...error, id: '' });
    }
  };

  const idFocusOut = () => {
    if (!idValidate(id)) {
      setError({ ...error, id: ERROR_INPUT_ID });
    }
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
    if (passwordValidate(value)) {
      setError({ ...error, password: '' });
    }
  };

  const passwordFocusOut = () => {
    if (!passwordValidate(password)) {
      setError({ ...error, password: ERROR_INPUT_PASSWORD });
    }
  };

  const idValidate = (input: string) => {
    const regId = /[a-zA-Z0-9]{5,30}/;
    if (!regId.test(input)) {
      return false;
    }
    return true;
  };

  const passwordValidate = (input: string) => {
    const regPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,30}/;
    if (!regPassword.test(input)) {
      return false;
    }
    return true;
  };

  const loginOnClick = async () => {
    try {
      if (idValidate(id) && passwordValidate(password)) {
        const userData = await userLogin({ id, password });
        if (userData) {
          setCookieForToken(userData?.accessToken);
          setUser({
            id: userData.user.ID,
            name: userData.user.NAME,
          });
          router.push('/');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <Form>
        <TextInput
          label='아이디'
          type='text'
          value={id}
          error={error.id}
          onChange={idOnChange}
          onFocusOut={idFocusOut}
        />
        <TextInput
          label='비밀번호'
          type='password'
          value={password}
          error={error.password}
          onChange={onPasswordChange}
          onFocusOut={passwordFocusOut}
        />
        {isLoginBtnAble() ? (
          <LoginButton type='submit' onClick={loginOnClick}>
            로그인
          </LoginButton>
        ) : (
          <LoginButton disabled>로그인</LoginButton>
        )}
      </Form>
    </>
  );
};

export default LoginPage;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  &:disabled {
    background-color: #e2e2ea;
  }
`;
