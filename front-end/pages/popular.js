import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {setPopular, setPage, setBigCriteria} from '../modules/questions';
import Main from './main';
import QuestionList from '../components/questions/QuestionList';

function Popular() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const count = useSelector((state) => state.data.count);
  const page = useSelector((state) => state.data.page);
  const smallCriteria = useSelector((state) => state.data.smallCriteria);
  const bigCriteria = useSelector((state) => state.data.bigCriteria);

  const postPage = (page) => {
    dispatch(setPage(page));
    dispatch(setPopular(page, smallCriteria))
  };

  console.log("인기");

  useEffect(() => {
    if (bigCriteria === "recent") {
      dispatch(setBigCriteria("popular"));
      dispatch(setPopular(page, "all"));
    } 

    if (bigCriteria === "mine") {
      dispatch(setBigCriteria("popular"));
      dispatch(setPopular(page, "all"));
    }

    dispatch(setBigCriteria("popular"));
    dispatch(setPopular(page, "all"));

  }, [dispatch, bigCriteria]);

  return (
    <Main>
        <QuestionList data={data} handlePageChange={postPage} page={page} count={count}></QuestionList>
    </Main>
  );
}

export default React.memo(Popular);
