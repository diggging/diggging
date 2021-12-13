import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import Paging from "../Paging";

function QuestionList({ data, count }) {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    axios
      .get(
        `http://127.0.0.1:8000/questions/question_list/?big_criteria=recent&page=${pageNumber}&small_criteria=all`
      )
      .then(res => {
        setQuestions(res.data.results);
        setPage(pageNumber);
      })
  };

  useEffect(() => {
    setQuestions(data);
  }, [handlePageChange])
  
  console.log(questions);
  return (
    <div>
      <ul>
        {questions.map((list) => (
          <li key={list.id}>
            <Link href={`/questions/${list.id}`} passHref>
              {list.title}
            </Link>
          </li>
        ))}
      </ul>
      <Paging handlePageChange={handlePageChange} page={page} count={count}/>
    </div>
  );
}

export default React.memo(QuestionList);
