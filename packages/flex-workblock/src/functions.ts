import { BlockBundle } from './BlockBundle';
import type { Duration } from 'date-fns';
import { add, intervalToDuration, isBefore, sub } from 'date-fns';

function addDuration(durationA: Duration, durationB: Duration): Duration {
  const toDate = add(add(new Date(0), durationA), durationB);
  return intervalToDuration({ start: new Date(0), end: toDate });
}

//주의: 시간과 분 단위만 환산해줌
//년, 월, 일, 초는 무시함
export function durationToMinutes(duration: Duration): number {
  const hours = duration.hours ?? 0;
  const minutes = duration.minutes ?? 0;
  return hours * 60 + minutes;
}

export function getMissedCoreTime(bundle: BlockBundle, coretimeStartAt: Date, coretimeEndAt: Date): Duration {
  const workedTime = bundle.getBlocksBetween(coretimeStartAt, coretimeEndAt)
    .filter(block => block.type !== 'None')
    .reduce((sum, block) => addDuration(sum, block.overlappedDuration({ start: coretimeStartAt, end: coretimeEndAt })), {} as Duration);

  const requiredCoreTime = intervalToDuration({ start: coretimeStartAt, end: coretimeEndAt });
  const missedCoreTimeByDate = sub(add(new Date(0), requiredCoreTime), workedTime);

  return intervalToDuration({ start: new Date(0), end: missedCoreTimeByDate });
}

export type LateInfo = {
  isLate: boolean;
  lateTime: Duration;
};

export function getLateInfo(bundle: BlockBundle, coretimeStartAt: Date, coretimeEndAt: Date): LateInfo {
  const blockWhenCoretimeStartAnd1sec = bundle.getBlockAt(add(coretimeStartAt, { seconds: 1 }));
  const isLate = blockWhenCoretimeStartAnd1sec.type === 'None';

  const blockWhenCoretimeStart = bundle.getBlockAt(coretimeStartAt);
  const lateTime = isBefore(blockWhenCoretimeStart.endAt, coretimeEndAt) ?
    intervalToDuration({ start: coretimeStartAt, end: blockWhenCoretimeStart.endAt }) :
    intervalToDuration({ start: coretimeStartAt, end: coretimeEndAt });

  return { isLate, lateTime };
}
