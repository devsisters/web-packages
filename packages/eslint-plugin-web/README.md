# Devsisters 웹서비스셀 ESLint 플러그인

## 요구사항

- TypeScript 3.8 이상을 사용합니다.

## 사용법

ESLint 와 플러그인을 설치합니다.

```bash
yarn add -D eslint typescript @devsisters/eslint-plugin-web
```

프로젝트 경로에 `.eslintrc.js` (또는 json, yaml) 파일을 추가합니다.

## ESLint 의존성

| ESLint | @devsisters/eslint-plugin-web |
|--------|-------------------------------|
| >= 8.x | >= 1.4.0                      |
| < 8.x  | *                             |

### 프론트엔드 설정 예시:

```js
module.exports = {
  plugins: [
    '@devsisters/web',
  ],
  extends: [
    'plugin:@devsisters/web/frontend',
  ],
  parserOptions: {
    project: [
      './tsconfig.json',
    ],
  },
};
```

프로젝트 별로 필요한 규칙들을 별도로 설정합니다.

### VSCode 설정

```json5
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
  ],
  "eslint.options": {
    "extensions": [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
    ],
  },
  // Prettier는 끄세요.
  "prettier.enable": false,
}
```
