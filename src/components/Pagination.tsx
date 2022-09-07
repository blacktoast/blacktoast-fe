import React, { Dispatch, MouseEvent, MouseEventHandler, SetStateAction } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { useRouter } from 'next/router';

type PaginationProp = {
  currentPage: number;
  pages: number[];
  totalPage: number;
};

const Pagination = ({ currentPage = 1, pages = [], totalPage }: PaginationProp) => {
  const router = useRouter();
  const isPrevBtn = pages[0] === 1 ? true : false;
  const isNextBtn = pages[pages.length - 1] === totalPage ? true : false;

  const pageOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const test = e.target as HTMLElement;
    const clickedPage = Number(test.textContent);
    if (currentPage) router.push(`/pagination?page=${clickedPage}`);
  };

  const prevOnClick = () => {
    router.push(`/pagination?page=${pages[0] - 1}`);
  };

  const nextOnClick = () => {
    router.push(`/pagination?page=${pages[pages.length - 1] + 1}`);
  };

  return (
    <Container>
      <Button disabled={isPrevBtn} onClick={prevOnClick}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {pages.map((page) => (
          <Page
            key={page}
            selected={page === currentPage}
            disabled={page === currentPage}
            onClick={pageOnClick}
          >
            {page}
          </Page>
        ))}
      </PageWrapper>
      <Button disabled={isNextBtn} onClick={nextOnClick}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
