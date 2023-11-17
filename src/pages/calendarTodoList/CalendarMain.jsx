import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../../css/Calendar.css';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { calendarPlanActions } from '../../store/CalendarPlanStore';
import { setLogoutStore } from '../../store/MemberStore';
import { useQuery } from 'react-query';
import { getKakaoLogout } from '../../apis';
import { setLoginStore } from '../../store/MemberStore';
// import { useKakaoLogout } from 'react-kakao-login';
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

const LoginUserInfoBlock = styled.div`
  border: 1px solid black;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LoginInfoNameBlock = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-left: 10px;
`;

const NaverLogoutBtn = styled.button`
  background-color: #19ce60;
  width: 70px;
  height: 40px;
  margin: 6px 0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
// 로그인 버튼 디자인 참조자료
// https://ditoday.com/%EA%B0%84%ED%8E%B8-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%96%B4%EB%96%BB%EA%B2%8C-%ED%95%A0%EA%B9%8C-_-ux-%EB%94%94%EC%9E%90%EC%9D%B8%EA%B3%BC-%EA%B0%9C%EB%B0%9C/

const GoogleLogoutBtn = styled.button`
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  height: 50px;
  width: 60px;
`;

const KakaoLogoutBtn = styled.button`
  background-color: #fee500;
  border: 1px solid #fee500;
  color: #191919;
  border-radius: 6px;
  /* opacity: 0.9; */
  height: 50px;
  width: 60px;
`;

export default function CalendarMain() {
  const selectYMD = useSelector((state) => state.calendarPlan.selectYMD);
  const schedule = useSelector((state) => state.calendarPlan.schedule);
  const userInfo = useSelector((state) => state.member);
  //https://velog.io/@khy226/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%95%B1%EC%97%90-%EB%8B%AC%EB%A0%A5react-calendar-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
  const [mark, setMark] = useState([]);
  console.log('userInfo');
  console.log(userInfo);
  const { user, loginType } = userInfo;
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
  const navigate = useNavigate();

  const OnSelectYMD = (e) => {
    const date = moment(e).format('YYYY-MM-DD');
    dispatch(calendarPlanActions.changeDate(date));
  };
  const kakaoGetProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: '/v2/user/me',
      });
      // 사용자 정보 변수에 저장
      console.log('0030303030303');
      console.log(data);
      const userInfo = {
        email: data.kakao_account.email,
        user: data.properties.nickname,
        profile: data.properties.profile_image,
        loginType: 'K',
      };
      console.log(JSON.stringify(userInfo));
      localStorage.setItem('memberKakao', JSON.stringify(userInfo));

      dispatch(setLoginStore(userInfo));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    kakaoGetProfile();
  }, []);
  const NaverLogout = () => {
    localStorage.removeItem('com.naver.nid.access_token');
    navigate('/');
  };
  // useEffect(() => {
  //   if (loginType === 'K') {
  //     window.Kakao.init(process.env.REACT_APP_KAKAO_AUTH_CLIENT_JAVASCRIPT_ID);
  //   }
  // }, []);
  // const kakao_REST_API_KEY = process.env.REACT_APP_KAKAO_AUTH_CLIENT_JAVASCRIPT_ID;
  // const { isLoading, data, error } = useQuery(['kakaoLogout'], async () => {
  //   const kakaoLogout = await getKakaoLogout(kakaoRestId, '/');
  //   return kakaoLogout;
  // });
  const logout = () => {
    // const { logoutKakao } = useKakaoLogout();

    let loginInfo;
    if (loginType === 'G') loginInfo = 'memberGoogle';
    if (loginType === 'K') {
      const kakao_REST_API_KEY = process.env.REACT_APP_KAKAO_AUTH_CLIENT_REST_ID;
      const kakao_Logout_RedirectURL = 'https://localhost:3000/';
      loginInfo = 'memberKakao';
      // data;
      // logoutKakao();
      //
      // window.Kakao.Auth.logout(() => {
      //   window.Kakao.Auth.setAccessToken(undefined);
      //   window.Kakao.Auth.cleanup();
      //   console.log('로그아웃성공');
      // });

      // window.Kakao.Auth.logout(() => {
      //   console.log('로그아웃성공');
      // });
      // window.Kakao.Auth.setAccessToken(undefined);
      // window.Kakao.Auth.cleanup();
      // document.cookie = `${kakaoClientId}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      // clearAllCookies();

      // if (window.Kakao.Auth.getAccessToken()) {
      //   window.Kakao.API.request({
      //     url: `https://kauth.kakao.com/oauth/logout?client_id=${kakao_REST_API_KEY}&logout_redirect_uri=${kakao_Logout_RedirectURL}`,
      //     success: function (response) {
      //       console.log(response);
      //     },
      //     fail: function (error) {
      //       console.log('error')
      //       console.log(error);
      //     },
      //   });
      //   window.Kakao.Auth.setAccessToken(undefined);
      // }

      if (window.Kakao.Auth.getAccessToken()) {
        window.Kakao.API.request({
          url: '/v1/user/logout',
          success: function (response) {
            console.log(response);
          },
          fail: function (error) {
            console.log(error);
          },
        });
        window.Kakao.Auth.setAccessToken(undefined);
      }
    }
    // document.cookie = 'kakao_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    dispatch(setLogoutStore());

    localStorage.removeItem(loginInfo);
    navigate('/');
  };

  return (
    <>
      {/* 네이버 참조 //https://2mojurmoyang.tistory.com/193 */}
      <LoginUserInfoBlock>
        {/* {loginType === 'N' && <NaverLogoutBtn>Logout</NaverLogoutBtn>} */}

        <LoginInfoNameBlock> "{user}"님 환영합니다.</LoginInfoNameBlock>
        <KakaoLogoutBtn onClick={logout}>Logout</KakaoLogoutBtn>
        {/* {loginType === 'G' ? <GoogleLogoutBtn onClick={logout}>Logout</GoogleLogoutBtn> : loginType === 'K' ? :null} */}
      </LoginUserInfoBlock>
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
