import React, { memo } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

//React.memo(): 컴포넌트의 props 가 바뀌지 않았다면, 리렌더링을 방지하여 컴포넌트의 리렌더링 성능 최적화
function Spinner() {
  return <Loader></Loader>;
}

const load3 = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }

`;
const load31 = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }

`;

const Loader = styled.div`
  font-size: 10px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 4.8em;
  height: 4.8em;
  border-radius: 50%;
  background: #00acee;
  background: -moz-linear-gradient(
    left,
    #00acee 10%,
    rgba(204, 204, 204, 1) 42%
  );
  background: -webkit-linear-gradient(
    left,
    #00acee 10%,
    rgba(204, 204, 204, 1) 42%
  );
  background: -o-linear-gradient(left, #00acee 10%, rgba(204, 204, 204, 1) 42%);
  background: -ms-linear-gradient(
    left,
    #00acee 10%,
    rgba(204, 204, 204, 1) 42%
  );
  background: linear-gradient(
    to right,
    #00acee 10%,
    rgba(204, 204, 204, 1) 42%
  );
  position: relative;
  -webkit-animation: ${load3} 1.4s infinite linear;
  animation: ${load31} 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  :before {
    width: 50%;
    height: 50%;
    background: #00acee;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }
  :after {
    background: #14161a;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;

export default memo(Spinner);
