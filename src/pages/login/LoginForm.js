import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import PopUp from '../../components/PopUp';

const LoginBlock = styled.div`
  display: flex;
  flex-direction: column;
`;
const btnStyle = {
  bgcolor: '#9775fa',
  '&:hover': {
    backgroundColor: '#9775fa',
    color: '#fff',
  },
  height: '45px',
};

function LoginForm() {
  const [member, setMember] = useState({
    email: '',
    pw: '',
  });
  const [popup, setPopup] = useState(false);

  const onChange = (e) => {
    const { value, name } = e.target;
    setMember({ ...member, [name]: value });
  };
  const onLogin = () => {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (member.email.match(regExp) === null || member.pw === '') {
      setPopup(true);
      setMember({ email: '', pw: '' });
      return;
    }
    localStorage.setItem('member', JSON.stringify(member));
  };

  return (
    <>
      <LoginBlock>
        <TextField id="outlined-basic" name="email" label="이메일" onChange={onChange} sx={{ width: '350px', mb: '5px' }} />
        <TextField id="outlined-basic" name="pw" label="비밀번호" onChange={onChange} sx={{ width: '350px', mb: '5px' }} type="password" />
        <Button variant="contained" sx={btnStyle} onClick={onLogin}>
          로그인
        </Button>
      </LoginBlock>
      {popup && <PopUp YN={popup} title={'경고'} comment={'이메일 또는 비밀번호를 확인해주세요.'} handleClose={() => setPopup(false)} />}
    </>
  );
}

export default LoginForm;
