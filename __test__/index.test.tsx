import { render, screen } from '@testing-library/react';
import Home from '../src/pages/index';
import '@testing-library/jest-dom';
import { RecoilRoot } from 'recoil';
import { Header } from '../src/components';

describe('Home', () => {
  it('renders a heading', () => {
    render(
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    );

    const header = screen.getByRole('banner');

    expect(header).toBeInTheDocument();
  });
});

describe('header', () => {
  it('renders a heading', () => {
    render(
      <RecoilRoot>
        <Header />
      </RecoilRoot>
    );
    const login = screen.getByRole('link', { name: 'login' });
    const logo = screen.getByRole('link', { name: 'HAUS' });

    expect(login).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });
});
