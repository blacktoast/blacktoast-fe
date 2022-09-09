import Link from 'next/link';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import { Header } from '../components';

const HomePage: NextPage = () => {
  return (
    <>
      <Header></Header>
      <Container>
        <Link href='/pagination?page=1'>
          <StyledLink href='/pagination?page=1'>pagination</StyledLink>
        </Link>
        <Link href='/infinite-scroll'>
          <StyledLink href='/infinite-scroll'>infinite scroll</StyledLink>
        </Link>
      </Container>
    </>
  );
};

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 40px;
`;

const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  width: 240px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  font-size: 24px;

  & + & {
    margin-top: 40px;
  }
`;
