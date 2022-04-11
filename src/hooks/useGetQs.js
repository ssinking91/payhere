import { useSearchParams } from 'react-router-dom';

const useGetQs = (...args) => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const target = searchParams.get('target');
  const [searchParams] = useSearchParams();
  // ...args = ["userID", "repoName"]
  return args.reduce((acc, cur) => {
    // acc[cur] : object.key / searchParams.get(cur) : object.value
    acc[cur] = searchParams.get(cur);
    return acc;
  }, {});
};

export default useGetQs;
