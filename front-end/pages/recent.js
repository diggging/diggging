import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Main from './main';
import QuestionList from '../components/questions/QuestionList';
import {setQuestion, setPage, clearBigCriteria, clearQuestion} from '../modules/questions';

function Recent() {
  const dispatch = useDispatch();
  const {data, count, page, bigCriteria, smallCriteria, loading, error} = useSelector((state) => state.questions);

  const postPage = (page) => {
    dispatch(setPage(page));
    dispatch(setQuestion(page, bigCriteria, smallCriteria))
  };
  
  useEffect(() => {
    dispatch(setQuestion(1, "recent" ,"all"));
    return () => {
      dispatch(clearQuestion())
    }
  }, [dispatch]);
  
  return (
    <Main>
        <QuestionList data={data} handlePageChange={postPage} page={page} count={count}></QuestionList>
    </Main>
  );
}

export default React.memo(Recent);
