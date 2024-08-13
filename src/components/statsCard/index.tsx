import React from 'react';
import StatsCase from './StatsCase';
import Status from './Status';
import CommandInfo from './CommandInfo';
import StatsGoals from './StatsGoals';
import DateAndTimeInfo from './DateAndTimeInfo';
import { toZonedTime } from 'date-fns-tz';
import '../../global.css';

type StatsProps = {
  dateAndTime: string;
  commandA: string;
  commandB: string;
  resultGoals: string;
  status: string;
};

export default function StatsCard({
  dateAndTime,
  commandA,
  commandB,
  resultGoals,
  status,
}: StatsProps) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zonedDate = toZonedTime(dateAndTime, userTimeZone);
  const formattedDate = zonedDate.toLocaleString('ru-Ru', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: userTimeZone,
    timeZoneName: 'short',
  });
  const [dateFromatted, timeFormatted] = formattedDate.split(',');
  return (
    <StatsCase>
      <DateAndTimeInfo date={dateFromatted} time={timeFormatted} />
      <Status status={status} />
      <CommandInfo commandA={commandA} commandB={commandB} />
      <StatsGoals result={resultGoals} />
    </StatsCase>
  );
}
