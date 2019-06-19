import * as yargs from 'yargs';

import { run } from './process/gatsby';

yargs
  .scriptName('create-devsisters-app')
  .command(
    '$0',
    '데브시스터즈 웹 프로젝트를 생성합니다.',
    {},
    run,
  )
  .help()
  .argv;
