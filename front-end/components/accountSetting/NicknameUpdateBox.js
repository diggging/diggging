import axios from 'axios'
import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { API_URL } from '../../config'
import { ProfileBox } from '../../pages/accountSetting'
import { load_user } from '../../redux/actions/auth'
import { alertService } from '../alert.service'
import GreyInput from '../common/GreyInput'
import YellowButton from '../common/YellowButton'
import YellowTitle from '../common/YellowTitle'
import styled from 'styled-components';
import FlexColumn from '../common/FlexColumn'

function NicknameUpdateBox({userData, token}) {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {id} = userData.user;

  const onChangeNickname = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    } else {
      setNickname(e.target.value);
      if (e.target.value.length > 7) {
        setErrorMessage('닉네임은 7자까지 가능합니다.')
      } 
    }
  }

  const onUpdateNickname = async (e) => {
    console.log(nickname)
    e.preventDefault();
      await axios.patch(`${API_URL}/users/${id}/change_nickname/`, {
        user_nickname: nickname,
      }, {
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${token}`,
          },
      }).then((res) => {
        if (res.status === 200) {
          dispatch(load_user());
          alertService.warn('성공적으로 변경되었습니다.')
        }}).catch((err) => {
          if (err.response.status == 400 || nickname.length > 7) {
            alertService.warn('닉네임 길이는 7자 이하만 가능합니다')
          } else {
            alertService.warn(err);
          }
        })
    }
  return (
    <ProfileBox padding="2.625rem" onSubmit={(e) => onUpdateNickname(e)}>
      <YellowTitle>닉네임 설정</YellowTitle>
      <FlexColumn>
      <GreyInput 
        placeholder="변경할 닉네임"
        value={nickname}
        onChange={(e)=>onChangeNickname(e)}
        width="25rem" height="3.125rem" 
        />
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </FlexColumn>
      <YellowButton type="submit" paddingRight="2.125rem" paddingTop="0.75rem">변경</YellowButton>
    </ProfileBox>
  )
}

export default NicknameUpdateBox


const ErrorMessage = styled.span`
  font-family: 'Pretendard-Medium';
  font-size: 0.75rem;
  color: #B6B6B6;
  margin-top: 0.2rem;
  margin-left: 0.2rem;
`;