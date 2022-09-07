import { useRouter } from 'next/router';
import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import { Header } from '../components';
import { getProducts } from '../apis/products';
import { usePagination } from '../hooks/usePagination';

// 프로덕트 정보는 해당 페이지에서 가지기
//
const PaginationPage: NextPage = () => {
  const router = useRouter();
  const page = Number(router.query.page);
  const [currentPage, pages, setCurrentPage, setTotalCount] = usePagination({});
  useEffect(() => {
    const getData = async () => {
      try {
        if (page) {
          const data = await getProducts({ page });
          setTotalCount(data.totalCount);
          setCurrentPage(page);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [page, setCurrentPage, setTotalCount]);

  return (
    <>
      <Header />
      <Container>
        <ProductList products={products.slice(0, 10)} />
        <Pagination currentPage={currentPage} pages={pages} />
      </Container>
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
