import React, { useState, useEffect } from "react";
import SingleComment from "./SingleComment";

function CommentList({ id, comments, newComment }) {
  const [comment, setComment] = useState(comments);

  useEffect(() => {
    setComment([...comment, newComment]);
  }, [newComment]);

  console.log(comment);

  return (
    <>
      <ul>
        {comment &&
          comment.map((item) => (
            <SingleComment
              key={item.id}
              data={item}
            ></SingleComment>
          ))}
      </ul>
    </>
  );
}

export default React.memo(CommentList);
