import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Alarm from '../public/static/images/Alarm';
import ToggleBtn from '../public/static/images/ToggleBtn';
import AlarmContainer from './AlarmContainer';
import Image from 'next/image';
import profileDefaultImg from "../public/static/images/DefaultProfileImg"
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import NavItem from './NavBar';
//user라는state가져와서 거기 저장되어있는 프사이미지 사용
//근데 왜 무한루프?
function AuthMenu() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const [imgBase64, setImgBase64] = useState(''); // 파일 base64 : 미리보기용

  // const user = useSelector(state => state.auth.user);
  
  // const {user_profile_image} = user.user;
  // console.log(user_profile_image)
  // const strProfileImg = user_profile_image.toString()
  // console.log(strProfileImg)
  
  // console.log("navBar")
  useEffect(() => {
    if (isAuthenticated === true) {
      const user = useSelector(state => state.auth.user);
  
      const {user_profile_image} = user.user;
      console.log(user_profile_image)
      const strProfileImg = user_profile_image.toString()
      console.log(strProfileImg)
      setImgBase64(strProfileImg);
    }
    // setImgBase64(strProfileImg);
    
  }, [])
  

  const [open, setOpen] = useState({
    alarmOpen: false,
    profileOpen: false,
  });
  const [alarmData, setAlarmData] = useState([]);
  const {alarmOpen, profileOpen} = open;


  const logoutHandler = async () => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
    await dispatch(logout());
    router.push("/loginPage");
  };

  //알람
  // const getAlarmList = async() => {
  //   try {
  //     const apiRes = axios.get(``);
  //     if (apiRes.status === 200) {
  //       setAlarmData(apiRes.data);
  //     } else {
  //       setAlarmData([])
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  return (
    <>
      <Link href="/" passHref>
        <NavItem>
          <Alarm onClick={() => {setOpen({...open, alarmOpen: !alarmOpen})}} />
        </NavItem>
      </Link>
      {alarmOpen && (<AlarmContainer />)}
      {/* <Link href="/" passHref>
        <NavItem>
          <Directory />
        </NavItem>
      </Link> */}
      <NavItem>
        <ToggleContainer onClick={() => {setOpen({...open, profileOpen: !profileOpen})}}>
          <UserImgWrapper>
            <Image 
              src={imgBase64}
              width={40} 
              height={40} 
              alt="profileImage" 
              quality={90}
              layout="fill"
              objectFit="cover"
              />
          </UserImgWrapper>
          <ToggleBtn />
        </ToggleContainer>
        {profileOpen && (
        <DropBox>
          <DropList> 
            <DropListItem><Link href="/questionCreate">새 글 작성</Link></DropListItem>
            <DropListItem><Link 
              // href={{
              //   pathname: `/accountSetting`,
              //   query: {user: JSON.stringify(user)},
              // }}
              // as={`/accountSetting`}
              href="/accountSetting"
              >계정설정</Link>
            </DropListItem>
            <DropListItem><LogoutButton onClick={logoutHandler}>로그아웃</LogoutButton></DropListItem>
          </DropList>
        </DropBox>
        )}
      </NavItem>
    </>
  )
}

export default AuthMenu;


const ToggleContainer = styled.button`
background-color: #ffffff;
border-radius: 0.625rem;
text-align: center;
padding: 0.3125rem;
border: none;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
color: #9faeb6;
position: relative;

& svg {
  margin-left: 10px;
}
`;


const UserImgWrapper = styled.div`
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

const DropBox = styled.div`
background-color: white;
box-shadow: 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.05);
width: 10rem;
padding: 0 1.5rem;
position: absolute;
top: 68px;
right: 60px;
`;

const DropList = styled.ul`
list-style: none;
line-height: 2rem;
font-family: 'Pretendard-Regular';
`;

const DropListItem = styled.li`
color: #B6B6B6;

&:hover {
  color: #343434;
  font-family: 'Pretendard-Medium';
}
`;

const LogoutButton = styled(DropList)`
cursor: pointer;
`;