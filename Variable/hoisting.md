# 호이스팅

## 1. 호이스팅이란?
- ES5의 실행 콘텍스트 처리 순서
1. 함수 선언문 설정
2. 변수 이름을 바인딩
  변숫값은 `undefined`
3. 소스 코드 실행
```js
console.log("music 변수: ", music);
var music = "음악"

[실행 결과]
music 변수: undefined
```
1. `log("music 변수", music);`
  코드 아래에 `var music = "음악"` 이 있음
2. 변수가 아래 있지만
  식별자 해결을 할 수 있다
3. 이것이 `호이스팅` 이다
4. 식별자 해결을 하지 못하면 에러 발생

- `let 변수`는 호이스팅(Hoisting)되지 않음
  + 즉, `let 변수` 앞에서 변수 사용 불가
```js
try {
  console.log(sports);
} catch(e) {
  console.log("호이스팅 불가");
};
let sports = "축구";

[실행 결과]
호이스팅 불가
```
> 조금 더 깊숙히 파고 들어가보자!
- `let 변수`를 인식하는 시점
```js
"use strict"
debugger;

//변수가 모두 아래에 작성 되어있다.
console.log(globalVar);
/*
1. console에 undifined 출력

2. 오른쪽의 Global(Window)를 펼치면
- globalVar 변수값이 undifined이지만
- 변수가 표시됨

3. 반면, globalLet 이름은 표시 되지 않음
- 변수로 인식하지 않음을 뜻함
*/
debugger;

var globalVar = "var 변수";
/*
1. globalVar 변수에 "var 변수"가 할당됨
- 이때 초기값인 undifined가 변경됨
*/
debugger;

try {
  console.log(globalLet);
} catch(e) {
  console.log("globalLet 인식하지 못함");
};
  /*
  1. 아래의 globalLet을 인식하지 못해 에러가 발생함.
  */
  let globalLet;
  /*
  1. 비로소, 이때 오른쪽 Script에 globalLet이 표시됨.
  - 즉, 변수 선언을 실행해야 표시됨
  2. 값을 할당하지 않고 변수를 선언만 하면
  - 엔진이 undifined를 할당함.
  */
 debugger;

 console.log(globalLet);
 /*
 1. Let 변수는,
 - 변수 선언을 실행한 후에 변수를 인식할 수 있음
 - 즉, 식별자를 해결할 수  있음
 */
debugger;
```
- `block` 안에 `let 변수` 작성
```js
"use strict"
debugger;

// block 안에 변수 작성
{
  console.log(variable);
  /*
  1. 오른쪽 Gloval(Window)를 펼피면
  - variable의 변수값이 undifined이이지만
  - 변수 이름이 표시됨

  2. blockLet 변수도 undifined로 표시됨.
  - 하지만, 호이스팅으로 변수를 사용할 수는 없음

  3. 앞에서 글로벌 변수는 Script에
  - 변수가 표시되지 않음
  */
 var variable = "var 변수";
 let blockLet = "let 변수";
}