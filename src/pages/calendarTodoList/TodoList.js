import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

import { useSelector } from 'react-redux';

const TodoListBlock = styled.div`
  /* border: 1px solid black; */
  border-top: 1px dotted #9775fa;
  /* padding: 40px 0; */
  padding-top: 20px;
  padding-bottom: 20px;
  /* flex: 1; */
  overflow-y: auto;
  background: #f8f9fa;
`;

export default function TodoList() {
  const selectYMD = useSelector((state) => state.calendarPlan.selectYMD);
  const schedules = useSelector((state) => state.calendarPlan.schedule);

  return (
    <TodoListBlock>
      {schedules
        .filter((s) => s.ymd === selectYMD)[0]
        ?.plan.map((p) => (
          <TodoItem key={p.ymd + '-' + p.index} text={p.text} done={p.done} index={p.index} />
        ))}
    </TodoListBlock>
  );
}
