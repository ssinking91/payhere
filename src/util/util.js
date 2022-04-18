// process.env.REACT_APP_는 예약어 => process.env.REACT_APP_지정한 변수(=값),
const API_KEY = process.env.REACT_APP_API_KEY;

export const headers = {
  headers: {
    Authorization: API_KEY,
  },
};
