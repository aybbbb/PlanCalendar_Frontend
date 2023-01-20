import GoogleLogin from 'react-google-login';
import GoogleButton from 'react-google-button';
import { useCallback, useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import styled from 'styled-components';

import PopUp from '../../components/PopUp';

const GoogleBlock = styled.div`
  width: 350px;
  font-size: '30px';
`;

function GoogleLoginComponent({ setUserInfo, setIsLogin }) {
  const googleAccount = process.env.REACT_APP_AUTH_CLIENT_ID;

  const [popup, setPopup] = useState(false);

  useEffect(() => {
    function start() {
      gapi.client.init({
        googleAccount,
        // scope: 'email',
      });
    }
    gapi.load('client:auth2', start);
  }, []);
  const googleLogin = useCallback((response) => {
    const userInfo = {
      profileImg: response.profileObj.imageUrl,
      email: response.profileObj.email,
      name: response.profileObj.name,
    };
    console.log('-----------------------------------');
    console.log(response.profileObj);
    setUserInfo(userInfo);
    setIsLogin(true);
    localStorage.setItem('member', JSON.stringify(userInfo));
  }, []);

  const onFailure = (res) => {
    setPopup(true);
    console.log('err', res);
  };

  return (
    <>
      <GoogleBlock>
        <GoogleLogin
          clientId={googleAccount}
          buttonText="Sign in with Google"
          onSuccess={googleLogin}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          render={(renderProps) => (
            <GoogleButton type="light" onClick={renderProps.onClick} disabled={renderProps.disabled} style={{ width: '350px', borderRadius: '10px' }}>
              Sign in with Google
            </GoogleButton>
          )}
        />
      </GoogleBlock>
      {popup && <PopUp YN={popup} title={'경고'} comment={'구글 로그인에 실패했습니다.'} handleClose={() => setPopup(false)} />}
    </>
  );
}

export default GoogleLoginComponent;
