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
    <div className="flex flex-col">
      <div>General English Test</div>
      <div className="general-info">
        <div className="general-info-box">
          <div>Total questions</div>
          <div>{questions.length} questions</div>
        </div>
        <div className="general-info-box">
          <div>Test duration</div>
          <div>5:00 mins</div>
        </div>
      </div>
      <div>
        <Logo />
      </div>
      <div>
        <button onClick={onClickStart}>Start the test</button>
      </div>
    </div>
  );
}
