import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  email: '',
  id: '',
  pw: '',
  profile: '',
  loginType: '', // 로그인 종류 (G:구글, N:네이버, K: 카카오, E:회원가입해서들어오는 경우)
};

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    setLoginStore: (state, { payload }) => {
      console.log('payload');
      console.log({ payload });
      state.user = payload.user;
      state.email = payload.email;
      state.profile = payload.profile;
      state.loginType = payload.loginType;
    },
    setLogoutStore: () => initialState,
  },
});

export const { setLoginStore, setLogoutStore } = memberSlice.actions;
export default memberSlice.reducer;
