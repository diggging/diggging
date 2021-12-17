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


function NicknameUpdateBox({userData, token}) {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState('');

  const {id} = userData.user;

  const onChangeNickname = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    } else {
      setNickname(e.target.value);
      console.log(nickname)
    
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
        } else {
        alertService.warn('변경 중 문제가 발생했습니다.')
       }
      })
    }
  return (
    <ProfileBox padding="2.625rem" onSubmit={(e) => onUpdateNickname(e)}>
      <YellowTitle>닉네임 설정</YellowTitle>
      <GreyInput 
        placeholder="변경할 닉네임"
        value={nickname}
        onChange={(e)=>onChangeNickname(e)}
        width="25rem" height="3.125rem" 
        marginLeft="3rem" marginRight="2.625rem" />
      <YellowButton type="submit" paddingRight="2.125rem" paddingTop="0.75rem">변경</YellowButton>
    </ProfileBox>
  )
}

export default NicknameUpdateBox
