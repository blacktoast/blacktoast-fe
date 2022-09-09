import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import products from '../../api/data/products.json';
import { Header } from '../../components';
import { Product } from '../../types/product';
import { formatPrice } from '../../utilities';

export const getStaticPaths = () => {
  const paths = products.map((product) => ({ params: { id: product.id } }));
  return {
    paths,
    fallback: false,
  };
};

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product: Product = products[Number(params?.id) - 1];
  return {
    props: { product },
  };
};

const ProductDetailPage: NextPage = ({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Header />
      <Thumbnail src={product.thumbnail ? product.thumbnail : '/defaultThumbnail.jpg'} />
      <ProductInfoWrapper>
        <Name>{product.name}</Name>
        <Price>{formatPrice(product.price)}원</Price>
      </ProductInfoWrapper>
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
