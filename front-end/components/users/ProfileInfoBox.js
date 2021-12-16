import React, {useRef, useState} from 'react'
import { ProfileBioBox } from '../../pages/accountSetting'

import SvgEditIcon from '../../public/static/images/EditIcon'
import FlexColumn from '../common/FlexColumn'
import YellowButton from '../common/YellowButton'
import styled from 'styled-components';
import Image from 'next/image'
import { lighten, darken } from 'polished';

function ProfileInfoBox ({user_profile_image, user_profile_content, id}) {
  const profileImgInput = useRef();
  const [updatedImg, setUpdatedImg] = useState(user_profile_image) //업로드 파일 이미지url

  const onClickUploadFile = () => {
    profileImgInput.current.click();
  }

  const onChangeImg = (e) => {
    const imgToAdded = e.target.file;
    const imgToAddedUrl = URL.createObjectURL(imgToAdded);
    setUpdatedImg(imgToAddedUrl);
  }

  const updateProfileImg = async () => {
    try {
      const apiRes = await axios.put(`${API_URL}/${id}/change_img/`, {
        body: {
          "user_profile_image": updatedImg
        }
      });
      if (apiRes.status === 200) {
        alertService.warn('성공적으로 변경되었습니다.')
      }
    } catch (err) {
      console.log(err)
      alertService.warn('프로필사진 변경 중 문제가 발생했습니다😦')
    }
  }
  return (
    <ProfileBioBox padding="1.875rem">
      <ImageBox>
        <ProfileImgWrapper>
          <Image 
          src={updatedImg}
          width={120} 
          height={120} 
          alt="profileImage" 
          quality={100}/>
           <EditButton onClick={onClickUploadFile}/> 
          </ProfileImgWrapper>
          <YellowButton 
            paddingTop="0.625rem"
            marginRight="0.5rem"
            fontSize="0.8125rem"
            onClick={updateProfileImg}>변경</YellowButton>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          multiple
          ref={profileImgInput}
          style={{display: 'none'}} 
          onChange={(e) => onChangeImg(e)}
        />
      </ImageBox>
      {user_profile_content ? (<ProfileBio>{user_profile_content}</ProfileBio>):(<ProfileBio>아직 자기소개가 없습니다.</ProfileBio>)}
    </ProfileBioBox>
  )
}

export default ProfileInfoBox

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileImgWrapper = styled.div`
  position: relative;
  width: 8.125rem;
  height: 8.125rem;
  object-fit: cover;
  margin-bottom: 0.8125rem;
  text-align: center;
  & img {
    border-radius: 50%;
  }
`;

const EditButton = styled(SvgEditIcon)`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  &:hover rect{
    fill: #000000;
  }
`;

const ProfileBio = styled.p`
  height: 8.125rem;
  max-width: 34.0625rem;
  margin-top: 1.875rem;
  margin-left: 1.5rem;
  font-family: 'Pretendard-Regular';
  
  color: #8D8C85;
  font-size: 1rem;
  line-height: 1.625rem;

  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;
