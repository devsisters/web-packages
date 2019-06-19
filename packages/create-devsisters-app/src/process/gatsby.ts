import * as path from 'path';

import * as inquirer from 'inquirer';
import * as mustache from 'mustache';

import {
  RunProcess,
  templatesPath,
} from '..';
import {
  readAll,
  writeAll,
  mapFiles,
} from '../fs-util';
import {
  validateKebab,
  kebab2pascal,
  kebab2camel,
} from '../name-util';

const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: '프로젝트 이름',
    default: 'web-project-name',
    validate(text: string) {
      if (!validateKebab(text)) return '프로젝트 이름은 케밥 케이스(foo-bar-baz)로 입력해주세요.';
      return true;
    },
  },
] as const;
type QuestionName<T> = T extends { name: infer U } ? U : never;
type Answers = {
  [key in { [key in keyof typeof questions]: QuestionName<(typeof questions)[key]> }[number]]: string;
};

export const run: RunProcess = async () => {
  const {
    projectName,
  }: Answers = await inquirer.prompt(questions);
  const view = {
    projectNameKebab: projectName,
    projectNamePascal: kebab2pascal(projectName),
    projectNameCamel: kebab2camel(projectName),
  };
  const templateTree = await readAll(path.resolve(templatesPath, 'gatsby'));
  const fileTree = mapFiles(templateTree, value => {
    const result = mustache.render(
      value.toString('utf-8'),
      view,
      null,
      ['<{', '}>'],
    );
    return Buffer.from(result, 'utf-8');
  });
  { // npm에 `.gitignore`파일은 올라가지 않으므로 `.gitignore.template` 파일을 만들어서 우회.
    fileTree['.gitignore'] = fileTree['.gitignore.template'];
    delete fileTree['.gitignore.template'];
  }
  await writeAll(path.resolve(projectName), fileTree);
};
