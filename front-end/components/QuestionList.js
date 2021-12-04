import React from 'react';
import Link from "next/link";

function QuestionList({ questions }) {
    return (
        <div>
          <ul>
              {questions.map(list => (
                <li key={list.id}>
                  <Link href={`/questions/${list.id}`} passHref>
                    {list.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
    );
}

export default QuestionList;