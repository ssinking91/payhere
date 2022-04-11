import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { countScroll } from '../redux/modules/HomeIssue';
import { headers } from '../util/util';

const useIntersect = (targetRef, getSearchList, setScrollRepo) => {
  const dispatch = useDispatch();

  const searchText = useSelector((state) => state.HomeIssue.searchText);
  const scrollPage = useSelector((state) => state.HomeIssue.countScroll);

  const [showList, setShowList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getDataApi = (target, page) => {
    const url = `https://api.github.com/search/repositories?q=${target}&per_page=20&page=${page}`;
    (async () => {
      try {
        setIsLoading(true);

        const { data, status, statusText } = await axios.get(url, headers);

        if (status >= 400) {
          alert(`잘못된 요청입니다. statusText: ${statusText}`);
        } else if (status >= 500) {
          alert(`서버 에러입니다. statusText: ${statusText}`);
        }

        const result = data.items.map((item) => {
          const fullName = item.full_name.split('/');
          return { userID: fullName[0], repoName: fullName[1] };
        });

        setScrollRepo([...getSearchList, ...result]);
        dispatch(countScroll());
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    })();
  };

  // IntersectionObserver callback 함수
  const callback = useCallback(
    // [entry]: IntersectionObserverEntry 객체들을 배열로 반환
    // entry 는 targetElements
    ([entry]) => {
      // isIntersecting: target이 root 영역에 교차되고 있는지의 정보를 boolean으로 반환
      if (entry.isIntersecting) {
        console.log('데이터 추가 스크롤 시작');
        getDataApi(searchText, scrollPage);
      }
    },
    [getDataApi, searchText, scrollPage],
  );

  // Infinite Scroll
  useEffect(() => {
    if (Array.isArray(getSearchList)) {
      setShowList(getSearchList);
    }

    if (isLoading) return;

    // 관찰 대상의 교차 상태가 false일(보이지 않는) 경우 실행하지 않음.
    if (!targetRef.current) return;

    // intersection Observer를 담을 observer변수를 선언해주고 ref역활을 담당하는 target 설정
    // intersection Observer를 생성하여 observer에 담기
    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    // IntersectionObserver.observe(target): 관찰 시작
    observer.observe(targetRef.current);

    // IntersectionObserver.disconnect(target): 관찰 멈추기
    return () => observer && observer.disconnect();
  }, [isLoading, targetRef, callback, getSearchList]);

  return [showList, isLoading];
};

export default useIntersect;
