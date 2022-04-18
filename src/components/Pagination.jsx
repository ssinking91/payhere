import React, { useEffect, useRef, useState, memo, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

//React.memo(): 컴포넌트의 props 가 바뀌지 않았다면, 리렌더링을 방지하여 컴포넌트의 리렌더링 성능 최적화
function Pagination({ currentPage, numOfPages, changePageNum }) {
  const prevRef = useRef();
  const nextRef = useRef();

  // 페이지 인덱스 배열
  const [pageIndexArray, setPageIndexArray] = useState(
    Array.from({ length: numOfPages }, (_, idx) => idx + 1),
  );

  useEffect(() => {
    setPageIndexArray(Array.from({ length: numOfPages }, (_, idx) => idx + 1));
  }, [numOfPages]);

  useEffect(() => {
    // 첫 번째 인덱스일 때 prev 버튼 숨기기
    if (currentPage === 1) {
      prevRef.current.style.display = 'none';
    } else {
      prevRef.current.style.display = 'block';
    }
    // 마지막 인덱스일 때 next 버튼 숨기기
    if (currentPage === pageIndexArray.length) {
      nextRef.current.style.display = 'none';
    } else {
      nextRef.current.style.display = 'block';
    }
  }, [currentPage, pageIndexArray]);

  // 페이지 인덱스 변경
  const handlePageNum = useCallback(
    (e) => {
      if (e.target.textContent === 'prev') {
        changePageNum(currentPage * 1 - 1);
      } else if (e.target.textContent === 'next') {
        changePageNum(currentPage * 1 + 1);
      } else {
        changePageNum(e.target.textContent * 1);
      }
    },
    [changePageNum, currentPage],
  );

  return (
    <Wrapper>
      <ButtonWrapper>
        <Button ref={prevRef} onClick={handlePageNum}>
          prev
        </Button>
      </ButtonWrapper>
      <PagesWrapper>
        {pageIndexArray
          .slice(
            Math.floor((currentPage - 1) / 10) * 10,
            (Math.floor((currentPage - 1) / 10) + 1) * 10,
          )
          .map((pIndex, idx) => {
            return pIndex === currentPage ? (
              <li key={idx} className="active" onClick={handlePageNum}>
                {pIndex}
              </li>
            ) : (
              <li key={idx} onClick={handlePageNum}>
                {pIndex}
              </li>
            );
          })}
      </PagesWrapper>
      <ButtonWrapper>
        <Button ref={nextRef} onClick={handlePageNum}>
          next
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  numOfPages: PropTypes.number,
  changePageNum: PropTypes.func,
};

const Wrapper = styled.div`
  height: auto;
  color: #fff;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4rem 0;
`;
const ButtonWrapper = styled.div`
  width: 6rem;
  height: 3.5rem;
  margin: 0.6rem;
  padding: 0;
`;
const Button = styled.button`
  width: 6rem;
  height: 3.5rem;
  color: #00aaee;
  font-size: 2.5rem;
  font-weight: 600;
  cursor: pointer;
`;
const PagesWrapper = styled.ul`
  width: fit-content;
  display: flex;

  li {
    width: 4rem;
    height: 4rem;
    background-color: #4f5864;
    color: #ccc;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 600;
    line-height: 3.5rem;
    cursor: pointer;
    margin: 0.5rem;
  }
  li.active {
    background-color: #00aaee;
    color: #fff;
  }
`;

export default memo(Pagination);
