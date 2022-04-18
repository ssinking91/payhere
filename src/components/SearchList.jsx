import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import Spinner from './Spinner';

import {
  addSearchList,
  addSearchRepo,
  setFourModal,
  setAlreadyModal,
} from '../redux/modules/HomeIssue';
import useIntersect from '../hooks/useIntersect';
import useLocalStorage from '../hooks/useLocalStorage';
import ListBox from '../components/ListBox';

export default function SearchList() {
  const dispatch = useDispatch();

  const getSearchList = useSelector((state) => state.HomeIssue.searchList);
  const Repos = useSelector((state) => state.HomeIssue.Repos);

  // intersection Observer ref역활을 담당하는 target 설정
  const targetRef = useRef(null);

  const [savedRepo, setSaveRepo] = useLocalStorage('savedRepo', []);

  const addScrollList = (data) => {
    dispatch(addSearchList(data));
  };

  const [InfiniteScrollList, isLoding] = useIntersect(
    targetRef,
    getSearchList,
    addScrollList,
  );

  const handleAddRepo = useCallback(
    (e, RepoOne) => {
      const addOneRepo = getSearchList.filter(
        (listOne) =>
          listOne.userID === getSearchList[e.target.id].userID &&
          listOne.repoName === getSearchList[e.target.id].repoName,
      );

      if (Repos.length < 4) {
        if (Repos.length > 0) {
          const newRepos = Repos.map((el) => `${el.userID}${el.repoName}`);

          if (newRepos.includes(`${RepoOne.userID}${RepoOne.repoName}`)) {
            dispatch(setAlreadyModal());
          } else {
            dispatch(addSearchRepo(addOneRepo[0]));
            setSaveRepo([...Repos, addOneRepo[0]]);
          }
        } else {
          dispatch(addSearchRepo(addOneRepo[0]));
          setSaveRepo([addOneRepo[0]]);
        }
      } else {
        dispatch(setFourModal());
      }
    },
    [Repos, dispatch, getSearchList, setSaveRepo],
  );

  return (
    <>
      <InfinityScrollBox>
        {getSearchList && (
          <>
            {InfiniteScrollList.map((list, idx) => {
              return (
                <ListBox
                  key={idx}
                  idx={idx}
                  button={'Add'}
                  targetRef={targetRef}
                  list={list}
                  handleAddRepo={(e) => handleAddRepo(e, list)}
                  length={InfiniteScrollList.length}
                  Infinite
                />
              );
            })}
            {isLoding && <Spinner />}
          </>
        )}
      </InfinityScrollBox>
    </>
  );
}

const InfinityScrollBox = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
`;
