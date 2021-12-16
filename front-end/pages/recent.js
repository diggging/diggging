import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Main from './main';
import QuestionList from '../components/questions/QuestionList';
import {setRecent, setPage, setBigCriteria} from '../modules/questions';

function Recent() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const count = useSelector((state) => state.data.count);
  const page = useSelector((state) => state.data.page);
  const smallCriteria = useSelector((state) => state.data.smallCriteria);
  const bigCriteria = useSelector((state) => state.data.bigCriteria);

  const postPage = (page) => {
    dispatch(setPage(page));
    dispatch(setRecent(page, smallCriteria))
  };
  
  useEffect(() => {
    dispatch(setRecent(page, "all"));
    dispatch(setBigCriteria("recent"));
  }, [dispatch]);
  
  return (
    <Main>
        <QuestionList data={data} handlePageChange={postPage} page={page} count={count}></QuestionList>
    </Main>
  );
}

export default React.memo(Recent);
