import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import store from './store';
import Wrapper from './pages/Wrapper/Wrapper';
import TodoList from './pages/calendarTodoList';
import Login from './pages/login/index';
import JoinComponent from './pages/join/JoinComponent';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  return (
    <>
      {/* <GoogleOAuthProvider clientId={googleAccount}> */}
      <Provider store={store}>
        <BrowserRouter>
          <Wrapper>
            <Routes>
              <Route path="/todoList" element={<TodoList />} />
              <Route path="/" element={<Login setUserInfo={setUserInfo} setIsLogin={setIsLogin} />}></Route>
              <Route path="/join" element={<JoinComponent />}></Route>
            </Routes>
          </Wrapper>
        </BrowserRouter>
      </Provider>
      {/* </GoogleOAuthProvider> */}
    </>
  );
}

export default App;
