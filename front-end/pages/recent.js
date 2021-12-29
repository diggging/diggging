import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuestionList from '../components/questions/QuestionList';
import {setQuestion, setPage, clearBigCriteria} from '../modules/questions';
import Prevent from '../components/questions/PreventRerender';

function Recent() {
  const dispatch = useDispatch();
  const {data, count, page, bigCriteria, smallCriteria, loading, error} = useSelector((state) => state.questions);

  useEffect(() => {
    dispatch(setQuestion(1, "recent" ,"all"));
  }, [dispatch]);
  
  return (
    <Prevent>
        <QuestionList data={data} page={page} count={count}></QuestionList>
    </Prevent>
  );
}

export default React.memo(Recent);
