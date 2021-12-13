import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Main from './main';
import QuestionList from '../components/questions/QuestionList';
import {setRecent} from '../modules/questions';

function Recent() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const count = useSelector((state) => state.data.count);
  const page = useSelector((state) => state.data.page);
  console.log(data);

  const postPage = (page) => {
    setRecent(page);
  };
  
  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(setRecent(page));
    }
  }, [dispatch]);
  
  return (
    <Main>
        <QuestionList data={data} handlePageChange={postPage} page={page} count={count}></QuestionList>
    </Main>
  );
}

export default React.memo(Recent);
