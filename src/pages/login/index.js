import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import LoginForm from './LoginForm';
import GoogleLoginComponent from './GoogleLoginComponent';

const LoginBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50%;
  margin-bottom: 50%;
`;

const LineBlock = styled.hr`
  width: 85%;
  border: 0;
  border-bottom: 1px solid #868e96;
`;

const FontBlock = styled.p`
  margin-top: 5px;
  margin-bottom: 10px;
  color: #495057;
`;

function index() {
  // const [isLogin, setIsLogin] = useState(false);
  // const [userInfo, setUserInfo] = useState({});
  return (
    <>
      <LoginBlock>
        <LoginForm />
        <LineBlock />
        <FontBlock>
          간편로그인 또는 <Link to="/join">회원가입</Link>
        </FontBlock>
        <div>
          <button>
            <GoogleLoginComponent />
          </button>
        </div>
        <div>네이버 로그인 구현하기</div>

        <div>카카오 로그인 구현하기</div>
      </LoginBlock>
    </>
  );
}

export default index;
