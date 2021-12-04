import React, { useState } from "react";
import Layout from "../hocs/Layout"
import NavBar from "../components/NavBar";
import ListCard from "../components/search/ListCard"
import SearchInput from "../components/search/SearchInput";
import SearchTab from "../components/search/SearchTab";
import CardContainer from "../components/search/CardContainer";
import axios from 'axios';
import styled from 'styled-components';

import {API_URL} from "../config/index"
function search() {
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [noData, setNoData] = useState(false);
  //검색어 입력창 input관리하기
  const handleSearchInput = async (e) => {
    if (e.key == "Enter") {//엔터쳤을 때 검색되게
      //get해오는api연결
      console.log('엔터!');
      console.log(searchInput)
      const apiRes = await axios.get(`${API_URL}/posts/search_quest_result/${searchInput}`)
      console.log(apiRes);
      if (apiRes) {
        console.log(apiRes.status, 'apiRes.status')
        console.log(apiRes, 'apiRes')
        setSearchData(apiRes); //searchData로 담아주기
        setNoData(false);
      } else {
        setNoData(true);
      }
    } else {
      setSearchInput(e.target.value);
    }
  }

  return (
  <div>
    <Layout
      title='Diggging | 검색'
      content='개발자들을 위한 커뮤니티, 검색페이지'
    >
      <NavBar />
      <SearchInput handleSearchInput={(e) => handleSearchInput(e)}/>
      <SearchTab />
      <CardContainer searchData={searchData}/>
      {noData && <NoResultMessage />}
    </Layout>
  </div>
    );
}

export default search;

const NoResultMessage = styled.div`
  //찾는 결과가 없다는 메시지 보여주기
`;