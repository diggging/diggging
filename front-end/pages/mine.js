import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { check_auth_status } from "../redux/actions/auth";
import QuestionList from "../components/questions/QuestionList";
import { setMine, setPage, setMinePage, setQuestion} from "../modules/questions";
import Prevent from '../components/questions/PreventRerender';

function Mine() {
  const dispatch = useDispatch();
  const {data, count, page, smallCriteria, loading, error, mineToken} = useSelector((state) => state.questions);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [token, setToken] = useState(""); 

  const test = useSelector((state) => state.questions);
  
  const getAccessToken = async () => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(check_auth_status())
        .then((res) => res.json())
        .then((data) => {
          const accessToken = data.access;
          setToken(accessToken);
          return accessToken;
        })
        .catch((err) => console.log(err));
    }
  };  
  
  useEffect(() => {
    getAccessToken();  
    dispatch(setMine(1, "all", token));  
  }, [dispatch, token]);
  
  return (
    <Prevent>
      {isAuthenticated ? (
        <>
          <QuestionList
            data={data}
            page={page}
            count={count}
          ></QuestionList>
        </>
      ) : null}
    </Prevent>
  );
}

export default React.memo(Mine);
