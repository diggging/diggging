import React, {useState, useEffect} from "react";
import axios from "axios";
import Main from './main';
import QuestionList from '../components/questions/QuestionList';

function Recent() {
  const [data, setData] = useState([]);
  const urlB = "b";

  const QuestionRequest = async () => {
    try {
      //test url
      const res = await axios.get(
        "http://127.0.0.1:8000/questions/question_list/?big_criteria=recent&page=1&small_criteria=all"
      );
      setData(res.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    QuestionRequest();
  }, []);

  return (
    <Main>
        <QuestionList data={data} url={urlB}></QuestionList>
    </Main>
  );
}

export default React.memo(Recent);
