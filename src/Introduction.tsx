import { Question } from "./App";
import { ReactComponent as Logo } from "./Multiple-choice.svg";

interface IntroductionProps {
  questions: Question[];
  onClickStart: () => void;
}

export default function Introduction({
  questions,
  onClickStart,
}: IntroductionProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-semibold mb-14">General English Test</div>
      <div className="general-info flex justify-center mb-14">
        <div className="rounded-lg bg-[#E9EEFB] px-8 py-3 text-left mr-5">
          <div className="text-xs font-normal">Total questions</div>
          <div className="text-base font-bold">
            {questions.length} questions
          </div>
        </div>
        <div className="rounded-lg bg-[#E9EEFB] px-8 py-3 text-left">
          <div className="text-xs font-normal">Test duration</div>
          <div className="text-base font-bold">5:00 mins</div>
        </div>
      </div>
      <Logo className="mb-14" />
      <div>
        <button
          className="bg-[#1F46B1] text-white rounded-2xl px-8 py-2"
          onClick={onClickStart}
        >
          Start the test
        </button>
      </div>
    </div>
  );
}
