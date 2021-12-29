import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {setQuestion, setPage} from '../modules/questions';
import QuestionList from '../components/questions/QuestionList';
import Prevent from '../components/questions/PreventRerender';

function Popular() {
  const dispatch = useDispatch();
  const {data, count, page, bigCriteria, smallCriteria, loading, error, mineToken} = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(setQuestion(1, "popular" ,"all"));
  }, [dispatch]);
  
  return (
    <Prevent>
        <QuestionList data={data} page={page} count={count}></QuestionList>
    </Prevent>
  );
}

export default React.memo(Popular);
