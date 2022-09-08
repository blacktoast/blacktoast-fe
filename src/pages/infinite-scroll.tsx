import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Header, ProductList } from '../components/';
import { useInView } from '../hooks/useInView';
import { useRecoilState } from 'recoil';
import { infinityState } from '../store';
import { getProducts } from '../apis/products';
import { useRouter } from 'next/router';
import { useDataFetch } from '../hooks';

type RequestType = {
  page: number;
};

const InfiniteScrollPage: NextPage = () => {
  const [ref, inView] = useInView();
  const [pageState, setPageState] = useRecoilState(infinityState);
  const router = useRouter();
  const [status, data, getData] = useDataFetch<RequestType, any>({
    apiFunc: getProducts,
  });

  useEffect(() => {
    window.scrollTo(0, pageState.offsetY);
  }, [pageState.offsetY]);

  useEffect(() => {
    const isFirst = pageState.products.length === 0;

    if (isFirst) {
      getData({ page: 1 });
    }
    if (inView) {
      getData({ page: pageState.currentPage + 1 });
    }
  }, [inView]);

  useEffect(() => {
    if (status !== 'Loading') {
      setPageState({
        ...pageState,
        currentPage: pageState.currentPage + 1,
        products: [...pageState.products, ...data.products],
        totalCount: data.totalCount,
      });
    }
  }, [data, status]);

  const productOnClick = (id: string) => {
    setPageState({ ...pageState, offsetY: window.scrollY });
    router.push(`/products/${id}`);
  };

  const isFinishInfinityScroll = () => {
    return pageState.products.length !== pageState.totalCount;
  };

  return (
    <>
      <Header />
      <Container>
        <ProductList products={pageState.products} onClick={productOnClick} />
        {isFinishInfinityScroll() && (
          <div ref={ref}>
            {pageState.products.length} {pageState.totalCount}
          </div>
        )}
      </Container>
    </>
  );
};

export default InfiniteScrollPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
