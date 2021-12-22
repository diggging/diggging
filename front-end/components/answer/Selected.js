import React, {useRef, useEffect} from 'react';
import axios from "axios";
import styled from 'styled-components';
import { API_URL } from '../../config';
import { useRouter } from "next/router";


function Selected({setIsOpen, id, token, questionId, isOpen}) {
  const router = useRouter();
  const ref = useRef();

  const selectAnswer = async (id) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Content-Type"] = "application/json";
      await axios
        .put(`${API_URL}/questions/${id}/select_answer/`)
        .then((response) => {
          setIsOpen(false);
          router.reload(`/questions/${questionId}`);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const checkClickOutSide = (e) => {
      if(isOpen === true && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", checkClickOutSide)
    return () => {
      document.addEventListener("click", checkClickOutSide)
    }
  },[isOpen])

  const notSelectAnswer = () => {
    setIsOpen(false);
  }
  isOpen
    return (
        <SelectedContainer ref={ref}>
          <IsSelected>
            채택하시겠습니까?
          </IsSelected>
          <FlexContainer>
            <SelectedBtn onClick={() => selectAnswer(id)}>예</SelectedBtn>
            <SelectedBtn onClick={() => notSelectAnswer()}>아니오</SelectedBtn>
          </FlexContainer>
        </SelectedContainer>
    );
}

export default React.memo(Selected);

const SelectedContainer = styled.div`
  position: absolute;
  width: 12.5rem;
  height: 5rem;
  background: #FFFFFF;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  top: -5.9375rem;
  right: 1rem;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const IsSelected = styled.div`
  height: 100%;
  font-family: 'Pretenard-Bold';
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #343434;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const SelectedBtn = styled.button`
  width: 100px;
  height: 39px;
  background: #ffffff;
  font-family: 'Pretenard-Bold';
  
  &:hover {
    background: rgba(196, 196, 196, 0.15);
  }
`;