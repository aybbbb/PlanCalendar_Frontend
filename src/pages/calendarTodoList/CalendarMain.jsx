import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../../css/Calendar.css';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { calendarPlanActions } from '../../store/CalendarPlanStore';

const CalendarBlock = styled.div`
  display: flex;
  justify-content: center;
`;

const DotBlock = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: flex;
  margin-left: 1px;
`;

export default function CalendarMain() {
  const selectYMD = useSelector((state) => state.calendarPlan.selectYMD);
  const schedule = useSelector((state) => state.calendarPlan.schedule);

  //https://velog.io/@khy226/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%95%B1%EC%97%90-%EB%8B%AC%EB%A0%A5react-calendar-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
  const [mark, setMark] = useState([]);

  useEffect(() => {
    let scheduleYMD = [];
    // schedule !== undefined && schedule.map((s) => scheduleYMD.push(s.ymd));
    schedule !== undefined &&
      schedule.map((s) =>
        scheduleYMD.push({
          ymd: s.ymd,
          todoYN: s?.plan.filter((f) => !f.done).length,
        }),
      );

    setMark(scheduleYMD);
    // return () => {
    //   cleanup
    // };
  }, [schedule]);

  const dateFromat = new Date(selectYMD);
  const dispatch = useDispatch();

  const OnSelectYMD = (e) => {
    const date = moment(e).format('YYYY-MM-DD');
    dispatch(calendarPlanActions.changeDate(date));
  };

  return (
    <>
      <CalendarBlock>
        <Calendar
          calendarType="US"
          onChange={OnSelectYMD}
          value={dateFromat}
          tileContent={({ date }) => {
            if (mark.map((m) => m.ymd).find((x) => x === moment(date).format('YYYY-MM-DD'))) {
              return (
                <>
                  <div className="flex justify-center items-center absoluteDiv">
                    {
                      <DotBlock
                        style={{ backgroundColor: mark.find((x) => x.ymd === moment(date).format('YYYY-MM-DD')).todoYN ? '#20c997' : '#fa5252' }}
                      ></DotBlock>
                    }
                  </div>
                </>
              );
            }
          }}
        />
      </CalendarBlock>
    </>
  );
}
