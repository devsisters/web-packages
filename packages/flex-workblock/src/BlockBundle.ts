import { isAfter, isBefore } from 'date-fns';
import { Block } from './Block';

export class BlockBundle {
  startAt: Date;
  endAt: Date;
  blocks: Block[];

  constructor(startAt: Date, endAt: Date) {
    // endAt < startAt
    if (isBefore(endAt, startAt)) throw new RangeError('endAt은 startAt보다 커야합니다');
    this.startAt = startAt;
    this.endAt = endAt;
    this.blocks = [
      new Block(startAt, endAt, 'None'),
    ];
  }

  addBlock(block: Block): void {
    const blocksBetween = this.getBlocksBetween(block.startAt, block.endAt);
    if (blocksBetween.length === 1) {
      //블럭을 꺼낸다.
      const blockOriginal = blocksBetween[0];
      const indexOf = this.blocks.indexOf(blockOriginal);
      this.removeBlock(indexOf);
      //블럭을 두개로 쪼갠다.
      const blockOriginalHead = new Block(blockOriginal.startAt, block.startAt, blockOriginal.type);
      const blockOriginalTail = new Block(block.endAt, blockOriginal.endAt, blockOriginal.type);
      //두개로 쪼개진 블럭과 새로 추가된 블럭 하나를 넣는다.
      this.blocks.splice(indexOf, 0, ...[blockOriginalHead, block, blockOriginalTail]);
    } else {
      if (blocksBetween.length === 0) {
        throw new RangeError('block은 blockBundle의 startAt~endAt 구간 사이에 포함되어야 합니다.');
      }
      const firstBlockOriginal = blocksBetween[0];
      const indexOf = this.blocks.indexOf(firstBlockOriginal);
      this.removeBlocks(indexOf, blocksBetween.length);
      //일단 다 꺼냈음

      const firstBlockOriginalHead = new Block(firstBlockOriginal.startAt, block.startAt, firstBlockOriginal.type);
      //첫번째 블럭을 쪼갠다

      const lastBlockOriginal = blocksBetween[blocksBetween.length - 1];
      const lastBlockOriginalTail = new Block(block.endAt, lastBlockOriginal.endAt, lastBlockOriginal.type);
      //마지막 블럭을 쪼갠다

      const newBlocks = [
        { start: block.startAt, end: firstBlockOriginal.endAt },
        ...blocksBetween.slice(1, blocksBetween.length - 1).map(block => ({ start: block.startAt, end: block.endAt })),
        { start: lastBlockOriginal.startAt, end: block.endAt },
      ].map(interval => new Block(interval.start, interval.end, block.type));
      //그 사이의 블럭들은 type을 엎는다

      this.blocks.splice(indexOf, 0, ...[firstBlockOriginalHead, ...newBlocks, lastBlockOriginalTail]);
    }
  }

  addBlocks(blocks: Block[]): void {
    for (const block of blocks) {
      this.addBlock(block);
    }
  }

  removeBlock(indexOf: number): void {
    this.blocks = this.blocks.filter((_, index) => index !== indexOf);
    // this.blocks = this.blocks.splice(indexOf, 1);
  }

  removeBlocks(indexFrom: number, count: number): void {
    this.blocks = this.blocks.filter((_, index) => !(indexFrom <= index && index < indexFrom + count));
    // this.blocks = this.blocks.splice(indexFrom, count);
  }

  //들어온 시간에 해당하는 블럭
  getBlockAt(date: Date): Block {
    for (const block of this.blocks) {
      // block.startAt <= date && date <= block.endAt
      const isDateWithinBlock = !isBefore(date, block.startAt) && !isAfter(date, block.endAt);
      if (isDateWithinBlock) return block;
    }
    throw new RangeError('해당 date에 해당하는 블럭이 없습니다');
  }

  getBlocksBetween(from: Date, to: Date): Block[] {
    let indexOfStartBlock;
    let indexOfEndBlock;

    // from <= this.startAt
    if (!isBefore(this.startAt, from)) {
      indexOfStartBlock = 0;
    } else {
      const startBlock = this.getBlockAt(from);
      indexOfStartBlock = this.blocks.indexOf(startBlock);
    }

    // this.endAt <= to
    if (!isAfter(this.endAt, to)) {
      indexOfEndBlock = this.blocks.length - 1;
    } else {
      const endBlock = this.getBlockAt(to);
      indexOfEndBlock = this.blocks.indexOf(endBlock);
    }

    return this.blocks.slice(indexOfStartBlock, indexOfEndBlock + 1);
  }

  get didWork(): boolean {
    return this.blocks.length > 1;
  }
}
