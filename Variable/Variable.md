# 변수 구분

## 1. Local(지역)변수, Global(전역)변수

#### 1.1 변수를 구분하는 이유는?
- 기능과 목적이 다르기 때문

#### 1.2 글로벌 변수의 기능, 목적
 1. 다른 js 파일에서 변수값 공유
 2. 파일에서 공통 변수 개념으로 사용
 3. 의도는 좋으나 처리 속도가 떨어짐
#### 1.3 로컬 변수의 기능, 목적
 - 빠르게 식별자를 해결하기위해 
   가까운 스코프의 변수를 사용하려는 것

> var 키워드 문제 발생

## 2. 글로벌 변수 오해
#### 2.1 Global 변수는
- 글로벌 오브젝트의 로컬 변수
- var value = 100 처럼
- var 키워드 사용이 정상
#### 2.2 var 키워드를 작성하지 않으면
> 글로벌 변수로 간주하는데 이것이 문제 
```
value = 100;
function point() {
  value = 300;
  console.log("함수:", value);
};

[실행 결과] 함수 : 300

```
1. var 키워드를 사용하지 않고
   vlaue를 글로벌 변수로 선언하고 100 할당
2. point() 함수 안에서 value 변수에 300 할당
   value 변수가 로컬 변수가 아니므로
   글로벌 오브젝트의 value 변수에 300 할당
3. 함수 안에서 글로벌 변수에
   값을 설정하는 것은 좋은 모습이 아니다.
4. 로컬 변수와 글로벌 변수를
   구분한 목적을 생각하라.

## 3. use strick 사용
#### 3.1 함수 안에서
- var 키워드를 사용하지 않으면 에러 발생
```
"use strict";
function point() {
  try {
    value = 300;
  } catch(e) {
    console.log("글로벌 변수 사용 불가");
  };
};
point();

[실행 결과] 글로벌 변수 사용 불가
```
- ES5에서 도입했으나 근본적인 접근은 아님
#### 3.2 ES6+
- "use strict"가 디폴트 환경(전체는 아님)

## 4. let 변수의 개요
#### 4.1 let book = "책";
- Block Scope를 가진 변수
- 변수가 선언된 블록이 스코프
#### 4.2 스코프 적용 기준
- 블록 {}, 문, 표현식
```
let sports = "축구";

if (sports) {
  let sports = "농구";
  console.log("안: ", sports);
};
console.log("밖:", sports);

[실행 결과]
안: 농구
밖: 축구
```
> let 변수를 사용한다면!!
>> {}(Block)으로 안과 밖이 각각의 다른 스코프를 가지게 된다
#### 4.3 블록 {} 안과 밖이 스코프가 다름
- 변수 이름이 같아도 값이 대체 되지 않음

## 5. let 변수 파해치기
#### 5.1 Syntax
```
 let name1[=value1][,name2[=value2]] 
```
> 대괄호는 생략 가능
#### 5.2 name1, name2에 변수 이름 작성
- 식별자로 사용
- []는 생략 가능을 나타냄
- 값을 할당하지 않아도 됨
```
let book;
let one, two;
```
1. let book;
- 값을 할당하지 않고 변수만선언할 수 있음
- 초기 값은 undifined가 할당 (사용 불가)
2. let one, two;
- 콤파로 구분하여 다수를 선언 가능
```
1. let book = "책";
2. let one = 1, two = (10 + 20);
3. let five = 5, let six = 6;
4. let five = 5, var six = 6;
```
1. let book = "책";
  변수를 선언하고 초기값을 할당함
2. let one = 1, two = (10 + 20);
  콤마로 구분하여 다수의 변수를 선언하고
  값을 할당한 형태
3. let five = 5, let six = 6;
  SyntaxError 발생
  let을 처음에 한 번만 작성
4. let five = 5, var six = 6;
  콤마로 구분하여
  let과 var을 같이 사용할수 없음!

## 6. 블록 스코프
#### 6.1 블록 기준
- 중괄호 { code }
- function name() { code }
- if (a === 1) { code }
#### 6.2 블록 안과 밖이 스코프가 다름
> 변수 이름이 같아도 값이 대체되지 않음
#### 6.3 특징
1. if (sports) {...}
  블록 {} 안과 밖에 let sports를 작성했으며
  스코프가 다르므로
  같은 이름을 사용할 수 있다
2. 변숫값이 대체되지 않고 유지 된다
3. 블록 안에서 블록 밖의 변수는 접근할 수 있지만
4. 블록 밖에서 블록 안의 변수는 접근할 수 없음
```
let sports = "축구";
sports = "농구";
console.log(sports);
// let sports = "배구"; > 주석 풀시 1번 경우에 해당
{
  let sports = "탁구"
  console.log(sports)
};

[실행 결과]
농구
탁구
```
> 스코프에 같은 이름 사용 불가
#### 6.4 Function Block
- function name() {}도 블록 스코프
- function 안과 밖에 같은 이름의 let 변수 선언 가능
> 스코프가 다르기 때문
```
let sports = "축구";
function show() {
  let sport = "농구";
  console.log("안: ", sports);
};
show();
console.log("밖: ", sports);

[실행 결과]
안: 농구
밖: 축구
```
- function 밖의 let 변수를 function 안에서 사용 가능 : 클로저
```
let sports = "축구";
function show() {
  console.log(sports);
};
show();

[실행 결과]
축구
```
> 함수 내부의 스코프에서 변수를 찾는데 없다..
>> 밖으로 나와서 찾음(스코프 이동)

#### 6.5 try-catch
- try-catch 문도 블록 스코프
- try 블록 {} 기준으로
  > 안과 밖에 같은 이름의 let 변수 선언 가능
```
let sports = "축구";
try {
  let sports = "농구";
  console.log("안: ", sports);
} catch(e) {};
console.log("밖: ", sports);

[실행결과]
안: 농구
밖: 축구
```
1. try 블록의 안과 밖에 let sports를 선언
2. 안과 밖이 스코프가 다르므로 변숫값이 각각 설정

#### 6.6 switch-case
- switch 문도 블록 스코프
- switch 블록 기준으로
> 같은 이름의 let변수 작성 불가
```
let item = 1;
switch (item) {
  case 1:
    let sports;
    break;
  case 2:
    // let sports; >> error!
  default:
    console.log(sports);
};
```
1. switch 블록 안에서 let을 사용하여 선언한 변수가 있는데
   다시 let을 사용하여 변수를 선언하므로 error 발생!
2. 실행 에러가 아닌 컴파일 에러

## 7. let 변수 VS var 변수
> for() 문에서 반복할 때마다
- var 변수: 스코프를 갖지 않음
- let 변수: 스코프를 가짐

#### 7.1 var 변수와 스코프
```html
<ul class = sports>
  <li>축구</li>
  <li>농구</li>
  <li>야구</li>
</ul> 
```

``` js
var node = document.querySelector(".sports");
for (var k = 0; k < node.children.length; k++) {
  node.children[k].onClick = function(event) {
    event.target.style.backgroundColor = "yellow";
    console.log(k);
  };
};

[실행 결과]
3
3
3
```
1. 어떤 것을 클릭하더라도
   항상 for() 문이 끝났을 때 값인 3을 출력한다.
2. var k = 0; 에서 k 변수의 스코프는 함수이다.
> 전체가 하나의 스코프

#### 7.2 let변수와 스코프
```html
위와 동일
```
```js
...
for (let k =0; k < node.children.length; k++) {
  ...
};

[실행결과]
0
1
2
```
1. var k = 0;을 k = 0;으로 바꿈
2. 이벤트를 설정할 때의 k 값을 출력한다
> 블록 단위로 스코프를 가짐

## 8. let 변수와 this
- 글로벌 오브젝트에서
> let 변수를 this로 참조 불가
```js
var music = "음악";
let sports = "축구";
console.log(this.muic, this.sports);

[실행 결과]
음악, undefined
```
1. 현재 위치는 글로벌 오브젝트
2. `var music = "음악";` : window 오브젝트에 설정
3. `let sports = "축구";` :window 오브젝트에 설정 되지 않음
4. `this.music`에서
  `this`가 window 오브젝트를 참조하여
  music이 window 오브젝트에 설정되어 있으므로
  `음악`이 출력
5. this.sports에서
  sports가 window에 설정되지 않으므로
  `undifined`가 출력

- 글로벌 오브젝트에서
> var과 let 변수가 설정되는 위치 구조
```js
"use strict"

debugger;
// 현재 위치는 글로벌 오브젝트

var globalVar = "글로벌";
// 글로벌(window) 오브젝트에 설정

let globalLet = "블록";
/*
1. 글로벌(window) 오브젝트에 설정되지 않습니다.

2. `Let변수`를 블록 안에 작성해야 하지만
- 블록이 없으므로 엔진이 블록을 만들고 
- 이를 스코프로 사용하여 설정하는 개념

3. 오른쪽 Script는 하나의 블록 개념으로
- <Script>에 작성한 모든 파일에서 공유
*/
console.log(this.globalVar);
/*
 this가 window 오브젝트를 참조하며
 - globalVar이 window 오브젝트에 설정
 - globalVar 값인 글로벌이 출력
*/
debugger;

console.log(this.globalLet);
/*
1. globalLet은 window 오브젝트에 설정되지 않으므로
- undifined가 출력

2. 글로벌 오브젝트의 var 변수와 Let 변수의 차이 파악!
*/
debugger;
```