import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  pw: '',
  comment: '',
};

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    login: (state, action) => {
      state.selectYMD = action.payload;
    },
    // logout: (state, action) => {},
  },
});

export const memberActions = memberSlice.actions;
export default memberSlice.reducer;
