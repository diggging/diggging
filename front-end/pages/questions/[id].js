import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { check_auth_status, load_user } from "../../redux/actions/auth";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Layout from "../../hocs/Layout";
import NavBar from "../../components/NavBar";
import dynamic from "next/dynamic";

const Question = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  //유저 정보
  const user = useSelector((state) => state.auth.user);
  const { id } = router.query;
  const [item, setItem] = useState([]);
  const [token, setToken] = useState("");

  const { created } = item;
  const createdAtDate = new Date(created);
  const createdYear = createdAtDate.getFullYear();
  const createdMonth = createdAtDate.getMonth() + 1;
  const createdDate = createdAtDate.getDate();
  const createdHour = createdAtDate.getHours();
  const createdMinutes = createdAtDate.getMinutes();

  const handleData = () => {
    try {
      axios.get(`http://127.0.0.1:8000/questions/${id}/detail/`).then((res) => {
        setItem(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  //삭제하기
  const deleteData = async (id) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Content-Type"] = "application/json";
      await axios
        .delete(`http://127.0.0.1:8000/questions/${id}/delete/`)
        .then((response) => {
          console.log(response);
          router.push(`/`);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getAccessToken = async () => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(check_auth_status())
        .then((res) => res.json())
        .then((data) => {
          const accessToken = data.access;
          setToken(accessToken);
        })
        .catch((err) => console.log(err));
    }
  };
  const Viewer = dynamic(() => import("../../components/questions/View"), {
    ssr: false,
  });

  //id값을 넣어줘야 데이터가 안사라짐
  useEffect(() => {
    getAccessToken();
    if (id && id > 0) {
      handleData();
    }
  }, [id]);

  //token 확인(refresh, verify)
  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(check_auth_status());
    dispatch(load_user());
  }, [dispatch]);

  return (
    <Layout>
      <NavBar />
      {item ? (
        <>
          <MainContainer>
            <Container>
              <HeadContainer>
                <Title>{item.title}</Title>
                {item.user?.id === user?.user?.id ? (
                  <>
                    <BtnContainer>
                      <Link href={`/questions/update/${item.id}`} passHref>
                        <Btn>수정하기</Btn>
                      </Link>
                      <Btn onClick={() => deleteData(id)}>삭제하기</Btn>
                    </BtnContainer>
                  </>
                ) : (
                  <></>
                )}
              </HeadContainer>
              <Data>
                {createdYear}년 {createdMonth}월 {createdDate}일 {createdHour}시{" "}
                {createdMinutes}분
              </Data>

              <DescContainer>
                <Viewer desc={item.desc} />
              </DescContainer>

              <FlexContainer>
                <HashContainer>
                  {item.question_tags?.map((hash) => (
                    <Hash>{hash}</Hash>
                  ))}
                </HashContainer>
                <CommentBtn>댓글 접기</CommentBtn>
              </FlexContainer>

              <ProfileContainer>
                <ProfileImg></ProfileImg>
                <ProfileInfoContainer>
                  {item.user?.user_nickname ? (
                    <>
                      <ProfileName>{item.user.user_nickname}</ProfileName>
                      <ProfileLevel>LV.{item.user.user_level}</ProfileLevel>
                    </>
                  ) : null}
                </ProfileInfoContainer>
                {item.user?.user_profile_content ? (
                  <>
                    <ProfileContent>
                      {item.user.user_profile_content.slice(0, 250)}
                    </ProfileContent>
                  </>
                ) : null}
              </ProfileContainer>
            </Container>
          </MainContainer>
        </>
      ) : null}
    </Layout>
  );
};

export default Question;

const MainContainer = styled.div`
  margin-top: 12.5rem;
  margin-bottom: 4.375rem;
`;

const Container = styled.div`
  width: 64rem;
  display: flex;
  height: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.04);
  border-radius: 2px;
  background-color: #ffffff;
  margin: auto;
  padding: 2.625rem;
`;

const HeadContainer = styled.div`
  width: 58.375rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  border-bottom: 1px solid #ececec;
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 3rem;
  color: #212529;
`;

const Btn = styled.div`
  width: 100%;
  height: 1.1875rem;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 0.8125rem;
  line-height: 1.1875rem;
  text-align: center;
  color: #5f5f5f;
  cursor: pointer;
  margin-left: 0.8125rem;

  &:hover {
    color: #212529;
  }
`;

const Data = styled.div`
  margin-top: 5px;
  margin-right: auto;
  height: 19px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  color: #b8b7b4;
`;

const DescContainer = styled.div`
  margin-top: 60px;
  margin-bottom: 60px;
`;

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HashContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Hash = styled.div`
  padding: 0.625rem;
  height: 1.125rem;
  background: rgba(219, 214, 199, 0.4);
  border-radius: 1.25rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 0.9375rem;
  font-size: 0.625rem;
  line-height: 1rem;
  text-align: right;
  color: #7a7a7a;
`;

const CommentBtn = styled.div`
  width: 98px;
  height: 37px;
  /* border: 1px solid #FFFFFF; */
  border-radius: 25px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 19px;
  text-align: center;
  color: #5f5f5f;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ececec;
  border-top: 1px solid #ececec;
  margin-top: 25px;
  padding: 30px 20px;
`;

const ProfileImg = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(239.19deg, #fabe56 26.85%, #fbd362 73.3%);
  border-radius: 50px;
  margin-right: 20px;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  margin-right: 20px;
`;

const ProfileName = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 23px;
  color: #343434;
`;

const ProfileLevel = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  color: #7a7a7a;
`;

const ProfileContent = styled.div`
  width: 672px;
  height: 38px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 19px;
  color: #8d8c85;
  display: flex;
  align-items: center;
`;
