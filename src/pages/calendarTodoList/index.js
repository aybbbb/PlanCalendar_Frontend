import React from 'react';
import CalendarMain from './CalendarMain';

import TodoAdd from './TodoAdd';
import TodoHead from './TodoHead';
import TodoList from './TodoList';

function index() {
  return (
    <>
      <CalendarMain />
      <TodoHead />
      <TodoList />
      <TodoAdd />
    </>
  );
}

export default index;
