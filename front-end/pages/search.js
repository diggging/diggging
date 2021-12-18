import React, { useState } from "react";
import Layout from "../hocs/Layout"
import NavBar from "../components/NavBar";
import ListCard from "../components/search/ListCard"
import SearchInput from "../components/search/SearchInput";
import SearchTab from "../components/search/SearchTab";
import CardContainer from "../components/search/CardContainer";
import NoResultMessage from "../components/search/NoResultMessage";
import axios from 'axios';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import {API_URL} from "../config/index"
function search() {
  const [searchData, setSearchData] = useState([]);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
  <div>
    <Layout
      title='Diggging | 검색'
      content='개발자들을 위한 커뮤니티, 검색페이지'
    >
      <NavBar />
      <SearchInput setLoading={setLoading} setSearchData={setSearchData} setNoData={setNoData} searchData={searchData}/>
      <SearchTab />
      {loading && (
      <LoaderWrapper>
        <Loader type="Puff" color="#FFE59C" width={100} height={100} />
      </LoaderWrapper>
      )}
      {noData ? (<NoResultMessage />) : (<CardContainer searchData={searchData}/>)}
    </Layout>
  </div>
    );
}

export default search;

const LoaderWrapper = styled.div`
  top: 50vh;
  background-color: #FAFAFF;
  text-align: center;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
`;
