import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import PopUp from '../../components/PopUp';
import { useDispatch } from 'react-redux';
import { setLoginStore } from '../../store/MemberStore';

const GoogleBlock = styled.div`
  width: 350px;
  font-size: 30px;
`;
//https://berom.tistory.com/30 -> 노드랑 연결할때 참고해보기
function GoogleLoginComponent() {
  const clientId = process.env.REACT_APP_AUTH_CLIENT_ID;

  const [popup, setPopup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // https://kiss8981.github.io/react/react-google-login/
  const googleLogin = useCallback((response) => {
    const decodeding = jwt_decode(response.credential);

    const userInfo = {
      email: decodeding.email,
      user: decodeding.name,
      profile: '',
      loginType: 'G',
    };

    console.log(JSON.stringify(userInfo));
    localStorage.setItem('memberGoogle', JSON.stringify(userInfo));
    setIsLogin(true);
    dispatch(setLoginStore(userInfo));
  }, []);
  // https://velog.io/@miyoni/google-social-login
  // https://berom.tistory.com/30
  const googleLoginTest = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
      console.log('너나오니');
      const decodeding = jwt_decode(credentialResponse.code);
      console.log(decodeding);
      // 노드 연결되면 붙여보기 밑에 코드는 지우기
      // https://berom.tistory.com/30
      const userInfo = {
        email: decodeding.email,
        user: decodeding.name,
        profile: '',
        loginType: 'G',
      };

      console.log(JSON.stringify(userInfo));
      localStorage.setItem('memberGoogle', JSON.stringify(userInfo));
      setIsLogin(true);
      dispatch(setLoginStore(userInfo));
    },
    onError: (errorResponse) => {
      console.error(errorResponse);
      setPopup(true);
    },
    flow: 'auth-code',
  });

  if (isLogin) return navigate('/todoList');
  return (
    <>
      <GoogleBlock>
        <div onClick={() => googleLoginTest()}>
          <div>구글로 되나?</div>
        </div>
        {/* <GoogleLogin
          onSuccess={(res) => {
            googleLogin(res);
          }}
          onFailure={(err) => {
            console.log(err);
            setPopup(true);
          }}
          sx={{ color: '#000' }}
        /> */}
      </GoogleBlock>
      {popup && <PopUp YN={popup} title={'경고'} comment={'구글 로그인에 실패했습니다.'} handleClose={() => setPopup(false)} />}
    </>
  );
}

export default GoogleLoginComponent;
