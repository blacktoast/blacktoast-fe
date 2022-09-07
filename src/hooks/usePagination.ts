import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export const usePagination = ({
  perPage = 10,
  perPagesRange = 5,
}): [number, number[], Dispatch<SetStateAction<number>>, Dispatch<SetStateAction<number>>] => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([1, 2, 3, 4, 5]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const totalPage = Math.ceil(totalCount / perPage);
    const isLastPage = currentPage % perPagesRange === 0;
    const perPageStart = isLastPage
      ? (Math.floor(currentPage / perPagesRange) - 1) * perPagesRange
      : Math.floor(currentPage / perPagesRange) * perPagesRange;
    // 마지지막 페이지가 토탈 페이지 보다 크다면 마지막-total해서 해당값이 range 범위로 가져가기
    const pageRange =
      totalPage - perPageStart < perPagesRange ? totalPage - perPageStart : perPagesRange;

    const tmpPages = new Array(pageRange).fill(0).map((_, i) => {
      return i + 1 + perPageStart;
    });

    setPages(tmpPages);
  }, [currentPage, perPage, perPagesRange, totalCount]);

  return [currentPage, pages, setCurrentPage, setTotalCount];
};
