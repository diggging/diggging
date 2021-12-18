import React, { useState, useEffect } from "react";
import SingleComment from "../questionComment/SingleComment";

function CommentList({ id, comments, newComment, setCommentNum, commentNum }) {
  const [comment, setComment] = useState(comments);


  useEffect(() => {
    setComment([...comment, newComment]);
  }, [newComment]);

  return (
    <>
      <ul>
        {comment &&
          comment.map((item) => (
            <SingleComment
              key={item.id}
              data={item}
              comment={comment}
              setComment={setComment}
              setCommentNum={setCommentNum}
              commentNum={commentNum}
            ></SingleComment>
          ))}
      </ul>
    </>
  );
}

export default React.memo(CommentList);
