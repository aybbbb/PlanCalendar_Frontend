import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';

import { useSelector } from 'react-redux';
const TodoHeadBlock = styled.div`
  .date {
    display: flex;
  }
  h1 {
    font-size: 21px;
    color: #adb5bd;
  }
  .days {
    font-size: 15px;
    color: #adb5bd;
    margin-top: 18px;
    margin-left: 5px;
  }
  .tasks {
    font-size: 17.5px;
    color: #9775fa;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const DotBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 5px;
  .do {
    background-color: #20c997;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 10px;
    margin-left: 20px;
  }

  .done {
    background-color: #fa5252;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

export default function TodoHead() {
  const selectYMD = useSelector((state) => state.calendarPlan.selectYMD);
  const schedule = useSelector((state) => state.calendarPlan.schedule);

  const planDone = schedule.find((s) => s.ymd === selectYMD)?.plan.filter((f) => !f.done);
  let planeDoneYN = planDone === undefined ? 'no' : planDone;

  const date = moment(selectYMD).format('YYYY년 MM월 DD일');
  const day = moment(selectYMD).format('e');
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <TodoHeadBlock>
      <DotBlock>
        <div className="done"></div>
        <div>할 일을 완료하였습니다.</div>
        <div className="do"></div> <div>할 일이 있습니다.</div>
      </DotBlock>
      <div style={{ borderTop: '1px dashed #9775fa' }}></div>
      <div className="date">
        <h1>{date}</h1>
        <div className="days">{week[day]}요일</div>
      </div>
      <div className="tasks">
        {planeDoneYN !== 'no'
          ? planDone.length === 0
            ? `할 일을 모두 끝냈습니다.`
            : `할 일이 ${planDone.length}개 남았습니다.`
          : '할 일을 등록해주세요.'}
      </div>
    </TodoHeadBlock>
  );
}
