import React from 'react';
import Styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { ReactComponent as GithubIcon } from '../assets/github_icon.svg';

export default function ReposBox({
  idx,
  button,

  targetRef,
  list,
  handleAddRepo,
  length,
  Infinite,

  repo,
  handleDeleteRepo,
  handleIssueNavigate,
  selectRepo,
}) {
  return (
    <>
      <ListContainer
        onClick={selectRepo && handleIssueNavigate}
        ref={Infinite && idx + 10 === length ? targetRef : undefined}
        infinite={Infinite}
      >
        <LeftBox>
          <GithubIcon className="github_icon" />
          <RepoName>
            {Infinite
              ? `${list.userID} / ${list.repoName}`
              : `${repo.userID} / ${repo.repoName}`}
          </RepoName>
        </LeftBox>
        <RightBox>
          <AddButton
            className="add_btn"
            onClick={Infinite ? handleAddRepo : handleDeleteRepo}
            id={idx}
            infinite={Infinite}
          >
            {button}
          </AddButton>
        </RightBox>
      </ListContainer>
    </>
  );
}

ReposBox.propTypes = {
  idx: PropTypes.number,
  button: PropTypes.string,
  targetRef: PropTypes.object,
  list: PropTypes.object,
  handleAddRepo: PropTypes.func,
  length: PropTypes.number,
  Infinite: PropTypes.bool,
  repo: PropTypes.object,
  handleDeleteRepo: PropTypes.func,
  handleSelectRepos: PropTypes.func,
  selectRepo: PropTypes.bool,
};

const ListContainer = Styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 6.4rem;
  padding: 1.2rem 2.5rem;
  margin-bottom: 3rem;
  border-radius: 2rem;
  background-color: #fff;
  cursor: pointer;
  
  .github_icon {
    width: 26px;
    height: 26px;
    fill: #14161a;
  }

  ${({ infinite }) => {
    if (!infinite) return;
    return css`
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 6.4rem;
      padding: 1.2rem 2.5rem;
      margin: 2rem 0;
      border-radius: 2rem;
      cursor: pointer;

      .github_icon {
        width: 26px;
        height: 26px;
      }

      &:not(:hover) {
        background-color: #4f5864;
        color: #ccc;
        transition: all 0.25s ease;

        .github_icon {
          fill: #ccc;
        }
      }

      &:hover {
        background-color: #fff;
        color: #14161a;
        transition: all 0.25s ease;

        .github_icon {
          fill: #14161a;
        }

        .add_btn {
          background-color: #00acee;
          color: #fff;
        }
      }

      :first-child {
        margin-top: 0;
      }
    `;
  }};
`;

const LeftBox = Styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RepoName = Styled.p`
  font-size: 22.5px;
  font-weight: bold;
  padding-top: 2px;
  margin-left: 8px;
  overflow: hidden;
`;

const RightBox = Styled(LeftBox)`
  width: 20%;
  height: 100%;
  justify-content: flex-end;
`;

const AddButton = Styled.button`
  width: ${(props) => (props.infinite ? `8rem` : `10rem`)};
  height: 4rem;
  border-radius: 10px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
  background-color: ${(props) => (props.infinite ? `#ccc` : `#EB2D4C`)};
`;
