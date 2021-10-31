import React, { useEffect, useState } from "react";
import axios from "axios";
import Comments from "../components/Comments";

function posts() {
  //get용
  const [CommentLists, setCommentLists] = useState([]);

  const fetchComments = async () => {
    try {
      const getResponse = await axios.get('http://127.0.0.1:8000/comments/list_create_comment/');
      console.log(getResponse.data.results);
      setCommentLists(CommentLists.concat(getResponse.data.results));
      // let newArr = [...CommentLiusts, getResponse.date.results];
      // setCommentLists(newArr)
      console.log(CommentLists);
    } catch (e) {
      console.log('comment 받아오기 실패');
    }
  };

  useEffect(() => {
    updateComment();
    fetchComments();
  }, []);

  // comments update
  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
    console.log('update comment');
  };

  return (
    <div>
      <Comments CommentLists={CommentLists} refreshFunction={updateComment} />
    </div>
  );
}

export default posts;
