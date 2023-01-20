import { createSlice } from '@reduxjs/toolkit';

const today = new Date();
const yy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, 0);
const dd = String(today.getDate()).padStart(2, 0);

const initialState = {
  // 다되면 돌려놓기
  // selectYMD: yy + '-' + mm + '-' + dd,
  // schedule: [{ ymd: '', plan: [{ index: 1, text: '', done: true }] }],
  selectYMD: yy + '-' + mm + '-' + dd,
  schedule: [
    {
      ymd: '2022-12-05',
      plan: [
        { index: 1, text: 'ㄷㄷㄷ', done: true },
        { index: 2, text: 'ㄷㄷㄷ1', done: false },
        { index: 3, text: 'ㄷㄷㄷ2', done: false },
      ],
    },
    { ymd: '2022-12-08', plan: [{ index: 6, text: 'ㄷㄷㄷ1', done: true }] },
  ],
};

const calendarPlanSlice = createSlice({
  name: 'calendarplan',
  initialState,
  reducers: {
    changeDate: (state, action) => {
      state.selectYMD = action.payload;
    },
    addPlan: (state, action) => {
      const findIndex = state.schedule.findIndex((s) => s.ymd === state.selectYMD);

      findIndex === -1
        ? (state.schedule = [
            ...state.schedule,
            {
              ymd: state.selectYMD,
              plan: [
                {
                  index: action.payload.index,
                  text: action.payload.text,
                  done: action.payload.done,
                },
              ],
            },
          ])
        : (state.schedule[findIndex].plan = [
            ...state.schedule[findIndex].plan,
            {
              index: action.payload.index,
              text: action.payload.text,
              done: action.payload.done,
            },
          ]);
    },
    donePlan: (state, action) => {
      const findIndex = state.schedule.findIndex((s) => s.ymd === state.selectYMD);
      state.schedule[findIndex].plan.find((s) => s.index === action.payload.index).done = action.payload.done;
    },
    deletePlan: (state, action) => {
      const findIndex = state.schedule.findIndex((s) => s.ymd === state.selectYMD);
      state.schedule[findIndex].plan = state.schedule[findIndex].plan.filter((s) => s.index !== action.payload);
    },
  },
});

export const calendarPlanActions = calendarPlanSlice.actions;
export default calendarPlanSlice.reducer;
