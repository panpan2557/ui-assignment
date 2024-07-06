import { useState } from "react";
import { Question } from "./App";

interface ExerciseProps {
  questions: Question[];
  onClickSubmit: () => void;
}

// function Choice() => {
// 	return (
// 		<div className="border hover:border-[#A8BBF0] rounded-2xl py-4 px-6 text-left mb-3 last:mb-0 hover:bg-[#E9EEFB] hover:text-[#1F46B1]">
//             {choice}
//           </div>;
// 	)
// }

export default function Exercise({ questions, onClickSubmit }: ExerciseProps) {
  const totalQuestions = questions.length;
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  return (
    <div className="flex flex-col p-12 text-left">
      <div className="mb-6">[ Progress bar and timer ]</div>
      <div className="font-semibold text-xl mb-4">
        Question {currentQuestion + 1}/{totalQuestions}
      </div>
      <div className="font-normal mb-6">{questions[currentQuestion].text}</div>
      <div className="exercise-choices">
        {questions[currentQuestion].choices.map((choice) => (
          <div className="border hover:border-[#A8BBF0] rounded-2xl py-4 px-6 text-left mb-3 last:mb-0 hover:bg-[#E9EEFB] hover:text-[#1F46B1]">
            {choice.text}
          </div>
        ))}
      </div>
      <hr className="my-6" />
      <div
        className={
          "flex " + (currentQuestion > 0 ? "justify-between" : "justify-end")
        }
      >
        {currentQuestion > 0 ? (
          <button
            className="rounded-2xl px-8 py-2 border border-[#C7CBD1] text-[#5B6471] "
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
          >
            Back
          </button>
        ) : null}
        {currentQuestion === totalQuestions - 1 ? (
          <button
            className="rounded-2xl px-8 py-2 bg-[#1F46B1] text-white"
            onClick={onClickSubmit}
          >
            Submit
          </button>
        ) : (
          <button
            className="rounded-2xl px-8 py-2 bg-[#1F46B1] text-white"
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
