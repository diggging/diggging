import React from "react";
import Layout from "../hocs/Layout"
import NavBar from "../components/NavBar";
import ListCard from "../components/search/ListCard"

function search() {
  return (
  <div>
    <Layout />
    <NavBar />
    <ListCard />
  </div>
    );
}

export default search;
