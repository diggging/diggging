import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { check_auth_status } from "../redux/actions/auth";
import Main from "./main";
import QuestionList from "../components/questions/QuestionList";
import { setMine, setPage } from "../modules/questions";

function Mine() {
  const dispatch = useDispatch();
  const {data, count, page, smallCriteria, loading, error} = useSelector((state) => state.questions);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [token, setToken] = useState("");

  const getAccessToken = async () => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(check_auth_status())
        .then((res) => res.json())
        .then((data) => {
          const accessToken = data.access;
          setToken(accessToken);
        })
        .catch((err) => console.log(err));
    }
  };

  const postPage = (page) => {
    dispatch(setPage(page));
    dispatch(setMine(page, smallCriteria, token));
  };

  useEffect(() => {
    getAccessToken();  
    dispatch(setMine(1, "all", token));  
  }, [dispatch, token]);

  return (
    <Main>
      {isAuthenticated ? (
        <>
          <QuestionList
            data={data}
            handlePageChange={postPage}
            page={page}
            count={count}
          ></QuestionList>
        </>
      ) : null}
    </Main>
  );
}

export default React.memo(Mine);
