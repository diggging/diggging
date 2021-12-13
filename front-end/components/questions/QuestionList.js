import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Link from "next/link";
import Paging from "../Paging";
import {handlePageChange} from '../../modules/questions';


function QuestionList({ data, count }) {
  const dispatch = useDispatch();
  // const page = useSelector((state) => state.handlePageChange.pageNumber);
  // const testData = useSelector((state) => state.handlePageChange.data);
  // console.log(page);
  // console.log(testData); 
  
  // const handlePageChange = (pageNumber) => {
  //   console.log(`active page is ${pageNumber}`);
  //   axios
  //     .get(
  //       `http://127.0.0.1:8000/questions/question_list/?big_criteria=recent&page=${pageNumber}&small_criteria=all`
  //     )
  //     .then(res => {
  //       // console.log(data);
  //       setQuestions(res.data.results);
  //       setPage(pageNumber);
  //     })
  // };
  const [page, setPage] = useState(1);

  const postPage = (page) => {
    dispatch(handlePageChange(page))
    setPage(page);
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