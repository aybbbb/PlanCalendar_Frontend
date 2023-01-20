import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { BsPlusCircle } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import { calendarPlanActions } from '../../store/CalendarPlanStore';
import PopUp from '../../components/PopUp';

const TodoAddBlock = styled.button`
  display: flex;
  justify-content: flex-end;
  /* margin-right: 5px; */
  background: #f8f9fa;
  font-size: 30px;
  color: #7950f2;
  cursor: pointer;
  border: none;
  /* left: 50%; */
`;

const InputForm = styled.form`
  background: #f8f9fa;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

const InputBlock = styled.div`
  display: flex;
  flex-direction: row;
`;
const Text = styled.input`
  border: 1px solid #9775fa;
  outline: none;
  width: 100%;
  font-size: 20px;
  box-sizing: border-box;
  border-radius: 4px;
  margin-left: 2px;
`;
const SumbitBtn = styled.button`
  background: #9775fa;
  color: white;
  font-size: 20px;
  border: none;
  margin-left: 2px;
  border-radius: 4px;
  margin-right: 2px;
`;
export default function TodoAdd() {
  const selectYMD = useSelector((state) => state.calendarPlan.selectYMD);

  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState('');
  const [popup, setPopup] = useState(false);

  const focus = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    setShowInput(false);
    setText('');
  }, [selectYMD]);

  const showInputBox = () => {
    setShowInput(!showInput);
  };
  const onChangeText = (e) => {
    setText(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      setPopup(true);
      focus.current.focus();
      return;
    }
    dispatch(calendarPlanActions.addPlan({ index: nanoid(), text, done: false }));
    setShowInput(!showInput);
    setText('');
  };
  return (
    <>
      {showInput && (
        <InputForm onSubmit={onSubmit}>
          <InputBlock>
            <Text placeholder="Enter 버튼 또는 OK버튼을 누르세요" name="todo" value={text} onChange={onChangeText} ref={focus} autoFocus />
            <SumbitBtn onClick={onSubmit}>OK</SumbitBtn>
          </InputBlock>
        </InputForm>
      )}
      {!showInput && (
        <TodoAddBlock>
          <BsPlusCircle value={showInput} onClick={showInputBox} />
        </TodoAddBlock>
      )}
      {popup && <PopUp YN={popup} title={'경고'} comment={'할 일을 입력해주세요.'} handleClose={() => setPopup(false)} />}
    </>
  );
}
