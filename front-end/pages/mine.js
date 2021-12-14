import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Main from './main';
import QuestionList from '../components/questions/QuestionList';
import {setMine, setPage} from '../modules/questions';


function Mine() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const count = useSelector((state) => state.data.count);
  const page = useSelector((state) => state.data.page);
  const smallCriteria = useSelector((state) => state.data.smallCriteria);

  const postPage = (page) => {
    dispatch(setPage(page));
    dispatch(setMine(page, smallCriteria))
  };

  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(setMine(page));
    }
  }, [dispatch]);

  return (
    <Main>
        <QuestionList data={data} handlePageChange={postPage} page={page} count={count}></QuestionList>
    </Main>
  );
}

export default React.memo(Mine);
