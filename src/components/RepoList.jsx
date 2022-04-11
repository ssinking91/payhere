import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ListBox from './ListBox';
import { deleteRepo } from '../redux/modules/HomeIssue';
import useLocalStorage from '../hooks/useLocalStorage';

export default function RepoList() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const addRepos = useSelector((state) => state.HomeIssue.addRepo);

  const [savedRepo, setSaveRepo] = useLocalStorage('savedRepo', []);

  useEffect(() => {
    if (savedRepo) {
      dispatch(deleteRepo(savedRepo));
    }
  }, [dispatch, savedRepo]);

  const handleDeleteRepo = useCallback(
    (e) => {
      e.stopPropagation();
      const target = e.target.id;
      let leftData = addRepos.filter((_, idx) => Number(target) !== idx);
      dispatch(deleteRepo(leftData));
      setSaveRepo(leftData);
    },
    [addRepos, dispatch, setSaveRepo],
  );

  const handleIssueNavigate = useCallback(
    (idx) => {
      const target = Number(idx);
      const issueData = addRepos[target];
      navigate(
        `/issue?userID=${issueData.userID}&repoName=${issueData.repoName}`,
      );
    },
    [addRepos, navigate],
  );

  return (
    <>
      {addRepos &&
        addRepos.map((repo, idx) => {
          return (
            <ListBox
              key={idx}
              button={'Delete'}
              idx={idx}
              repo={repo}
              handleDeleteRepo={(e) => handleDeleteRepo(e)}
              handleIssueNavigate={() => handleIssueNavigate(idx)}
              selectRepo
            />
          );
        })}
    </>
  );
}
