import { configureStore } from '@reduxjs/toolkit';
import CalendarPlanStore from './CalendarPlanStore';
import MemberStore from './MemberStore';

const store = configureStore({
  reducer: {
    calendarPlan: CalendarPlanStore,
    member: MemberStore,
  },
});

export default store;
