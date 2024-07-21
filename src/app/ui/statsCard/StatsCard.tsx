"use client";
import StatsCase from "@/app/ui/statsCard/StatsCase";
import Status from "@/app/ui/statsCard/Status";
import CommandInfo from "@/app/ui/statsCard/CommandInfo";
import StatsGoals from "@/app/ui/statsCard/StatsGoals";
import DateAndTimeInfo from "@/app/ui/statsCard/DateAndTimeInfo";
import { toZonedTime } from "date-fns-tz";
import "../globals.css";

type StatsProps = {
  dateAndTime: string;
  commandA: string;
  commandB: string;
  resultStatGoals: string;
  status: string;
};

export default function StatsCard({
  dateAndTime,
  commandA,
  commandB,
  resultStatGoals,
  status,
}: StatsProps) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zonedDate = toZonedTime(dateAndTime, userTimeZone);
  const formattedDate = zonedDate.toLocaleString("ru-Ru", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: userTimeZone,
    timeZoneName: "short",
  });
  const [dateFromatted, timeFormatted] = formattedDate.split(",");
  return (
    <StatsCase>
      <DateAndTimeInfo date={dateFromatted} time={timeFormatted} />
      <Status status={status} />
      <CommandInfo commandA={commandA} commandB={commandB} />
      <StatsGoals result={resultStatGoals} />
    </StatsCase>
  );
}
