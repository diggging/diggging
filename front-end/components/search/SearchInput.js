import React from 'react';
import styled, { css } from 'styled-components';
import SearchIcon from '../../public/static/images/Search';

function SearchInput({handleSearchInput, handleSearchEnter}) {
  

  return (
    <SearchInputBox>
      <SearchIcon width="1.75rem" height="1.625rem" />
      <StyledSearchInput 
        type="text" 
        placeHolder="검색어를 입력해주세요" 
        onChange={handleSearchInput}
        onKeyDown={handleSearchEnter}/>
    </SearchInputBox>
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
        margin-left: 1.875rem;
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