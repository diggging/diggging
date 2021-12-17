import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ProfileBox } from '../../pages/accountSetting';
import { Alert } from '../Alert';
import YellowButton from '../common/YellowButton';
import {alertService} from '../alert.service';
import {API_URL} from '../../config/index'
import { load_user } from '../../redux/actions/auth';
import { useDispatch } from 'react-redux';


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
  const dispatch = useDispatch();
  const [bio, setBio] = useState("");
  const {id} = userData.user;

  const onChangeBio = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    } else {
      setBio(e.target.value);
    }
  }
  
  console.log(token, `token`);
  console.log('안녕');
  const onUpdateBio = async (e) => {
    e.preventDefault();
      await axios.patch(`${API_URL}/users/${id}/change_desc/`, {
        user_profile_content: bio,
      }, {
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${token}`,
          },
      }).then((res) => {
        if (res.status === 200) {
          alertService.warn('성공적으로 변경되었습니다.')
          dispatch(load_user());
        } else {
        alertService.warn('변경 중 문제가 발생했습니다.')
       }
      })
    }
  return (
    <ProfileBox padding="2.125rem" onSubmit={(e) => onUpdateBio(e)}>
      <ProfileBioInput value={bio} onChange={(e) => onChangeBio(e)} placeholder='자기소개를 입력하세요.' />
      <YellowButton type="submit" paddingRight="2.125rem" paddingTop="0.75rem">변경</YellowButton>
    </ProfileBox>
  )
}

export default BioUpdateBox;
