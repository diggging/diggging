import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Paging from "../Paging";
import { setRecent } from '../../modules/questions';

function QuestionList({ data, count }) {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.data.page);

  const postPage = (page) => {
    dispatch(setRecent(page));
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