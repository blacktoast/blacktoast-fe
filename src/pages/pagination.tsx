import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import { Header } from '../components';
import { getProducts } from '../apis/products';
import { usePagination } from '../hooks/usePagination';
import { ERROR_NOTFOUND_PRODUCT_PAGE } from '../utilities/constants';
import { Error } from '../components/Error';

const PaginationPage: NextPage = () => {
  const router = useRouter();
  const page = Number(router.query.page);
  const [currentPage, pages, totalPage, setCurrentPage, setTotalCount] = usePagination({});
  const [error, setError] = useState('');
  useEffect(() => {
    const getData = async () => {
      try {
        if (page) {
          const data = await getProducts({ page });
          setError('');
          setTotalCount(data.totalCount);
          setCurrentPage(page);
        }
      } catch (error) {
        setError(ERROR_NOTFOUND_PRODUCT_PAGE);
        console.log(error);
      }
    };
    getData();
  }, [page, setCurrentPage, setTotalCount]);

  return (
    <>
      <Header />
      {error.length !== 0 ? (
        <Error title={error} />
      ) : (
        <Container>
          <ProductList products={products.slice(0, 10)} />
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
