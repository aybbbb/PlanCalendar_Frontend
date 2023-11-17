import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import PopUp from '../../components/PopUp';

const LoginBlock = styled.div`
  display: flex;
  flex-direction: column;
`;
const btnStyle = {
  bgcolor: '#9775fa',
  fontSize: '18px',
  '&:hover': {
    backgroundColor: '#9775fa',
    color: '#fff',
  },
  height: '50px',
};

const FontBlock = styled.p`
  margin-top: 5px;
  margin-bottom: 10px;
  color: #5f3dc4;
  font-size: 25px;
  flex-direction: column;
  justify-content: center;
`;
function LoginForm() {
  const [member, setMember] = useState({
    email: '',
    pw: '',
    showPW: false,
  });
  const [popup, setPopup] = useState(false);

  const onChange = (e) => {
    const { value, name } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleClickShowPassword = (event) => {
    setMember({ ...member, showPW: !member.showPW });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
        <FontBlock>로그인</FontBlock>
        <TextField id="outlined-basic" name="email" label="이메일" onChange={onChange} sx={{ width: '350px', mb: '5px' }} />
        <FormControl sx={{ width: '350px', mb: '5px' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={member.showPW ? 'text' : 'password'}
            value={member.pw}
            name="pw"
            onChange={onChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {member.showPW ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button variant="contained" sx={btnStyle} onClick={onLogin}>
          로그인
        </Button>
      </LoginBlock>
      {popup && <PopUp YN={popup} title={'경고'} comment={'이메일 또는 비밀번호를 확인해주세요.'} handleClose={() => setPopup(false)} />}
    </>
  );
}

export default LoginForm;
