import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ProfileBox } from '../../pages/accountSetting';
import { Alert } from '../Alert';
import YellowButton from '../common/YellowButton';

const ProfileBioInput = styled.textarea`
  width: 34.375rem;
  height: 8.125rem;
  margin-left: 0.375rem;
  margin-right: 2.625rem;
  outline: none;
  border: none;
  font-family: 'Pretendard-Regular';
  font-size: 0.875rem;
  color: #999893; 

  background-color:#F5F5F7;
  border-radius: 0.5rem;
  padding: 0.875rem 1rem;
`;


function BioUpdateBox({userData, token}) {
  const [bio, setBio] = useState("");
  const {id} = userData.user;

  const onChangeBio = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    } else {
      setBio(e.target.value);
    }
  }

  const onUpdateBio = async (e) => {
    e.preventDefault();
    try {
      const apiRes = await axios(`${API_URL}/users/${id}/change_desc/`);
      if (apiRes === 200) {
        alertService.warn('성공적으로 변경되었습니다.')
      } else {
        alertService.warn('변경 중 문제가 발생했습니다.')
      }
    } catch (err) {
      alertService.warn(err)
    }
  }

  return (
    <ProfileBox padding="2.125rem" onSubmit={(e) => onUpdateBio(e)}>
      <Alert />
      <ProfileBioInput value={bio} onChange={(e) => onChangeBio(e)} placeholder='자기소개를 입력하세요.' />
      <YellowButton type="submit" paddingRight="2.125rem" paddingTop="0.75rem">변경</YellowButton>
    </ProfileBox>
  )
}

export default BioUpdateBox;
