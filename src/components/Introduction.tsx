import { Question } from "../App";
import { ReactComponent as MultipleChoiceVector } from "../resources/svg/Multiple-choice.svg";
import { formatSecondsToMinutes } from "../Utils";

interface IntroductionProps {
  questions: Question[];
  timeLimitSecond: number;
  onClickStart: () => void;
}

export default function Introduction({
  questions,
  timeLimitSecond: timeLimit,
  onClickStart,
}: IntroductionProps) {
  const cardContent: Array<{ title: string; value: string }> = [
    { title: "Total questions", value: `${questions.length} questions` },
    {
      title: "Test duration",
      value: `${formatSecondsToMinutes(timeLimit)} mins`,
    },
  ];
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-semibold mb-14">General English Test</div>
      <div className="general-info flex justify-center mb-14">
        {cardContent.map((card, i) => (
          <div
            key={"info-card-" + i}
            className="rounded-lg bg-[#E9EEFB] px-8 py-3 text-left mr-5"
          >
            <div className="text-xs font-normal">{card.title}</div>
            <div className="text-base font-bold">{card.value}</div>
          </div>
        ))}
      </div>
      <MultipleChoiceVector className="mb-14" />
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
