import React, {useState, useEffect} from "react";
import axios from "axios";
import Main from './main';
import QuestionList from '../components/questions/QuestionList';
import Paging from "../components/Paging";
function Popular() {
  const [data, setData] = useState([]);

  const QuestionRequest = async () => {
    try {
      //test url
      const res = await axios.get(
        "http://127.0.0.1:8000/questions/question_list/?big_criteria=popular&page=1&small_criteria=all"
      );
      setData(res.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    QuestionRequest();
  }, []);
  console.log(data);
  return (
    <Main>
        <QuestionList data={data}></QuestionList>
    </Main>
  );
}

export default React.memo(Popular);
