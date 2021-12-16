import axios from 'axios'
import React, {useState} from 'react'
import { API_URL } from '../../config'
import { ProfileBox } from '../../pages/accountSetting'
import { Alert } from '../Alert'
import { alertService } from '../alert.service'
import GreyInput from '../common/GreyInput'
import YellowButton from '../common/YellowButton'
import YellowTitle from '../common/YellowTitle'

function NicknameUpdateBox({userData, token}) {
  const [nicknameState, setNicknameState] = useState();
  const {id} = userData.user;
  const onChangeNicknameState = async(e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
    setNicknameState(e.target.value);
  }

  const onUpdateNickname = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Content-Type"] = "application/json";
      await axios
      .patch(`${API_URL}/users/${id}/change_nickname`, {
        user_nickname: nicknameState
      })
      .then((response) => {
        if (response.status == 200) {
          alertService.warn('성공적으로 변경되었습니다.')
        } else {
          alertService.warn('닉네임 변경 중 문제가 발생했습니다.');
        }
      })
    } catch (err) {
      console.log(err.response)
      alertService.warn(err)
    }
  }

  return (
    <ProfileBox padding="2.625rem" onSubmit={(e) => onUpdateNickname(e)}>
      <Alert />
      <YellowTitle>닉네임 설정</YellowTitle>
      <GreyInput 
        value={nicknameState}
        onChange={(e) => onChangeNicknameState}
        width="25rem" height="3.125rem" 
        marginLeft="3rem" marginRight="2.625rem" />
      <YellowButton type="submit" paddingRight="2.125rem" paddingTop="0.75rem">변경</YellowButton>
    </ProfileBox>
  )
}

export default NicknameUpdateBox
