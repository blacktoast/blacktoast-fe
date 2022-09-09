import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Header } from '../../components';
import { formatPrice } from '../../utilities';
import { useDataFetch } from '../../hooks/useDataFetch';
import { getProduct, getProductType } from '../../apis/products';

const ProductDetailPage: NextPage = () => {
  const router = useRouter();
  const [status, data, getData] = useDataFetch<getProductType, any>({
    apiFunc: getProduct,
  });

  useEffect(() => {
    const { id } = router.query;
    if (typeof id === 'string') {
      getData({ id });
    }
  }, [router, getData]);

  useEffect(() => {
    if (status === 'Error') {
      router.push('/404', router.asPath);
    }
  }, [router, status]);

  return (
    <>
      {status === 'Loading' || status === 'Error' ? (
        <h1>{status}</h1>
      ) : (
        <>
          <Header />
          <Thumbnail
            src={data.product.thumbnail ? data.product.thumbnail : '/defaultThumbnail.jpg'}
          />
          <ProductInfoWrapper>
            <Name>{data.product.name}</Name>
            <Price>{formatPrice(data.product.price)}원</Price>
          </ProductInfoWrapper>
        </>
      )}
    </>
  );
};

export default ProductDetailPage;

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;
