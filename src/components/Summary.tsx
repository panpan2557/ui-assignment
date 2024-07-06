import { ReactComponent as SummaryVector } from "../resources/svg/Speaking-test.svg";

export default function Summary() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-semibold mb-16">Great Job!</div>
      <div className="text-2xl font-semibold mb-16">
        <div>You have completed the test.</div>
        <div>Your test result will be sent to your registered email.</div>
      </div>
      <SummaryVector />
    </div>
  );
}
