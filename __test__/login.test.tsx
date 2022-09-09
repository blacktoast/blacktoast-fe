import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RecoilRoot } from 'recoil';
import LoginPage from '../src/pages/login';

const renderLoginPage = () => {
  const loginPage = render(
    <RecoilRoot>
      <LoginPage />
    </RecoilRoot>
  );
  const idInput = loginPage.getByLabelText('아이디');
  const passwordInput = loginPage.getByLabelText('비밀번호');
  const loginSubmitBtn = loginPage.getByRole('button', { name: '로그인' });

  return { loginPage, idInput, passwordInput, loginSubmitBtn };
};

describe('login page', () => {
  it('처음 로그인 페이지 렌더링', () => {
    const { idInput, passwordInput, loginSubmitBtn } = renderLoginPage();

    expect(idInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginSubmitBtn).toBeDisabled();
  });

  it('id입력 에러검증', () => {
    const { loginPage, idInput, passwordInput, loginSubmitBtn } = renderLoginPage();
    fireEvent.change(idInput, { target: { value: 'test' } });
    fireEvent.focusOut(idInput);
    const idError = loginPage.getByRole('alert');

    expect(loginSubmitBtn).toBeDisabled();
    expect(idError).toBeInTheDocument();
  });

  it('password 입력 에러검증', () => {
    const { loginPage, passwordInput, loginSubmitBtn } = renderLoginPage();
    fireEvent.change(passwordInput, { target: { value: 'test' } });
    fireEvent.focusOut(passwordInput);

    const passwordError = loginPage.getByRole('alert');

    expect(loginSubmitBtn).toBeDisabled();
    expect(passwordError.textContent).toBe('올바른 비밀번호 형식으로 입력해주세요.');
  });

  it('올바른 id,password 입력시 로그인 버튼 활성화', () => {
    const { idInput, passwordInput, loginSubmitBtn } = renderLoginPage();
    fireEvent.change(idInput, { target: { value: 'testa' } });
    fireEvent.change(passwordInput, { target: { value: 'test@@@A124' } });
    expect(loginSubmitBtn).toBeEnabled();
  });

  it('로그인 후 logout 버튼 활성화 ', async () => {
    const { loginPage, idInput, passwordInput, loginSubmitBtn } = renderLoginPage();
    fireEvent.change(idInput, { target: { value: 'testa' } });
    fireEvent.change(passwordInput, { target: { value: 'test@@@A124' } });
    fireEvent.submit(loginSubmitBtn);

    await loginPage.findByText('logout');
  });
});
