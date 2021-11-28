import React from "react";
import Layout from "../hocs/Layout"
import NavBar from "../components/NavBar";
import ListCard from "../components/search/ListCard"
import SearchInput from "../components/search/SearchInput";
import SearchTab from "../components/search/SearchTab";
import CardContainer from "../components/search/CardContainer";


function search() {

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      //get해오는api연결
    }
  }

  return (
  <div>
    <Layout
      title='Diggging | 검색'
      content='개발자들을 위한 커뮤니티, 검색페이지'
    >
      <NavBar />
      <SearchInput />
      <SearchTab />
      <CardContainer />
    </Layout>
  </div>
    );
}

export default search;
