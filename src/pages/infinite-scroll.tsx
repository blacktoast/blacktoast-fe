import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ProductList } from '../components/';
import { useInView } from '../hooks/useInView';
import { useRecoilState } from 'recoil';
import { infinityState } from '../store';
import { getProducts } from '../apis/products';
import { useRouter } from 'next/router';

const InfiniteScrollPage: NextPage = () => {
  const [ref, inView] = useInView();
  const [pageState, setPageState] = useRecoilState(infinityState);
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, pageState.offsetY);
  }, [pageState.offsetY]);

  useEffect(() => {
    const getData = async (page: number) => {
      try {
        const data = await getProducts({ page });
        setPageState({
          ...pageState,
          currentPage: page,
          products: [...pageState.products, ...data.products],
          totalCount: data.totalCount,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (pageState.products.length === 0) getData(1);
    if (inView) {
      getData(pageState.currentPage + 1);
    }
  }, [inView]);

  const productOnClick = (id: string) => {
    setPageState({ ...pageState, offsetY: window.scrollY });
    router.push(`/products/${id}`);
  };

  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        <Link href='/login'>
          <p>login</p>
        </Link>
      </Header>
      <Container>
        <ProductList products={pageState.products} onClick={productOnClick} />

        {pageState.products.length !== pageState.totalCount && (
          <div ref={ref} style={{ height: '50px' }}>
            {pageState.products.length} {pageState.totalCount}
          </div>
        )}
      </Container>
    </>
  );
};

export default InfiniteScrollPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
