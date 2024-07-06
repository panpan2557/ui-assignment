import { useState } from "react";
import { Question } from "./App";
import { ReactComponent as AlarmLogo } from "./alarm.svg";
import Countdown from "react-countdown";

interface ExerciseProps {
  questions: Question[];
  timeLimitSecond: number;
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

export default function Exercise({
  questions,
  timeLimitSecond,
  onClickSubmit,
}: ExerciseProps) {
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
  const [targetTime] = useState<number>(Date.now() + timeLimitSecond * 1000);

  const currentProgressPercentage: number =
    (currentQuestion / totalQuestions) * 100;

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
    <div className="flex flex-col text-left">
      {/* progress bar and timer */}
      <div className="flex flex-col">
        <div className="flex justify-between mb-3">
          <div className="font-bold text-base leading-8 h-8 text-[#2A59DA]">
            Multiple Choice
          </div>
          <span className="px-6 py-1 bg-[#E9EEFB] rounded-2xl text-[#2A59DA] text-base font-bold">
            <AlarmLogo className="inline-block mr-1" />
            Time remaining
            <Countdown
              date={targetTime}
              onComplete={() => onClickSubmit(committedAnswers)}
              renderer={({ formatted }) => (
                <span className="ml-1">
                  {formatted.minutes}:{formatted.seconds}
                </span>
              )}
            />
          </span>
        </div>
        <div className="w-full bg-[#E9EEFB] rounded-full h-1.5 mb-4">
          <div
            className="bg-[#2A59DA] h-1.5 rounded-full"
            style={{ width: `${currentProgressPercentage}%` }}
          ></div>
        </div>
      </div>
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
