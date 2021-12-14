import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { check_auth_status, load_user } from "../../redux/actions/auth";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Layout from "../../hocs/Layout";
import NavBar from "../../components/NavBar";

const Question = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  //유저 정보
  const user = useSelector((state) => state.auth.user);
  const { id } = router.query;
  const [item, setItem] = useState([]);
  const [token, setToken] = useState("");

  const {created} = item;
  const createdAtDate = new Date(created);
  const createdYear = createdAtDate.getFullYear();
  const createdMonth = createdAtDate.getMonth() + 1;
  const createdDate = createdAtDate.getDate();
  const createdHour = createdAtDate.getHours();
  const createdMinutes = createdAtDate.getMinutes();

  const handleData = () => {
    try {
       axios
        .get(`http://127.0.0.1:8000/questions/${id}/detail/`)
        .then((res) => {
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
  }

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
                      <Btn onClick={()=>deleteData(id)}>삭제하기</Btn>
                    </BtnContainer>
                  </>
                ) : (
                  <></>
                )}
              </HeadContainer>  
              <Data>
                {createdYear}년 {createdMonth}월 {createdDate}일 {createdHour}시 {createdMinutes}분
              </Data>
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
  color: #B8B7B4;
`;
