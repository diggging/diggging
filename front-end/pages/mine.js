import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { check_auth_status } from "../redux/actions/auth";
import Main from "./main";
import QuestionList from "../components/questions/QuestionList";
import { setMine, setPage, setBigCriteria } from "../modules/questions";

function Mine() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const count = useSelector((state) => state.data.count);
  const page = useSelector((state) => state.data.page);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const smallCriteria = useSelector((state) => state.data.smallCriteria);
  const bigCriteria = useSelector((state) => state.data.bigCriteria);

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
    dispatch(setMine(page, "all", token));
    dispatch(setBigCriteria("mine"));
  
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
