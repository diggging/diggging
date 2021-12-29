import React, { useState, useEffect } from "react";
import AnswerSingleComment from "../answerComment/AnswerSingleComment";

function AnswerCommentList({
  id, comments, newComment, setUpdateCount, setUpdateComment, updateCount
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
              comments={comments}
              setComment={setComment}
              updateCount={updateCount}
              setUpdateCount={setUpdateCount}
              setUpdateComment={setUpdateComment}
            ></AnswerSingleComment>
          ))}
      </ul>
    </>
  );
}

export default React.memo(AnswerCommentList);
