import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components';
import LikeDetail from '../../public/static/images/LikeDetail';
import LinkDetail from '../../public/static/images/LinkDetail';

const Container = styled.div`
  position: absolute;
  right: 1.5rem;
`;

const ElementContainer = styled.div`
  width: 145px;
  height: 93px;
  background: #F5F5F5;
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
  color: #5F5F5F;
`;

function DetailLike({ token, id }) {
    const [like, setLike] = useState(0);

    const handleLike = async() => {
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
    }

    return (
        <Container>
          <ElementContainer>
            
            <FlexContainer>
              <Element onClick={()=>handleLike()}>
                <LikeDetail />
              </Element>
              {like}
            </FlexContainer>

            <FlexContainer>
              <Element>
                <LinkDetail />
              </Element>  
              {"LINK"}
            </FlexContainer>

            
          </ElementContainer>
        </Container>
    );
}

export default DetailLike;