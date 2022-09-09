import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Header, Error } from '../components/';
import { useRouter } from 'next/router';
import {
  ERROR_NOTFOUND_PRODUCTS_DETAIL_PAGE,
  ERROR_NOTFOUND_PRODUCTS_PAGE,
} from '../utilities/constants';

type errorType = {
  [key: string]: string;
};
const ProductDetailPage: NextPage = () => {
  const [errorMassage, setErrorMessage] = useState('');

  const router = useRouter();
  useEffect(() => {
    const errorPageType = router.asPath.split('/')[1].replace(/\?.*/, '');
    const errorMessageByType: errorType = {
      products: ERROR_NOTFOUND_PRODUCTS_DETAIL_PAGE,
      pagination: ERROR_NOTFOUND_PRODUCTS_PAGE,
    };

    setErrorMessage(
      errorMessageByType[errorPageType] || '길을 잃었습니다 메인 페이지로 이동해주세요'
    );
  }, [router]);

  return (
    <>
      <Header />
      <Error title={errorMassage} />
    </>
  );
};

export default ProductDetailPage;
