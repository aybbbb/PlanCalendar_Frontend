import axios from 'axios';

const kakaoClient = axios.create({ baseURL: 'https://kauth.kakao.com' });

const createGetRequest = (url, body) => kakaoClient.get(url, body).then((r) => r.data);

export const getKakaoLogout = (REST_API_KEY, LOGOUT_REDIRECT_URI) =>
  createGetRequest(`/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`);
