import { MouseEventHandler } from 'react';
import styled from 'styled-components';

import { Product } from '../types/product';
import { ProductItem } from '.';

type productOnClick = (id: string) => void;

type ProductListProps = {
  products: Product[];
  onClick?: productOnClick;
};

export const ProductList = ({ products, onClick }: ProductListProps) => (
  <Container>
    {products.map((product) => (
      <ProductItem
        key={product.id}
        product={product}
        onClick={() => {
          if (onClick) onClick(product.id);
        }}
      />
    ))}
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-left: -20px;
`;
