import { useState } from "react";
import { Question } from "./App";

interface ExerciseProps {
  questions: Question[];
}

export default function Exercise({ questions }: ExerciseProps) {
  const totalQuestions = questions.length;
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  return (
    <div className="flex flex-col p-12">
      <div>Progress bar and timer</div>
      <div>
        Question {currentQuestion + 1}/{totalQuestions}
      </div>
      <div>{questions[currentQuestion].question}</div>
      <div className="exercise-choices mt-6">
        {questions[currentQuestion].choices.map((choice) => (
          <div className="border hover:border-[#A8BBF0] rounded-2xl py-4 px-6 text-left mb-3 last:mb-0 hover:bg-[#E9EEFB] hover:text-[#1F46B1]">
            {choice}
          </div>
        ))}
      </div>
      <hr className="my-6" />
      <div className="flex justify-between">
        {currentQuestion > 0 ? (
          <button
            className=""
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
          >
            Back
          </button>
        ) : null}
        {currentQuestion === totalQuestions - 1 ? (
          <button>Submit</button>
        ) : (
          <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
