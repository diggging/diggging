import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {setPopular, setPage} from '../modules/questions';
import Main from './main';
import QuestionList from '../components/questions/QuestionList';

function Popular() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const count = useSelector((state) => state.data.count);
  const page = useSelector((state) => state.data.page);
  const smallCriteria = useSelector((state) => state.data.smallCriteria);
  
  const postPage = (page) => {
    dispatch(setPage(page));
    dispatch(setPopular(page, smallCriteria))
  };

  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(setPopular(page));
    }
  }, [dispatch]);

  return (
    <Main>
        <QuestionList data={data} handlePageChange={postPage} page={page} count={count}></QuestionList>
    </Main>
  );
}

export default React.memo(Popular);
