import * as path from 'path';

import * as yargs from 'yargs';

export interface RunProcess {
  (args: yargs.Arguments<yargs.InferredOptionTypes<{}>>): void;
}

export const templatesPath = path.resolve(__dirname, '../templates');
