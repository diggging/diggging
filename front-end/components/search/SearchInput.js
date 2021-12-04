import axios from 'axios';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { API_URL } from '../../config';
import SearchIcon from '../../public/static/images/Search';

function SearchInput({setSearchData, setNoData, searchData}) {
  console.log(searchData, 'searchData나와라');
  const [searchInput, setSearchInput] = useState("");

  const onInputChange = (e) => {
    setSearchInput(e.target.value);
    console.log(searchInput);
  }
  
  const getSearchData = async () => {
    const apiRes = await axios.get(`${API_URL}/posts/search_quest_result/${searchInput}`)
    return apiRes;
  }

  const onSubmitSearch = async (e) => {
    e.preventDefault();
      //get해오는api연결
      try {
        const apiRes = await getSearchData()
        if (apiRes.status == 200) {
          console.log(apiRes.data, 'apiRes.data')
          const newData = [...apiRes.data];
          console.log(newData)
          await setSearchData(newData); //searchData로 담아주기
          console.log(searchData, 'searchData');
          setNoData(false);
          return {searchData};
        } else {
          // setSearchData([])
          setNoData(true);
          return {searchData};
        }
      } catch (err) {
        return {err}
      }
  }

  return (
    <form onSubmit={(e) => onSubmitSearch(e)}>
      <SearchInputBox>
        <StyledSearchInput 
          type="text" 
          placeHolder="검색어를 입력해주세요" 
          onChange={(e) => onInputChange(e)} />
        <SearchIcon width="1.75rem" height="1.625rem" />
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
        margin-right: 1.875rem;
        border: none;
        
        font-size: 1.5rem;
        font-family: 'Pretendard-Regular';
        color: ${colors.grey}; //c4c4c4
        
        outline: none;
        
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