import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Paging from "../components/Paging";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const QuestionRecent = async () => {
    try {
      //test url
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10"
      );
      setQuestions(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=20`
      )
      .then((res) => setQuestions(res.data));
    setPage(pageNumber);
    // console.log(pageNumber);
  };

  useEffect(() => {
    QuestionRecent();
  }, []);

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
      <Paging handlePageChange={handlePageChange} page={page} />
    </div>
  );
}

export default QuestionList;
