import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../hocs/Layout";
import NavBar from "../../components/NavBar";

const Question = () => {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState([]);

  const handleData = async () => {
    try {
      await axios.get(`http://127.0.0.1:8000/questions/${id}/detail/`)
      .then((res) => {
        setItem(res.data);
        console.log(item);
      })
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleData();
  }, [])

  return (
    <Layout>
      <NavBar>
        <MainContainer>
          <Container>
            {item.id}
          </Container>
        </MainContainer>
      </NavBar>
    </Layout>
  );
};

export default Question;

const MainContainer = styled.div`
  margin-top: 200px;
  margin-bottom: 4.375rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #fafaff;
  box-sizing: border-box;
  box-shadow: 0.75rem 0.75rem 3.75rem 0.5rem rgba(0, 0, 0, 0.2);
  width: 1072px;
  background-color: #fffff;
  margin: auto;
  padding: 2.625rem;
`;