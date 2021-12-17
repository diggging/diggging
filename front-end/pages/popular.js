import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {setQuestion, setPage, clearBigCriteria, clearQuestion, setBigCriteria} from '../modules/questions';
import Main from './main';
import QuestionList from '../components/questions/QuestionList';
import Prevent from '../components/questions/PreventRerender';

function Popular() {
  const dispatch = useDispatch();
  const {data, count, page, bigCriteria, smallCriteria, loading, error} = useSelector((state) => state.questions);

  const postPage = (page) => {
    dispatch(setPage(page));
    dispatch(setQuestion(page, bigCriteria, smallCriteria))
  };

  useEffect(() => {
    dispatch(setQuestion(1, "popular" ,"all"));
    return () => {
      // dispatch(clearBigCriteria())
    }
  }, [dispatch]);
  
  return (
    <Prevent>
        <QuestionList data={data} handlePageChange={postPage} page={page} count={count}></QuestionList>
    </Prevent>
  );
}

export default React.memo(Popular);
