# web-packages

notion: <https://www.notion.so/devsisters/web-package-a8d3d717d43a41b0bac7dd109f6267ac>

## package 추가 방법
1. packages 경로에 만들고 싶은 패키지를 추가한다.
    - [참고](https://github.com/ryansonshine/typescript-npm-package-template)
2. 배포 준비가 되었다면 `npm login`
   - `~/.npmrc` 경로에 authToken이 발급된다
3. `npm publish`


참고) verdaccio는 더이상 이용되지 않습니다!!
관련 오류가 일어날 경우 `~/.npmrc`에서 registry값이 아래 값으로 되어 있는지 확인하세요
```shell
# /Users/devsisters/.npmrc

@devsisters:registry = "https://registry.npmjs.org/" 
registry = "https://registry.npmjs.org/" 
```

© Devsisters Corp. All Rights Reserved
