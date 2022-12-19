import { intervalToDuration, format, Duration, isBefore, isAfter } from 'date-fns';
import type { BlockSubtype, BlockType } from '../type';

export class Block {
  startAt: Date; // 00:00
  endAt: Date; // 08:00
  type: BlockType;

  constructor(startAt: Date, endAt: Date, type: BlockType) {
    this.startAt = startAt;
    this.endAt = endAt;
    this.type = type;
  }

  get duration(): Duration {
    return intervalToDuration({
      start: this.startAt,
      end: this.endAt,
    });
  }

  overlappedDuration(interval: Interval): Duration {
    const start = isAfter(this.startAt, interval.start) ? this.startAt : interval.start;
    const end = isBefore(this.endAt, interval.end) ? this.endAt : interval.end;

    return intervalToDuration({ start, end });
  }

  get subtype(): BlockSubtype | null {
    if (
      this.type === 'Rest' &&
      format(this.startAt, 'HH:mm') === '12:00' &&
      format(this.endAt, 'HH:mm') === '13:00') {
      return 'Lunch' as const;
    }
    return null;
  }
}
