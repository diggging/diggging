import axios from 'axios';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { API_URL } from '../../config';
import SearchIcon from '../../public/static/images/Search';
import CloseIcon from '../../public/static/images/CloseIcon';

function SearchInput({setSearchData, setNoData, searchData}) {
  const [searchInput, setSearchInput] = useState("");

  const onInputChange = (e) => {
    setSearchInput(e.target.value);
  }

  const getSearchData = async () => {
    const trimmedInput = searchInput.trim();
    axios.defaults.headers.common['authorization'] = ''; 
    if (trimmedInput == '') {
      const apiRes = await axios.get(`${API_URL}/posts/search_quest/`)
      return apiRes;
    } else {
      const apiRes = await axios.get(`${API_URL}/posts/search_quest_result/${trimmedInput}`)
      return apiRes;
    }
  }

  const onSubmitSearch = async (e) => {
    e.preventDefault();
      //get해오는api연결
      try {
        const apiRes = await getSearchData()
        if (apiRes.status == 200) {
          const newData = [...apiRes.data];
          await setSearchData(newData); //searchData로 담아주기
          if (newData.length == 0) { //검색결과가 없을 때
            setNoData(true); //noResult 컴포넌트 뜰 수 있도록
          } else {
            setNoData(false);
          }
          return {searchData};
        } else {
          console.log(apiRes)
        }
      } catch (err) {
        return {err}
      }
  }

  const onClickReset = () => {
    setSearchInput('');
  }

  return (
    <form onSubmit={(e) => onSubmitSearch(e)}>
      <SearchInputBox>
        <SearchIcon width="1.75rem" height="1.625rem" />
        <StyledSearchInput 
          type="text" 
          placeholder="무엇을 찾고 있나요?" 
          value={searchInput}
          onChange={(e) => onInputChange(e)} />
        {searchInput && <CloseIcon onClick={onClickReset} cursor="pointer"/>}
      </SearchInputBox>
    </form>
  )
}

export default SearchInput;

const SearchInputBox = styled.div`
  margin: 7.125rem auto 2.25rem auto;
  width: 46.25rem;
  padding: 0 1.875rem;

  display: flex;
  flex-direction: row;
  align-items: center;

  background-color: white;
  border: solid 1px #E5E5E5;
  border-radius: 0.25rem;
  background-color: white;

  &:hover path {
    fill: #202020;
    transition: all ease-in 200ms;
  }
`;

const StyledSearchInput = styled.input`
  ${({ theme }) => {
      const { colors, device } = theme;
      return css`
        width: 100%;
        height: 4.5rem;
        margin-left: 1.2rem;
        border: none;
        outline: none;
        
        font-size: 1.5rem;
        font-family: 'Pretendard-Regular';
        color: ${colors.grey}; //c4c4c4
        
        &:hover{
          transition: 300ms;
          color: ${colors.black};
          font-family: 'Pretendard-Medium';
        }

        ::placeholder {
          color: ${colors.grey};
        }
        ::placeholder:hover {
          color: ${colors.black};
        }
        
        &:active {
          outline: none;
        }
        ${device.tablet} {
          font-size: 1.375rem;
        }

        ${device.mobile} {
          font-size: 1.25rem;
        }
      `;
    }}
`