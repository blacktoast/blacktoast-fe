import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export const usePagination = ({
  perPage = 10,
  perPagesRange = 5,
}): [
  number,
  number[],
  number,
  Dispatch<SetStateAction<number>>,
  Dispatch<SetStateAction<number>>
] => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([1, 2, 3, 4, 5]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const totalPage = Math.ceil(totalCount / perPage);
    setTotalPage(totalPage);
    const isLastPage = currentPage % perPagesRange === 0;
    const perPageStart = isLastPage
      ? (Math.floor(currentPage / perPagesRange) - 1) * perPagesRange
      : Math.floor(currentPage / perPagesRange) * perPagesRange;
    const pageRange =
      totalPage - perPageStart < perPagesRange ? totalPage - perPageStart : perPagesRange;

    const tmpPages = new Array(pageRange).fill(0).map((_, i) => {
      const pageIndex = i + 1;
      return pageIndex + perPageStart;
    });

    setPages(tmpPages);
  }, [currentPage, perPage, perPagesRange, totalCount]);

  return [currentPage, pages, totalPage, setCurrentPage, setTotalCount];
};
