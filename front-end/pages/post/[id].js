import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Comments from "../components/Comments";

function posts({ post }) {
  const router = useRouter();
  const { id } = router.query;
  //get용
  const [CommentLists, setCommentLists] = useState([]);

  const fetchComments = useCallback(async () => {
    try {
      const getResponse = await axios.get(`http://127.0.0.1:8000/comments/list_create_comment/${id}`);
      console.log(getResponse.data.results);
      setCommentLists(CommentLists.concat(getResponse.data.results));
    } catch (e) {
      console.log('comment 받아오기 실패');
    }
  }, [CommentLists]);

  useEffect(() => {
    if(id && id > 0) {
      fetchComments();
    }
  }, [id]);


  console.log(CommentLists);

  return (
    <div>
      {/* refreshFunction={updateComment} */}
      <Comments CommentLists={CommentLists} />
      <div>
        {post}
      </div>
    </div>
  );
}

export default posts;
