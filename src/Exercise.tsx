import { useState } from "react";
import { Question } from "./App";

interface ExerciseProps {
  questions: Question[];
  onClickSubmit: (committedAnswers: CommittedAnswer[]) => void;
}

export interface CommittedAnswer {
  questionId: number;
  answerId?: number;
}

function replaceAt<T>(array: Array<T>, index: number, value: T) {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
}

export default function Exercise({ questions, onClickSubmit }: ExerciseProps) {
  const initCommittedAnswers = (questions: Question[]): CommittedAnswer[] => {
    return questions.map((q) => {
      return { questionId: q.id, answerId: undefined };
    });
  };

  const totalQuestions = questions.length;
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<number | undefined>(
    undefined,
  );
  const [committedAnswers, setCommittedAnswers] = useState<CommittedAnswer[]>(
    initCommittedAnswers(questions),
  );
  const saveCommittedAnswer = (
    choiceId: number | undefined,
  ): CommittedAnswer[] => {
    const nextCommittedAnswer = replaceAt(committedAnswers, currentQuestion, {
      ...committedAnswers[currentQuestion],
      answerId: choiceId,
    });
    setCommittedAnswers(
      replaceAt(committedAnswers, currentQuestion, {
        ...committedAnswers[currentQuestion],
        answerId: choiceId,
      }),
    );
    return nextCommittedAnswer;
  };

  return (
    <div className="flex flex-col p-12 text-left">
      <div className="mb-6">[ Progress bar and timer ]</div>
      <div className="font-semibold text-xl mb-4">
        Question {currentQuestion + 1}/{totalQuestions}
      </div>
      <div className="font-normal mb-6">{questions[currentQuestion].text}</div>
      <div className="exercise-choices">
        {questions[currentQuestion].choices.map((choice) => (
          <div
            key={`${questions[currentQuestion].id}-${choice.id}`}
            className={
              "rounded-2xl py-4 px-6 text-left mb-3 last:mb-0 " +
              (choice.id === selectedChoiceId
                ? "border-2 border-[#A8BBF0] bg-[#E9EEFB] text-[#1F46B1] font-bold"
                : "border hover:border-[#A8BBF0] hover:bg-[#E9EEFB] hover:text-[#1F46B1]")
            }
            onClick={() => {
              setSelectedChoiceId(choice.id);
            }}
          >
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
            onClick={() => {
              const targetQuestion = currentQuestion - 1;
              setCurrentQuestion(targetQuestion);
              setSelectedChoiceId(committedAnswers[targetQuestion].answerId);
            }}
          >
            Back
          </button>
        ) : null}
        {currentQuestion === totalQuestions - 1 ? (
          <button
            className="rounded-2xl px-8 py-2 bg-[#1F46B1] text-white"
            onClick={() => {
              const nextCommittedAnswer = saveCommittedAnswer(selectedChoiceId);
              onClickSubmit(nextCommittedAnswer);
            }}
          >
            Submit
          </button>
        ) : (
          <button
            className="rounded-2xl px-8 py-2 bg-[#1F46B1] text-white"
            onClick={() => {
              const targetQuestion = currentQuestion + 1;
              setCurrentQuestion(targetQuestion);
              saveCommittedAnswer(selectedChoiceId);
              setSelectedChoiceId(committedAnswers[targetQuestion].answerId);
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
