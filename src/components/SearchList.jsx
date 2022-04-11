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

  const targetRef = useRef(null);

  const getSearchList = useSelector((state) => state.HomeIssue.searchList);
  const addRepos = useSelector((state) => state.HomeIssue.addRepo);

  const [savedRepo, setSaveRepo] = useLocalStorage('savedRepo', []);

  const setScrollRepo = (data) => {
    dispatch(addSearchList(data));
  };

  const [InfiniteScrollList, isLoding] = useIntersect(
    targetRef,
    getSearchList,
    setScrollRepo,
  );

  const handleAddRepo = useCallback(
    (e, RepoOne) => {
      console.log(e.target);
      const addOneRepo = getSearchList.filter(
        (listOne) =>
          listOne.userID === getSearchList[e.target.id].userID &&
          listOne.repoName === getSearchList[e.target.id].repoName,
      );

      if (addRepos.length < 4) {
        if (addRepos.length > 0) {
          const newRepos = addRepos.map((el) => `${el.userID}${el.repoName}`);

          if (newRepos.includes(`${RepoOne.userID}${RepoOne.repoName}`)) {
            dispatch(setAlreadyModal());
          } else {
            dispatch(addSearchRepo(addOneRepo[0]));
            setSaveRepo([...addRepos, addOneRepo[0]]);
          }
        } else {
          dispatch(addSearchRepo(addOneRepo[0]));
          setSaveRepo([addOneRepo[0]]);
        }
      } else {
        dispatch(setFourModal());
      }
    },
    [addRepos, dispatch, getSearchList, setSaveRepo],
  );

  return (
    <>
      <InfinityScrollBox>
        {getSearchList && (
          <>
            {InfiniteScrollList.map((list, idx) => {
              return (
                <ListBox
                  // key={list.userID}
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
