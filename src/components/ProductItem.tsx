import { MouseEventHandler } from 'react';
import styled from 'styled-components';

import { Product } from '../types/product';
import { formatPrice } from '../utilities';

type ProductItemProps = {
  product: Product;
  onClick: MouseEventHandler<HTMLAnchorElement>;
};

export const ProductItem = ({
  product: { name, thumbnail, price, id },
  onClick,
}: ProductItemProps) => (
  <Container onClick={onClick}>
    <Thumbnail loading='lazy' src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} alt={name} />
    <Name>{name}</Name>
    <Price>{formatPrice(price)}</Price>
  </Container>
);

const Container = styled.a`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 180px;
`;

const Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.div`
  margin-top: 4px;
`;
