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

  //id값을 넣어줘야 데이터가 안사라짐
  useEffect(() => {
    if (id && id > 0) {
      handleData();
    }
  }, [id]);

  //token 확인(refresh, verify)
  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      // dispatch(check_auth_status());
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
                      <Btn>삭제하기</Btn>
                    </BtnContainer>
                  </>
                ) : (
                  <></>
                )}
              </HeadContainer>
            </Container>
          </MainContainer>
        </>
      ) : null}
    </Layout>
  );
};

export default Question;

const MainContainer = styled.div`
  margin-top: 200px;
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
  width: 934px;
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
  font-size: 20px;
  line-height: 48px;
  color: #212529;
`;

const Btn = styled.div`
  width: 100%;
  height: 19px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 19px;
  text-align: center;
  color: #5f5f5f;
  cursor: pointer;
  margin-left: 13px;

  &:hover {
    color: #212529;
  }
`;
