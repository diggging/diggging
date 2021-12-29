import React, { useState, useEffect } from "react";
import SingleComment from "../questionComment/SingleComment";

function CommentList({ id, comments, newComment, setUpdateCount, setUpdateComment, updateCount }) {
  const [comment, setComment] = useState([]);

  useEffect(() => {
    setComment([...comment, newComment]);
  }, [newComment]);

  useEffect(() => {
    setComment(comments);
  }, [comment])

  return (
    <>
      <ul>
        {comment &&
          comment.map((item) => (
            <SingleComment
              key={item.id}
              data={item}
              comment={comment}
              comments={comments}
              setComment={setComment}
              updateCount={updateCount}
              setUpdateCount={setUpdateCount}
              setUpdateComment={setUpdateComment}
            ></SingleComment>
          ))}
      </ul>
    </>
  );
}

export default React.memo(CommentList);
