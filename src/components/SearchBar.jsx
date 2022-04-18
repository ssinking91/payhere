import React, { useRef, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { addSearchList, getSearchText } from '../redux/modules/HomeIssue';
import { headers } from '../util/util';

export default function SearchBar({ setIsLoading, isLoading }) {
  const dispatch = useDispatch();

  const searchInput = useRef(null);

  // Api 호출
  const handleInput = useCallback(
    async (e) => {
      const targetValue = searchInput.current.value;

      const url = `https://api.github.com/search/repositories?q=${targetValue}&per_page=20&page=1`;

      if (e.code === 'Enter') {
        setIsLoading(true);

        try {
          const { data, status, statusText } = await axios.get(url, headers);

          if (status >= 400) {
            alert(`잘못된 요청입니다.🤢 statusText: ${statusText}`);
          } else if (status >= 500) {
            alert(`서버 에러입니다.🤢 statusText: ${statusText}`);
          }

          const result = data.items.map((item) => {
            const fullName = item.full_name.split('/');
            return { userID: fullName[0], repoName: fullName[1] };
          });

          dispatch(addSearchList(result));
          dispatch(getSearchText(targetValue));
          setIsLoading(false);
        } catch (e) {
          alert(`에러가 발생했습니다.🤢 잠시후 다시 실행해 주세요. `);
          console.error(e);
          setIsLoading(false);
        }
      }
    },
    [dispatch, setIsLoading],
  );

  return (
    <Input
      type="text"
      ref={searchInput}
      onKeyPress={handleInput}
      placeholder="Github Repository를 검색해주세요.✨"
      disabled={isLoading}
    />
  );
}

SearchBar.propTypes = {
  setIsLoading: PropTypes.func,
  isLoading: PropTypes.bool,
};

const Input = styled.input`
  width: 100%;
  height: 6.4rem;
  border-radius: 20px;
  font-size: 22.5px;
  font-weight: bold;
  padding: 0 23px;
  outline: none;
  margin-bottom: 3rem;
  @media screen and (max-width: 950px) {
    margin-bottom: 2rem;
  }

  ::placeholder {
    color: #cccccc;
    font-size: 22.5px;
    font-weight: 700;
  }
`;
