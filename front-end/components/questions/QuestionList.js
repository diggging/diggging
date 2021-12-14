import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Paging from "../Paging";
import { setRecent, setPage } from '../../modules/questions';

function QuestionList({ data, count }) {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.data.page);
  const smallCriteria = useSelector((state) => state.data.smallCriteria);

  const postPage = (page) => {
    dispatch(setPage(page));
    dispatch(setRecent(page, smallCriteria))
  };

  return (
    <div>
      <ul>
        {data.map((list) => (
          <li key={list.id}>
            <Link href={`/questions/${list.id}`} passHref>
              {list.title}
            </Link>
          </li>
        ))}
      </ul>
      <Paging handlePageChange={postPage} page={page} count={count}/>
    </div>
  );
}

export default React.memo(QuestionList);