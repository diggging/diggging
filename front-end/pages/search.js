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
  const [searchData, setSearchData] = useState([]);
  const [noData, setNoData] = useState(false);

 
  return (
  <div>
    <Layout
      title='Diggging | 검색'
      content='개발자들을 위한 커뮤니티, 검색페이지'
    >
      <NavBar />
      <SearchInput setSearchData={setSearchData} setNoData={setNoData} searchData={searchData}/>
      <SearchTab />
      {/* {noData ? (<NoResultMessage />) : (<CardContainer searchData={searchData}/>)} */}
      <CardContainer searchData={searchData} />
    </Layout>
  </div>
    );
}

export default search;

const NoResultMessage = styled.div`
  //찾는 결과가 없다는 메시지 보여주기
`;