import Countdown from "react-countdown";
import { ReactComponent as AlarmIcon } from "./alarm.svg";

interface CountdownTimer {
  targetDate: number;
  onComplete: () => void;
}

export default function CountdownTimer({
  targetDate,
  onComplete,
}: CountdownTimer) {
  return (
    <span className="px-6 py-1 bg-[#E9EEFB] rounded-2xl text-[#2A59DA] text-base font-bold">
      <AlarmIcon className="inline-block mr-1" />
      Time remaining
      <Countdown
        date={targetDate}
        onComplete={onComplete}
        renderer={({ formatted }) => (
          <span className="ml-1">
            {formatted.minutes}:{formatted.seconds}
          </span>
        )}
      />
    </span>
  );
}
