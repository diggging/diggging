import React from "react";
import AnswersList from "./AnswersList";

function Answers({ questionId, answers, user, token, questionUserId }) {
  return (
    <>
      {answers &&
        answers.map((answer) => (
          <AnswersList
            key={answer.id}
            questionId={questionId}
            user={user}
            token={token}
            answer={answer}
            questionUserId={questionUserId}
          />
        ))}
    </>
  );
}

export default Answers;
