import { useState } from "react";
import { Question } from "./App";
import { replaceAt } from "./Utils";
import CountdownTimer from "./CountdownTimer";

export interface CommittedAnswer {
  questionId: number;
  answerId?: number;
}

interface ExerciseProps {
  questions: Question[];
  timeLimitSecond: number;
  onClickSubmit: (committedAnswers: CommittedAnswer[]) => void;
}

const initCommittedAnswers = (questions: Question[]): CommittedAnswer[] => {
  return questions.map((q) => {
    return { questionId: q.id, answerId: undefined };
  });
};

export default function Exercise({
  questions,
  timeLimitSecond,
  onClickSubmit,
}: ExerciseProps) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<number | undefined>(
    undefined,
  );
  const [committedAnswers, setCommittedAnswers] = useState<CommittedAnswer[]>(
    initCommittedAnswers(questions),
  );
  const [countDownTime] = useState<number>(Date.now() + timeLimitSecond * 1000);

  const totalQuestions = questions.length;
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

  const renderChoices = () =>
    questions[currentQuestion].choices.map((choice) => (
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
    ));

  const renderBackButton = () => (
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
  );

  const renderSubmitButton = () => (
    <button
      className="rounded-2xl px-8 py-2 bg-[#1F46B1] text-white disabled:bg-[#C7CBD1] disabled:cursor-not-allowed"
      disabled={selectedChoiceId === undefined}
      onClick={() => {
        const nextCommittedAnswer = saveCommittedAnswer(selectedChoiceId);
        onClickSubmit(nextCommittedAnswer);
      }}
    >
      Submit
    </button>
  );

  const renderNextButton = () => (
    <button
      className="rounded-2xl px-8 py-2 bg-[#1F46B1] text-white disabled:bg-[#C7CBD1] disabled:cursor-not-allowed"
      disabled={selectedChoiceId === undefined}
      onClick={() => {
        const targetQuestion = currentQuestion + 1;
        setCurrentQuestion(targetQuestion);
        saveCommittedAnswer(selectedChoiceId);
        setSelectedChoiceId(committedAnswers[targetQuestion].answerId);
      }}
    >
      Next
    </button>
  );

  return (
    <div className="flex flex-col text-left">
      <div className="flex flex-col">
        <div className="flex justify-between mb-3">
          <div className="font-bold text-base leading-8 h-8 text-[#2A59DA]">
            Multiple Choice
          </div>
          <CountdownTimer
            targetDate={countDownTime}
            onComplete={() => onClickSubmit(committedAnswers)}
          />
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
      <div className="exercise-choices">{renderChoices()}</div>
      <hr className="my-6" />
      <div
        className={
          "flex " + (currentQuestion > 0 ? "justify-between" : "justify-end")
        }
      >
        {currentQuestion > 0 ? renderBackButton() : null}
        {currentQuestion === totalQuestions - 1
          ? renderSubmitButton()
          : renderNextButton()}
      </div>
    </div>
  );
}
