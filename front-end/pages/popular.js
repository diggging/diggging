import React, {useState, useEffect} from "react";
import axios from "axios";
import Main from './main';
import QuestionList from '../components/questions/QuestionList';
import Paging from "../components/Paging";

function Popular() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const QuestionRequest = async () => {
    try {
      //test url
      const res = await axios.get(
        "http://127.0.0.1:8000/questions/question_list/?big_criteria=popular&page=1&small_criteria=all"
      );
      setData(res.data.results);
      setCount(res.data.count);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    axios
      .get(
        `http://127.0.0.1:8000/questions/question_list/?big_criteria=popular&page=${pageNumber}&small_criteria=all`
      )
      .then(res => {
        setData(res.data.results);
        setPage(pageNumber);
      })
  };

  useEffect(() => {
    QuestionRequest();
  }, []);

  return (
    <Main>
        <QuestionList data={data} handlePageChange={handlePageChange} page={page} count={count}></QuestionList>
    </Main>
  );
}

export default React.memo(Popular);
