import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import axios from 'axios';

import IssueItem from '../components/IssueItem';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';

import useGetQs from '../hooks/useGetQs';
import { headers } from '../util/util';

export default function Issue() {
  const navigate = useNavigate();

  const datas = useMemo(() => [], []);

  const [isLoading, setIsLoading] = useState(false);
  // issueData =[{...}, ...]
  const [issueData, setIssueData] = useState([]);
  // Pagination Current Page
  const [currentPage, setCurrentPage] = useState(1);
  // Post 6 per page
  const [postsPerPage] = useState(6);
  // Number of Pages
  const [numOfPages, setNumOfPages] = useState(0);

  const [clickedText, setClickedText] = useState('All');

  const { userID, repoName } = useGetQs('userID', 'repoName');

  useEffect(() => {
    const url = `https://api.github.com/repos/${userID}/${repoName}/issues?state=all&&per_page=100`;
    (async () => {
      try {
        setIsLoading(true);

        const { data, status, statusText } = await axios.get(url, headers);

        if (status >= 400) {
          alert(`잘못된 요청입니다. statusText: ${statusText}`);
        } else if (status >= 500) {
          alert(`서버 에러입니다. statusText: ${statusText}`);
        }

        if (data.length) {
          data.forEach((el) => {
            const {
              title,
              repository_url,
              created_at,
              state,
              html_url,
              number,
              user: { id, avatar_url },
            } = el;

            datas.push({
              title,
              repository_url,
              created_at,
              state,
              html_url,
              number,
              user: { id, avatar_url },
            });
          });

          setIssueData(datas);
        }
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    })();
  }, [datas, repoName, userID]);

  useEffect(() => {
    const len = issueData.length;
    // Number of Pages
    const pagesLength = Math.ceil(len / postsPerPage);

    setNumOfPages(pagesLength);

    // 첫 번째 페이지 초기화
    setCurrentPage(1);
  }, [issueData, postsPerPage]);

  // 클릭된 페이지 활성화
  const changePageNum = useCallback((newIndex) => {
    setCurrentPage(newIndex);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const chageTextData = (text) => {
    const newDatas = datas.filter((obj) => {
      switch (text) {
        case 'All':
          return obj;
        case 'Open':
          return obj.state === 'open';
        case 'Closed':
          return obj.state === 'closed';
        default:
          throw new Error(`Invalid text : ${text}`);
      }
    });
    setIssueData(newDatas);
  };

  // ['All', 'Open', 'Closed'] 클릭 이벤트
  const handleClickText = useCallback(
    (text) => {
      setClickedText(text);
      chageTextData(text);
    },
    [chageTextData],
  );

  return (
    <Container>
      <Nav>
        <Back onClick={() => navigate('/')}> {'<'} Home</Back>
        <Buttons>
          {['All', 'Open', 'Closed'].map((text, idx) => (
            <Button
              key={idx}
              text={text === clickedText}
              onClick={() => handleClickText(text)}
            >
              <span>{text}</span>
            </Button>
          ))}
        </Buttons>
      </Nav>
      <IdName>{userID + ' / ' + repoName}</IdName>

      {isLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <IssueList>
          {issueData.length > 0 &&
            issueData
              .slice(
                postsPerPage * (currentPage - 1),
                postsPerPage * currentPage - 1 + 1,
              )
              .map((dataObj) => (
                <IssueItem key={dataObj.number} dataObj={dataObj} />
              ))}
        </IssueList>
      )}

      {isLoading || issueData.length || <NoIssue>✔ No Issue</NoIssue>}

      {issueData.length && (
        <Pagination
          currentPage={currentPage}
          numOfPages={numOfPages}
          changePageNum={changePageNum}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  height: 100vh;
  padding: 8rem 1.5rem 6rem 1.5rem;
`;

const Nav = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Back = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-size: 3.5rem;
  color: #00aaee;
  cursor: pointer;
`;

const Buttons = styled.div`
  display: flex;
  border-radius: 2rem;
  box-sizing: border-box;
`;

const Button = styled.button`
  color: #ffffff;
  width: 6.9rem;
  font-weight: 900;
  font-size: 16px;
  line-height: 19px;
  height: 5rem;
  &:first-child {
    border-radius: 2rem 0 0 2rem;
    border-left: 3px solid #ffffff;
    border-top: 3px solid #ffffff;
    border-bottom: 3px solid #ffffff;
  }
  &:nth-child(2) {
    border-top: 3px solid #ffffff;
    border-bottom: 3px solid #ffffff;
  }
  &:last-child {
    border-radius: 0 2rem 2rem 0;
    border-right: 3px solid #ffffff;
    border-top: 3px solid #ffffff;
    border-bottom: 3px solid #ffffff;
  }
  ${({ text }) => {
    if (!text) return;
    return css`
      color: #14161a;
      background-color: #ffffff;
    `;
  }};
`;

const IdName = styled.div`
  font-weight: 900;
  font-size: 4rem;
  margin: 5rem 0;
  color: #eee;
  width: 100%;
`;

const IssueList = styled.div`
  width: 100%;
  display: grid;
  gap: 2rem;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  padding: 3rem 2rem 4rem 2rem;
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 49rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoIssue = styled.p`
  width: 100%;
  height: 100%;
  padding-top: 1rem;
  font-size: 4rem;
  color: white;
  font-weight: 900;
  text-align: center;
`;
