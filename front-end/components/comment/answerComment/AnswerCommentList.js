import React, { useState, useEffect } from "react";
import AnswerSingleComment from "../answerComment/AnswerSingleComment";

function AnswerCommentList({
  id,
  comments,
  newComment,
  setCommentNum,
  commentNum,
}) {
  const [comment, setComment] = useState(comments);

  useEffect(() => {
    setComment([...comment, newComment]);
  }, [newComment]);

  return (
    <>
      <ul>
        {comment &&
          comment.map((item) => (
            <AnswerSingleComment
              key={item.id}
              data={item}
              comment={comment}
              setComment={setComment}
              setCommentNum={setCommentNum}
              commentNum={commentNum}
            ></AnswerSingleComment>
          ))}
      </ul>
    </>
  );
}

export default React.memo(AnswerCommentList);
