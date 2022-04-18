import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { returnGapDate } from '../util/date';
export default function IssueItem({ dataObj }) {
  const {
    title,
    repository_url,
    created_at,
    state,
    html_url,
    user: { avatar_url },
  } = dataObj;

  const currDate = new Date();
  const createdDate = new Date(created_at);

  return (
    <Container state={state} url={html_url}>
      <Title>{title}</Title>
      <RepoName>{repository_url}</RepoName>
      <RegistDate> {returnGapDate(currDate, createdDate)} ago</RegistDate>
      <State>{state}</State>
      <ProfileImg avatar_url={avatar_url} />
    </Container>
  );
}

IssueItem.propTypes = {
  dataObj: PropTypes.object,
};

const Container = styled.a.attrs((props) => ({
  href: props.url,
}))`
  position: relative;
  width: 100%;
  min-width: 36.7rem;
  height: 100%;
  background: ${({ state }) => (state === 'open' ? '#ffffff' : '#4f5864')};
  box-shadow: 0px 2px 2rem rgba(0, 0, 0, 0.1);
  border-radius: 2rem;
  padding: 2.5rem;
  cursor: pointer;
`;

const Title = styled.h1`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-size: 2.5rem;
  font-size: 2.2rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: #cccccc;
`;

const RepoName = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 1.9rem;
  font-size: 1.6rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  margin-top: 4.3px;
  color: #31a44f;
`;

const RegistDate = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.4rem;
  font-size: 1.2rem;
  margin-top: 1.084rem;
  color: #cccccc;
`;

const State = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-size: 2.5rem;
  line-height: 2.9rem;
  font-size: 2.2rem;
  margin-top: 7rem;
  color: #cccccc;
`;

const ProfileImg = styled.img.attrs((props) => ({
  src: props.avatar_url,
}))`
  position: absolute;
  width: 6.12rem;
  height: 6.12rem;
  border-radius: 50%;
  object-fit: contain;
  bottom: 1.558rem;
  right: 1.558rem;
`;
