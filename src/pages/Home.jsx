import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import SearchList from '../components/SearchList';
import SearchBar from '../components/SearchBar';
import Spinner from '../components/Spinner';
import ToastModal from '../components/ToastModal';
import RepoList from '../components/RepoList';

import { setFourModal, setAlreadyModal } from '../redux/modules/HomeIssue';

export default function Main() {
  const [isLoading, setIsLoading] = useState(false);

  const showFourModal = useSelector((state) => state.HomeIssue.fourModal);
  const showAlreadyModal = useSelector((state) => state.HomeIssue.alreadyModal);

  return (
    <>
      <Container>
        <LeftBox>
          <SearchBox>
            <HomeTitle>Github Repositories Searcher 🔍</HomeTitle>
            <SearchBar setIsLoading={setIsLoading} isLoading={isLoading} />
          </SearchBox>
          <SearchListBox>
            {isLoading ? <Spinner /> : <SearchList />}
          </SearchListBox>
        </LeftBox>
        <RightBox>
          <HomeTitle>Saved Repositories 🔥</HomeTitle>
          <RepoList />
        </RightBox>
      </Container>

      {showAlreadyModal && (
        <ToastModal
          content="이미 저장 되었습니다!! 🤢"
          setShowModal={setAlreadyModal}
        />
      )}

      {showFourModal && (
        <ToastModal
          content="4개 이상 저장은 안돼요!! 🤢"
          setShowModal={setFourModal}
        />
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  height: 100vh;
  padding: 8rem 3rem 6rem;
  margin: 0 auto;
  gap: 5%;
  @media screen and (max-width: 950px) {
    flex-direction: column;
    align-items: center;
    min-width: 450px;
  }
`;

const HomeTitle = styled.div`
  width: 100%;
  color: #fff;
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 4rem;
  @media screen and (max-width: 950px) {
    margin-bottom: 2rem;
  }
`;

const LeftBox = styled.div`
  width: 50%;
  min-width: 450px;
  height: 70%;
  @media screen and (max-width: 950px) {
    height: 70%;
  }
`;

const SearchBox = styled.div`
  width: 100%;
  height: auto;
  @media screen and (max-width: 950px) {
    height: 30%;
  }
`;

const SearchListBox = styled.div`
  width: 100%;
  height: 90%;
  overflow: scroll;
  @media screen and (max-width: 950px) {
    height: 70%;
  }
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  min-width: 450px;
  @media screen and (max-width: 950px) {
    height: 30%;
  }
`;
