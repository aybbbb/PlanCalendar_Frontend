import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import PopUp from '../../components/PopUp';

const JoinBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50%;
  margin-bottom: 50%;
`;

const btnStyle = {
  bgcolor: '#9775fa',
  '&:hover': {
    backgroundColor: '#9775fa',
    color: '#fff',
  },
  mb: 1,
  mt: 1,
  height: '45px',
};

const LineBlock = styled.hr`
  width: 100%;
  border: 0;
  border-bottom: 1px solid #868e96;
`;

const FontBlock = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #495057;
`;

const TitleBlock = styled.p`
  margin-top: 5px;
  margin-bottom: 10px;
  color: #5f3dc4;
  font-size: 25px;
`;
function JoinComponent() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    chkPassword: '',
    showPassword: false,
    showChkPassword: false,
  });
  const [popup, setPopup] = useState({
    open: false,
    comment: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = (prop, chkBoolean) => (event) => {
    setValues({
      ...values,
      [prop]: !chkBoolean,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onJoin = () => {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    console.log(values.name);

    if (values.name === '') {
      setPopup({ ...popup, open: true, comment: '이름을 작성해주세요.' });
      return;
    }
    if (values.email.match(regExp) === null) {
      setPopup({ ...popup, open: true, comment: '이메일을  확인해주세요.' });
      return;
    }
    if (values.password === '' || values.chkPassword === '' || values.password !== values.chkPassword) {
      setPopup({ ...popup, open: true, comment: '비밀번호를  확인해주세요.' });
      // setValues({ ...values, password: '', chkPassword: '' });
      return;
    }
  };
  return (
    <>
      <JoinBlock>
        <TitleBlock>회원가입</TitleBlock>
        <TextField id="outlined-basic" name="name" label="이름" onChange={handleChange('name')} sx={{ width: '350px', m: 1 }} />
        <TextField id="outlined-basic" name="email" label="이메일" onChange={handleChange('email')} sx={{ width: '350px', m: 1 }} />
        <FormControl sx={{ m: 1, width: '350px' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            name="password"
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword('showPassword', values.showPassword)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '350px' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">비밀번호 확인</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showChkPassword ? 'text' : 'password'}
            value={values.chkPassword}
            name="chkPassword"
            onChange={handleChange('chkPassword')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword('showChkPassword', values.showChkPassword)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showChkPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <Button variant="contained" sx={btnStyle} onClick={onJoin}>
            회원가입
          </Button>
          <LineBlock />
          <FontBlock>
            이미 회원이신가요? &nbsp;&nbsp;<Link to="/">로그인하기</Link>
          </FontBlock>
        </FormControl>
        {popup && <PopUp YN={popup.open} title={'경고'} comment={popup.comment} handleClose={() => setPopup(false)} />}
      </JoinBlock>
    </>
  );
}

export default JoinComponent;
