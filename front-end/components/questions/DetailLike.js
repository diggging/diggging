import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import LikeDetail from "../../public/static/images/LikeDetail";
import LinkDetail from "../../public/static/images/LinkDetail";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRouter } from "next/router";

import Link from "next/link";


const Container = styled.div`
  position: absolute;
  right: 1.5rem;
`;

const ElementContainer = styled.div`
  width: 145px;
  height: 93px;
  background: #f5f5f5;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Element = styled.div`
  margin: 0 auto;
  cursor: pointer;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 19px;
  text-align: center;
  color: #5f5f5f;
`;

const LinkClickAlarm = styled.div`
  width: 145px;
  height: 50px;
  background: #f5f5f5;
  border-radius: 20px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 19px;
  text-align: center;
  color: #5f5f5f;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

function DetailLike({ token, id, itemLike }) {
  const router = useRouter();
  const [like, setLike] = useState([]);
  const [isClick, setIsClick] = useState(false);
  
  const url =
    typeof window !== "undefined" && window.location.origin
      ? window.location.href
      : "";

  const handleLike = async (id) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Content-Type"] = "application/json";
      await axios
        .put(`http://127.0.0.1:8000/questions/${id}/like_create/`)
        .then((response) => {
          console.log(response.data.helped_num);
          setLike(response.data.helped_num);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleData = () => {
    try {
      axios.get(`http://127.0.0.1:8000/questions/${id}/detail/`).then((res) => {
      setLike(res.data.helped_num);
      });
    } catch (e) {
      console.log(e);
    }
  };


  const handleLinkAlarm = () => {
    if(isClick) {
      setIsClick(false)
    } else {
      setIsClick(true)
    }
  }

  useEffect(() => {
    handleData();
  }, [])

  return (
    <Container>
      <ElementContainer>
        <FlexContainer>
          <Element onClick={() => handleLike(id)}>
            <LikeDetail />
          </Element>
          {like}
        </FlexContainer>

        <FlexContainer>
          <CopyToClipboard text={url}>
            <Element onClick={()=>handleLinkAlarm()}>
              <LinkDetail />
            </Element>
          </CopyToClipboard>
          {"LINK"}
        </FlexContainer>
      </ElementContainer>
      {isClick ? (
        <>
          <LinkClickAlarm>링크가 복사되었습니다.</LinkClickAlarm>
        </>
      ) : null}
    </Container>
  );
}

export default DetailLike;
