import axios from 'axios';
import React, { useState } from 'react'
import styled from 'styled-components';
import AlarmList from './AlarmList';


function AlarmContainer() {
  // const {alarmType, postTitle, alarmContent, alarmTime, userProfile, userNickname, isChecked} = alarmData;

  //get해서 알람 리스트 배열로 받아오기 => map으로 반복
  

  const [isChecked, setIsChecked] = useState();
  return (
    <Container>
      <AlarmTop>
        <DeleteAlarm>전체삭제</DeleteAlarm>
        <DeleteAlarm>읽음삭제</DeleteAlarm>
      </AlarmTop>
      <AlarmBottom>
        {/* {alarm.map((alarm) => (<AlarmList key={alarm.id} />))} */}
        <AlarmList />
        <AlarmList />
        <AlarmList />
        <AlarmList />
        <AlarmList />
        <AlarmList />
        <AlarmList />
      </AlarmBottom>
    </Container>
  )
}

export default AlarmContainer;

const Container = styled.div`
  max-width: 23.75rem;
  height: 26.5rem;

  background-color: white;
  border: #e5e5e5;
  border-radius: 0.25rem;
  box-shadow: 0 0.25rem 1.25rem 0 rgba(0,0,0,0.04);

  display:flex;
  flex-direction: column;

  position: absolute;
  top: 4rem;
  right: 3.625rem;
  text-align: right;
`;

const AlarmTop = styled.div`
  width: 100%;
  padding: 0.625rem 1.5rem;
  border-bottom: 1px solid #e5e5e5;
`;

const DeleteAlarm = styled.button`
  border: none;
  background: none;
  padding: 0 0.6rem;

  cursor: pointer;
  color: #8D8C85;
  transition: 300ms;

  font-family: 'Pretendard-Medium';
  font-size: 0.625rem;

  &:hover {
    color: #343434;
    font-family: 'Pretendard-SemiBold';
  }
`;

const AlarmBottom = styled.div`
  width: 100%;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  overflow: scroll;

  
  /* 포인트 modal scroll 커스텀 */
  ::-webkit-scrollbar{ 
    width: 0.5rem; 
  }

  /* 스크롤바 막대 설정*/ 
  ::-webkit-scrollbar-thumb{ 
    height: 17%;
    background-color: #E4E1D6; 
    opacity: 70%;
    border-radius: 0.375rem; 
  } 

  /* 스크롤바 뒷 배경 설정*/ 
  ::-webkit-scrollbar-track{ 
    background-color: none;
  }
`;
