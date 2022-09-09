import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Header, Pagination, ProductList } from '../components';
import { getProducts } from '../apis';
import { useDataFetch, usePagination } from '../hooks';

type RequestType = {
  page: number;
};

const PaginationPage: NextPage = () => {
  const router = useRouter();
  const page = router.query.page;
  const [currentPage, pages, totalPage, setCurrentPage, setTotalCount] = usePagination({});
  const [status, data, getData] = useDataFetch<RequestType, any>({
    apiFunc: getProducts,
  });

  useEffect(() => {
    if (page) getData({ page: Number(page) });
  }, [page, getData]);

  useEffect(() => {
    if (status !== 'Loading') {
      setTotalCount(data.totalCount);
      setCurrentPage(Number(page));
    }

    if (status === 'Error') {
      router.push('./404', router.asPath);
    }
  }, [data, status, page, setCurrentPage, setTotalCount, router]);

  return (
    <>
      <Header />
      {status === 'Loading' || status === 'Error' ? (
        <h1>Loading..</h1>
      ) : (
        <Container>
          <ProductList products={data.products} href={`/products`} />
          <Pagination currentPage={currentPage} pages={pages} totalPage={totalPage} />
        </Container>
      )}
    </>
  );
};

export default PaginationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
