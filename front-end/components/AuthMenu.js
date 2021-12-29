
//user라는state가져와서 거기 저장되어있는 프사이미지 사용

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { NavItem } from "./NavBar";
import Link from "next/link";
import AlarmContainer from "./AlarmContainer";
import Directory from "../public/static/images/Directory";
import Image from "next/image";
import ToggleBtn from "../public/static/images/ToggleBtn"
import styled from 'styled-components';
import { useState } from "react";
import Alarm from "../public/static/images/Alarm"
import { logout } from "../redux/actions/auth";


//근데 왜 무한루프?
function AuthMenu({userData, isAuthenticated}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [imgBase64, setImgBase64] = useState(''); //파일미리보기용
  if (userData) {
    const {user_profile_image} = userData.user;
    const strProfileImg = user_profile_image.toString();
    setImgBase64(strProfileImg);
  }

  const [alarmOpen, setAlarmOpen] = useState(false);
  const [toggleOpen, setToggleOpen] = useState(false);

  const openAlarmHandler = () => {
    setAlarmOpen(alarmOpen => !alarmOpen)
  }

  const openToggleHandler = () => {
    setToggleOpen(toggleOpen => !toggleOpen)
  }


  // const [alarmData, setAlarmData] = useState([]);

  const logoutHandler = async () => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(logout)
      router.push("/loginPage");
    }
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
  console.log(userData);
  return (
    <>
      {userData?.user.id && (<>
      <Link href="/" passHref>
        <NavItem>
          <Alarm onClick={() => openAlarmHandler()} />
        </NavItem>
      </Link>
      {alarmOpen && (<AlarmContainer />)}
      {/* <Link href="/" passHref>
        <NavItem>
          <Directory />
        </NavItem>
      </Link> */}
      <NavItem>
        <ToggleContainer >
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
          <ToggleBtn onClick={() => openToggleHandler}/>
        </ToggleContainer>
        {toggleOpen && (
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
            <DropListItem><LogoutButton onClick={() => logoutHandler()}>로그아웃</LogoutButton></DropListItem>
          </DropList>
        </DropBox>
        )}
      </NavItem>
    </>)}
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