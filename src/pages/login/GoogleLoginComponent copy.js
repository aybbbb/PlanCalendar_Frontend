import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';

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

  if (isLogin) return navigate('/todoList');
  return (
    <>
      <GoogleBlock>
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            onSuccess={(res) => {
              googleLogin(res);
            }}
            onFailure={(err) => {
              console.log(err);
              setPopup(true);
            }}
          />
        </GoogleOAuthProvider>
      </GoogleBlock>
      {popup && <PopUp YN={popup} title={'경고'} comment={'구글 로그인에 실패했습니다.'} handleClose={() => setPopup(false)} />}
    </>
  );
}

export default GoogleLoginComponent;
