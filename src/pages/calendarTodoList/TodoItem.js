import React from 'react';
import styled, { css } from 'styled-components';
import { HiOutlineCheck } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { calendarPlanActions } from '../../store/CalendarPlanStore';

const CheckBoxBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ced4da;
  font-size: 25px;
  border: 1px solid #ced4da;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #7950f2;
      color: #7950f2;
    `}
`;

const TaskText = styled.div`
  flex: 1;
  align-items: center;
  color: #495057;
  font-size: 20px;
  margin-left: 5px;

  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

const RemoveBlock = styled.div`
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #868e96;
  font-size: 23px;
  cursor: pointer;
  &:hover {
    color: #fa5252;
  }
`;
const TodoItemBlock = styled.div`
  display: flex;
  margin-bottom: 5px;
  margin-left: 2px;
  &:hover {
    ${RemoveBlock} {
      // TodoItemBlock 에 hover 됐을때 다음과같은 css 적용
      opacity: 1;
    }
  }
`;
export default function TodoItem({ index, text, done }) {
  const dispatch = useDispatch();

  const OnDone = () => {
    dispatch(calendarPlanActions.donePlan({ index, done: !done }));
  };

  const onRemove = () => {
    dispatch(calendarPlanActions.deletePlan(index));
  };
  return (
    <TodoItemBlock>
      <CheckBoxBlock done={done} onClick={OnDone}>
        {done && <HiOutlineCheck />}
      </CheckBoxBlock>
      <TaskText done={done}>{text}</TaskText>
      <RemoveBlock onClick={onRemove}>
        <RiDeleteBin6Line />
      </RemoveBlock>
    </TodoItemBlock>
  );
}
