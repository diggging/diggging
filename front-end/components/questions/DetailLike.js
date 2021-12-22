import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import LikeDetail from "../../public/static/images/LikeDetail";
import LinkDetail from "../../public/static/images/LinkDetail";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRouter } from "next/router";
import { API_URL } from "../../config/index";
import { alertService } from "../alert.service";

function DetailLike({ token, id, handleLinkAlarm }) {
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
        .put(`${API_URL}/questions/${id}/like_create/`)
        .then((response) => {
          setLike(response.data.helped_num);
        })
        .catch((e) => {
          if (e.response.status === 403) {
            alertService.warn("작성자는 좋아요를 누를 수 없습니다!");
          } else if(e.response.status === 401) {
            alertService.warn("로그인 후 이용해주세요.");
          }
        });
    } catch (e) {
      alertService.warn("로그인 후 이용해주세요.");
    }
  };

  const handleData = () => {
    try {
      axios.get(`${API_URL}/questions/${id}/detail/`).then((res) => {
        setLike(res.data.helped_num);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

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
            <Element onClick={() => handleLinkAlarm()}>
              <LinkDetail />
            </Element>
          </CopyToClipboard>
          <span>LINK</span>
        </FlexContainer>
      </ElementContainer>
    </Container>
  );
}

export default DetailLike;

const Container = styled.div`
  position: fixed;
  right: 2%;
  top: 10%;
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
  font-family: 'Pretendard-Bold';
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
  font-family: 'Pretendard-Bold';
  font-size: 13px;
  line-height: 19px;
  text-align: center;
  color: #5f5f5f;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
