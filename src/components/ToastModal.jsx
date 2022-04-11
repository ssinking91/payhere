import React, { useEffect, memo } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

//React.memo(): 컴포넌트의 props 가 바뀌지 않았다면, 리렌더링을 방지하여 컴포넌트의 리렌더링 성능 최적화
function ToastModal({ content, setShowModal }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeOut = setTimeout(() => dispatch(setShowModal()), 1250);
    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch, setShowModal]);

  return (
    <>
      <Bg>
        <Container>
          <Content>{content}</Content>
        </Container>
      </Bg>
    </>
  );
}

ToastModal.propTypes = {
  content: PropTypes.string,
  setShowModal: PropTypes.func,
};

const rotate = keyframes`
    0% {
      opacity: 1;
    }
    40% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      display: none;
    } 
`;

const Bg = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.65);
  overflow: hidden;
  z-index: 1;
  animation: ${rotate} 1.35s 1;
`;

const Container = styled.div`
  position: fixed;
  width: 38rem;
  height: 18rem;
  line-height: 18rem;
  text-align: center;
  border-radius: 20px;
  background-color: #fff;
  z-index: 10;
  animation: ${rotate} 1.45s 1;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: 2.55rem;
`;

export default memo(ToastModal);
