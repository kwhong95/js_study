# 다수의 js 파일 사용
- 모든 js 파일에서
> 글로벌 오브젝트에 작성한 `var 변수`와 `let 변수`를 공유
- <span style = "color:blue">블록 안에 작성하면 공유하지 않습니다</span>

`first.js`
```js
"use strict"

/*
1. 현재 위치는 글로벌 오브젝트

2. html 파일에 2개의 js 파일 작성
  <script src="./first.js" defer></script>
  <script src="./second.js" defer></script>

3. 현재 frist.js를 실행 중
*/
debugger;

var globalVar = "var 변수";
// 글로벌(window) 오브젝트에 설정

let globalLet = "let 변수";
/*
1. 글로벌(window) 오브젝트에 설정되지 않고
- 오른쪽의 Script에 설정

2. Script는 스펙에 정의된 이름
*/
{
  let globalBlock = "block의 let 변수";
  // 오른쪽의 Script에 설정되지 않고
  // 오른쪽의 Block에 설정
  debugger;
};
```
`second.js`
```js
"use strict";

debugger;
// first 파일에 이어서 실행된 것

console.log(globalVar);
/*
1. var globalVar = "var 변수";

2. 글로벌 오브젝트에서
- var 키워드를 사용해서 선언한 변수는
- window 오브젝트에 설정되며
- 모든 js 파일에서 변수를 공유함

3. console에 "var 변수"가 출력
*/
debugger;

console.log(globalLet);
/*
1. Let globalLet = "Let 변수";

2. 글로벌 오브젝트에서
- Let 키워드를 사용해서 선언한 변수는
- Script에 설정되며
- 모든 js 파일에서 변수를 공유함.

3. 따라서 console에 "Let 변수"가 출력됨.
*/
debugger;

try {
  console.log(globalBlock);
} catch(e) {
  console.log("globalBlock은 공유되지 않습니다.");
}
/*
{
  Let globalBlock = "block의 Let 변수";
}
1. 글로벌 오브젝트에 작성했으나
- 블록 안에 작성한 변수로 처리

2. 이렇게 블록 안에 작성한 변수는 공유되지 않아
- 에러가 발생..
*/

//--------------------------------------------
function showLocal() {
  // 함수가 스코프이며 var, let 변수 모두
  // Local에 표시됨
  var localVar = "var";
  let localLet = "let";
  {
    // Block에 표시됨
    let blockLet = "block";
    debugger;
  };
};
showLocal();
```
> `Scope`를 여러개 가질 수 있게됨
- `Block` : 블록을 지정한 스코프
- `Local` : 함수 형식의 스코프
- `Script` : let 변수 설정 시
- `Global` : var 변수 설정 시

## 다수의 js 파일 사용 정리
#### 글로벌 오브젝트에 작성 시
```js
var globalVar = "var 변수";
let globalLet = "let 변수";
{
  let globalBlock = "block 변수";
};
```
  + `var 변수`: `window`에 설정, 공유 
  + `let 변수`: `Script`에 설정, 공유
    + `window.sports= {}` 처럼
    의도적으로 작성하지 않아도 됨
  + `{ let 변수 }` : `Block`에 설정, 공유하지 않음
    + 글로벌 오브젝트에서만 사용하는 로컬 변수로 사용

#### 함수에 작성 시
```js
function showLocal() {
  var localVar = "var 변수";
  let localLet = "let 변수";
  {
    let blockLet = "block 변수";
  };
};
```
  + `var 변수, let 변수`: `Local`
  + `{ let 변수 }`: `Block`

> Block 안에서 밖의 변수를 사용할 수 있지만
>> 밖에서 안의 변수를 사용할 수 없다!
