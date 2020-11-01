# Generator Object
## 1. Generator 함수
### 1.1 function*
- **Generator function**
  + `function*` 키워드를 사용한 함수
- 제너레이터 함수 형태
  + function* 선언문,  
  function* 표현식,  
  GeneratorFunction
- 작성 방법
  + function* 다음에 소괄호() 작성  
  이어서 작성해도 되고  
  하나 이상 띄워도 됨
```js
function* sports(one) {
};
const book = function*(one) {
};

const music = Object.getPrototypeOf(
        function* (){}).constructor;
const gen = new music();
```
### 1.2 function* 선언문
|구분| 데이터(값) |
|---|---|
|형태| `fucntion* name(){}` |
|파라미터|[param[, param[, paramN]]] - opt|
|반환| Generator 오브젝트 |
- function* 다음에 함수 이름 작성
- 제너레이터 함수를 호출하면  
  + 함수 블록 {}을 실행하지 않고
  + Generator 오브젝트를 생성하여 반환
- Generator 오브젝트는 iterator 오브젝트
- 함수 코드 실행
  + Generator 오브젝트의 메소드를 호출할 때
```js
function* sports(one, two) {
  yield one + two;
};
console.log(typeof sports);
const obj = sports(1, 2);
console.log(typeof obj);
console.log(obj.next());

[실행 결과]
function
object
{value: 3, done: false}
```
1. `function* sports(one, two){}`  
선언문 형태의 제너레이터 함수임
2. 제너레이터 함수의 타입은 function 임
3. `const obj = sports(1, 2);`  
sports 함수를 호출하면  
Generator 오브젝트를 생생하여 반환함
4. 이 때, 함수 코드를 실행하지 않음
5. 파라미터 값은 생성한 오브젝트에 설정
6. new 연산자를 사용할 수 없음  
단일 함수로 사용하겠다는 뉘앙스
7. `typeof obj`  
생성한 Generator 오브젝트 타입은 object
8. `obj.next()`  
Generator 오브젝트가 iterator 오브젝트이므로  
`next()` 함수를 호출할 수 있으며  
이때 함수 코드가 실행됨

### 1.3 function* 표현식
|구분| 데이터(값) |
|---|---|
|형태| `function* name(){}` |
|파라미터|[param[, param[, param]]] - opt |
|반환| Generator 오브젝트 |
- `function*` 다음에 함수 이름 작성은 선택
  + 일반적으로 함수 이름을 작성하지 않음
  + `function*` 왼쪽에 변수를 선언하며  
  변수 이름이 함수 이름이 됨
- 함수를 선언하는 형태만 다를 뿐
  + 다른 것은 `function*` 선언문과 같음
```js
const sports = function* (one){
  yield one;
};
const obj = sports(100);
console.log(obj.next());

[실행 결과]
{value: 100, done: false}
```
1. `const sports = function* (one){`  
표현식 형태의 제너레이터 함수임
2. 왼쪽의 sports가 함수 이름이 됨  
문법적으로는 * 다음에  
함수 이름을 작성할 수 있지만  
일반적으로 사용하지 않음

## 2. GeneratorFunction
|구분|데이터(값)|
|---|---|
|형태| `new GeneratorFunction()`|
|파라미터|[param[,paramN]], functionBody - opt|
|반환| Generator 오브젝트 |
- GeneratorFunction.constructor를 사용하여
  + 제너레이터 함수를 생성
  + 파라미터를 문자열로 작성
  + 마지막 파라미터가 함수 코드가 되고  
  앞은 파라미터 이름이 됨
```js
const fn = new Function("one", "return one");
console.log(fn(100));

const create = Object.getPrototypeOf(
  function*(){}).constructor;

const sports = new create("one", "yield one");
const obj = sports(100);
console.log(obj.next());

[실행 결과]
100
{value: 100, done: false}
```
- **제너레이터 함수 구조**
```js
const gen = function* (){};
```
1. gen을 펼치면 prototype이 있음
- 이것을 펼치면 constructor 가 있어야 하는데 없음  
- 또한 메소드로 없음
2. __proto__가 있으며 이것을 펼치면 constructor가 있음  
- __proto__에 다른 오브젝트의 prototype에 연결된 프로퍼티를
- 인스턴스 개념으로 생성하여 첨부한 것이 표시됨

```js
const create = Object.getPrototypeOf(
  function*(){}).constructor;
console.log(create);

const sports = new create("one",
  "yield one;"
);
console.log(typeof sports);

const obj = sports(100);
console.log(obj.next());

[실행 결과]
function GeneratorFunction() { [native code] }
function
{value: 100, done: false}
```
1. `create = (function*(){}).constructor;`
  + 제너레이터 함수를 생성하는  
  + **constructor(생성자)**를 할당함
2. constructor가 할당됨
  + **new 연산자**로  
  생성자 함수를 호출할 수 있음
3. `console.log(create);`
  + `function GeneratorFunction(){}` 출력
  + function 오브젝트 형태임
4. `sports = new create(param)`
  + GeneratorFunction을 사용하여  
  제너레이터 함수를 생성하고  
  sports 변수에 할당함
  + param에 파라미터와 함수 코드를 작성  
  `one`: 파라미터 이름  
  `yield one`: 함수 코드
5. `console.log(typeof sports)`
  + new 연산자를 사용했는데
  + sports가 object가 아니라 fucntion 임
6. function이라는 것은
  + `function* sports()`로  
  제너레이터 함수를 선언한 것을 뜻함
  + 즉, 지금까지 제너레이터 함수를 선언하는  
  처리를 한 것임
7. `const obj = sports(100);`  
  + 제너레이터 함수를 호출함
  + 제너레이터 오브젝트 생성, 반환
  + 함수 코드를 실행하지 않음
  + 100이 one에 매핑됨
8. `obj.next()`
  + 제너레이터 오브젝트는  
  이터레이터 오브젝트이며
  + obj에 이터레이터 오브젝트가  
  할당되어 있으므로
  + `next()`를 호출할 수 있음
  + `{value: 100, done: false}` 출력

## 3. yield 키워드
> Syntax: [returnValue] = yield[표현식];
  
- **yield** 키워드 사용 형태
  + `next()`로 호출할 때마다 하나씩 실행
```js
function* sports(one) {
  yield one + 10;
  yield;
  const value = yield one + 50;
};
const obj = sports(30);
console.log(obj.next());
console.log(obj.next());
console.log(obj.next());
console.log(obj.next(200));

[실행 결과]
{value: 40, done: false}
{value: undefined, done: false}
{value: 80, done: false}
{value: undefined done: true}
```
- yield 키워드는 
  + 제너레이터 함수 실행을 **멈추거나**  
  **다시 실행**할 때 사용
  + yield 오른쪽의 표현식을 평가하고 결과를 반환
  + 표현식을 작성하지 않으면 `undefined` 반환
- `[returnValue]`
  + 오른쪽의 평가 결과가 설정되지 않고
  + 다음 `next()`에서  
  파라미터로 넘겨준 값이 설정됨
- yield 표현식을 평가하면
  + 호출한 곳으로
  + `{value: 값, done: true/false}` 반환
- value 값
  + yield 표현식의 평가 결과 설정
  + yield를 실행하지 못하면 `undefined`
- done 값
  + yield를 실행하면 false
  + yield를 실행하지 못하면 true
```js
function* sports(one) {
  yield one;
  const check = 20;
};
const obj = sports(10);
console.log(obj.next());
console.log(obj.next());

[실행 결과]
{value: 10, done: false}
{value: undefined done: true}
```
1. `obj.next()` 호출  
`yield one;` 실행, `{value: 10, done: false}` 반환
2. `obj.next()` 호출  
`check = 20;`을 실행하지만, yield 처리가 아니므로  
`{value: undefined, done: true}` 반환
3. 이 상태에서 계속 호출하면  
`{value: undefined, done: false}` 반환
4. 함수를 호출할 수 있지만 함수가 실행되지 않음
  
### yield 정리
```js
function* sports(one) {
  let two = yield one;
  let param = yield one + two;
  yield param + one;
};
const obj = sports(10);
console.log(obj.next());
console.log(obj.next());
console.log(obj.next(20));
console.log(obj.next());

[실행 결과]
{value: 10, done: false}
{value: NaN, done: false}
{value: 30, done false}
{value: undefined, done: true}
```
1. `function* sports(one) {}`
  + 제너레이터 함수를 선언함
  + 3개의 yield를 작성함
2. `const obj = sports(10);`
  + 제너레이터 오브젝트를 생성함
  + 파라미터 값, 10이 one에 설정됨
3. 첫 번째의 `obj.next()`를 호출함
  + `let two = yield one`이 실행됨
  + one의 값인 10을 반환함
  + **two 변수에 10을 할당하지 않음**
4. 두 번째의 `obj.next()`를 호출함
  + `next()`에 파라미터 값을 작성하지 않았으므로  
  two 변수에 undefined가 설정됨
  + `let param = yield one + two` 를 실행
  + two 변수 값이 undefined이므로  
  NaN를 반환함
5. 세 번째의 `obj.next(20)`를 호출함
  + **파라미터 값 20이**  
  **바로 앞의 param 변수에 설정됨**
  + `yield param + one` 을 실행함
  + 20 + 10 반환함
6. 네 번째의 `obj.next()`를 호출함
  + 실행할 yield가 없으므로  
  더 이상 처리하지 않으며
  + 끝이라는 것을 나타내는  
  `done: true`를 반환함

## 4. next()
| 구분 | 데이터(값) |
| --- | --- |
| 형태 | generatorObject.next() |
| 파라미터 | 제너레이터로 넘겨 줄 파라미터 값 (opt) |
| 반환 | {value: 값, done: true/false} |
- `next()` **yield 단위**로 실행
  + yield 수만큼 next() 작성해야  
  yield 전체를 실행
- next()를 호출하면  
  + 이전 yield의 다음부터 yield까지 실행
```js
function* sports(value) {
  value += 20;
  const param = yield ++value;
  value = param + value;
  yield ++value;
};
const obj = sports(10);
console.log(obj.next());
console.log(obj.next(20));

[실행 결과]
{value: 31, done: false}
{value: 52, done: false}
```
1. 첫 번째의 obj.next()를 호출하면  
`value += 20` 을 실행하고  
`yield ++value;`를 실행함
2. `{value: 31, done: false}`를 반환함 
3. 왼쪽의 param에 값을 할당하지 않음
4. 두 번째 `obj.next(20)`을 호출하면  
첫 번째 yield의 다음부터  
다음의 yield까지 실행함
5. 여기서 yield의 다음이란 파라미터 값 20을  
param에 설정하는 것을 뜻함
6. 20 + 31은 51이 되며
7. `yield ++value;` 에서 1을 더해 52를 반환함

- yield를 작성하지 않았을 때
```js
function* sports(value) {
  ++value;
  console.log(value);
};
const obj = sports(10);
console.log(obj.next());

[실행 결과]
11
{value: undefined, done: true}
```
1. 첫 번째 `obj.next()`를 호출하면  
제너레이터 함수를 실행하여  
value 값이 증가하지만
2. yield가 없으므로 값이 반환되지 않음

- 제너레이터 함수에 return 문을 작성했을 때
```js
function* sports(value) {
  return ++value;
};
const obj = sports(10);
console.log(obj.next());
console.log(obj.next());

[실행 결과]
{value: 11, done: true}
{value: undefined, done: true}
```
1. 첫 번째 `obj.next()`를 호출하면
2. `return ++value`에서 11을 반환
3. return으로 값을 반환하지만 `{done: true}` 임
  
- 함수는 호출할 때마다 변수에 초기값을 설정
- 제너레이터 함수는
  + 제너레이터 오브젝트를 생성할 때 초기값을 설정
  + `next()`로 실행할 때마다 초기값을 설정하지 않음
  + 변수값을 그대로 유지
```js
const sports = function* (param) {
  const one = param + 10;
  yield one;
  var two = 2;
  yield one + two;
};
const obj = sports(10);
```
1. 제너레이터 함수에 2개의 yield가 있음
- 또한 const one과 var two가 있음
2. obj의 `[[Scope]]`를 펼치면 `0: Local`
- `one: undefined, param: 10, two: undefined`
3. param에 10이 있다는 것은
- sports 함수 안으로 들어간 것
- sports 함수가 호출되어
- 실행 콘텍스트의 초기화 단계에서 초기값을 설정한 것임
- 단지, 함수 안의 코드를 실행하지 않은 것임
```js
console.log(obj.next());
```
1. `obj.next()`를 호출하면  
- sports 제너레이터 함수 안으로 이동함
2. `const one = param + 10;` 에서 멈추게 하면
- `one: undefined, param: 10, two: undefined` 임
- 이 값은 제너레이터 오브젝트를 만들 떄 설정한 값
3. `const one = param + 10;`
- one 변수의 값이 20으로 변경됨
4. `yield one;`에서 `{value: 20, done: false}`를 반환함

```js
console.log(obj.next());
```
1. 제너레이터 함수에 2개의 yield가 있음
- 또한 const one 과 var two가 있음
2. obj의  `[[Scope]]`를 펼치면 `0: Local`
- `one: undefined, param: 10, two: undefined`
3. param에 10이 있다는 것은
- sports 함수 안으로 들어간 것
- sports 함수가 호출되어
- 실행 콘텍스트의 초기화 단계에서 초기값을 설정한 것
- 단지, 함수 안의 코드를 실행하지 않은 것

1. `obj.next()`를 호출하면
- sports 제너레이터 함수 안으로 이동함
2. `var two = 2;`에서 멈추게 하면
- `one: 20, two: undefined`
3. 함수를 빠져 나온 후 다시 `obj.next()`를 호출하면
- 함수 안으로 이동하게 되며
- 함수 안의 변수에 초기값을 설정하는데
- 앞의 `obj.next()`로 one 변수에 할당한 값이 그대로 남아 있음
4. 이것이 제너레이터 함수의 특징임
- 제너레이터 오브젝트를 생성할 때 **초기값을 설정**하고
- `next()`를 호출할 때마다 초기값을 설정하지 않음

## 5. yield의 반복, 다수의 yield 처리
### 5.1 yield의 반복 형태
```js
let status = true;
function* sports() {
  let count = 0;
  while (status) {
    yield ++count;
  };
};
const obj = sports();
console.log(obj.next());
console.log(obj.next());
status = false;
console.log(obj.next());

[실행 결과]
{value: 1, done: false}
{value: 2, done: false}
{value: undefined, done: true}
```
- `let status = true;`
  + while() 문을 제어하기 위한 상태 값
- 첫 번째 next() 호출
  + `let count = 0;`을 실행하여  
  `count` 변수에 0을 설정함
  + 누적 값을 구하기 위한 것
- `while (status){ yield ++count; }`
  + status가 true이므로 yield를 수행함
  + `{value: 1, done: false}` 반환
- `status = false;`
  + yield 수행을 끝내기 위한 것임
- 세 번째 `next()`를 호출함
  + status가 false이므로  
  `yield ++count;`를 수행하지 않음
  + `{value: undefined, done: true}` 반환
  + `{done: true}` 이므로  
  이터레이터를 더 이상 시용힐 수 없음
  
### 5.2 다수의 yield 처리
```js
function* sports() {
  return yield yield yield;
};
const obj = sports();
console.log(obj.next());
console.log(obj.next(10));
console.log(obj.next(20));
console.log(obj.next(30));

[실행 결과]
{value: undefined, done: false}
{value: 10, done: false}
{value: 20, done: false}
{vlaue: 30, done: true}
```
- 첫 번째 `next()` 호출
  + 첫 번째 yield를 수행함
  + yield에 반환 값이 없으므로  
  `{value: undefined, done: false}` 반환
- 두 번째 `next(10)` 호출
  + 파라미터 값: 10
  + 두 번째 yield를 수행함
  + 함수에 파라미터 값을 받을 변수가 없으면  
  파라미터로 넘겨 준 값을 반환  
  `{value: 10, done: false}` 반환
- 세 번째 `next(20)` 호출
  + 파라미터 값: 20
  + 세 번째 yield를 수행함
  + 함수에 파라미터 값을 받을 변수가 없으므로  
  파라미터로 넘겨 준 값을 반환  
  `{value: 20, done: false}` 반환
- 네 번째 `next(30)` 호출
  + 파라미터 값: 30
  + 처리할 yield가 없으므로 `done: true` 반환
  + return 문을 작성했으므로  
  파라미터로 넘겨 준 값을 반환  
  `{value: 30, done: true}` 반환
- return 문을 작성하지 않으면
  + 30이 아닌 undefined 반환
  `{value: undefined, done: true}` 반환

## 6. yield 분할 할당, for-of 반복
### 6.1 yield 분할 할당
```js
function* sports() {
  return [yield yield];
};
const obj = sports();
console.log(obj.next());
console.log(obj.next(10));
const last = obj.next(20);
console.log(last);
console.log(last.value);

[실행 결과]
{value: undefined, done: false}
{value: 10, done: false}
{value: [20], done: true}
[20]
```
- 대괄호 [] 안에 다수의 yield 작성
  + `return [yield yield];`
- `next(), next(10)` 호출
  + [실행 결과]에서 보듯이
  + yield를 연속해서 작성한 것과 같음
  + yield를 2개 모두 수행했으므로  
  더 이상 처리할 yield가 없음
- 세 번째 `next(20)` 호출
  + 파라미터 값: 20
  + `return [yield, yield]`에서
  + `{value: [20], done: true}` 형태로 반환
  + [20] 처럼 [] 안에  
  파라미터 값 20을 넣어서 반환함
- `console.log()`에  
`{value: Array(1)}` 형태로 표시되지만  
가독성을 위해 편집함

### 6.2 for-of 문으로 반복
```js
function* sports(count) {
  while(true) {
    yield ++count;
  };
};
for (let point of sports(10)) {
  console.log(point);
  if (point > 12) {
    break;
  };
}

[실행 결과]
11
12
13
```
- `for-of` 문으로 제너레이터를 반복 호출
- 처음 `for-of` 문을 시작하면
  + `sports(10)`으로  
  제너레이터 오브젝트를 생성함
  + 제너레이터 오브젝트에 10이 설정됨
  + 생성한 제너레이터 오브젝트를  
  저장할 변수가 없으며  
  엔진 내부에 저장함
  + `const engine = sports(10);` 과 같으며  
  engine이 엔진 내부의 이름으로 가정함
- 다시 `sport*()`를 호출함
  + `engine.next()`와 같지만  
  반환 값이 다름
  + `while(true) { yield ++count }`를 실행함
  + `{ value: 11, done: false }`를 반환하지 않고  
  value만 point 변수에 설정함
- `{done: true}`로 종료 처리를 할 수 없으므로
  + `break;` 를 사용하여 종료시켜야 함
- `for-of` 블록을 실행함
  + 11을 출력함
  + value 값이 11 이므로  
  다시 for-of 문을 수행하며
  + `while(true){ yield ++count }`를 수행
- 이렇게 `break;`를 만날 때까지
  + 반복하여 `yield ++count;`를 실행함

## 7. 제너레이터 오브젝트 메소드
### 7.1 return()
| 구분 | 데이터(값) |
| --- | --- |
| 형태 | `generatorObject.return()` |
| 파라미터 | 제너레이터로 넘겨 줄 값(opt) |
| 반환 | return() 의 파라미터 값 |
- 이터레이터를 종료시킴
- return()의 파라미터 값을  
  + `{value: 값, done: true}`에서
  + value 프로퍼티 값으로 설정
```js
function* sports(count) {
  while(true) {
    yield ++count;
  };
};
const obj = sports(10);
console.log(obj.next());
console.log(obj.return(70));
console.log(obj.next(50));

[실행 결과]
{value: 11, done: false}
{value: 70, done: true}
{value: undefined, done: true}
```
1. `obj.return(70)`  
이터레이터를 종료시키며 파라미터 값 70을 반환
2. `obj.next(50)`  
이터레이터가 종료되었으므로  
`{value: undefined, done: true}` 반환
3. 파라미터 값 50을 반환하지 않음

### 7.2 throw()
| 구분 | 데이터(값) |
| --- | --- |
| 형태 | `generatorObject.throw()` |
| 파라미터 | 에러 메세지, Error 오브젝트 |
| 반환 | `{value: 에러 메세지, done: true}` |
- Error를 의도적으로 발생 시킴
- 제너레이터 함수의
  + `catch()` 문에서 에러를 받음
```js
function* sports() {
  try {
    yield 10;
  } catch (message) {
    yield message;
  };
  yield 20;
};
const obj = sports();
console.log(obj.next());
console.log(obj.throw("에러 발생"));
console.log(obj.next());

[실행 결과]
{value: 10, done: false}
{value: 에러 발생, done: false}
{value: 20, done: false}
```
1. `obj.throw("에러 발생")`를 실행하면  
`sports()`의 `catch(message)`가 실행되고  
*"에러 발생"* 이 message에 설정됨
2. `catch()`의 `yield message;`를 수행하게 되며  
`{value: "에러 발생", done: false}`를 반환함  
제너레이터가 종료되지 않음
3. 다음의 `obj.next()` 호출 
`throw()` 호출로 인해 에러가 발생하지만  
`{done: false}` 이므로 `next()`를 호출할 수 있음
4. `yield 20;`을 실행하게 되며  
`{value: 20, done: false}`를 반환함
  
- 제너레이터 함수에 throw 문을 작성
```js
function* sports() {
  throw "에러 발생";
  yield 10;
};
const obj = sports();
try {
  const result = obj.next();
} catch(message) {
  console.log(message);
};
console.log(obj.next());

[실행 결과]
에러 발생
{value: undefined, done: true}
```
1. `const result = obj.next()`를 실행하면  
제너레이터 함수에서 throw로 인해 에러가 발생
2. 그래서 `next()`를 try 문에 작성했음
3. try 문의 `catch(message)` 에서 에러를 받음
4. `throw "에러 발생"`에서  
"에러 발생"이 message에 설정됨
5. 제너레이터 함수에서 에러가 발생하면  
이터레이터가 종료됨
6. 마지막 줄에서 `obj.next()`를 호출하면  
제너레이터가 실행되지 않음
7. 제너레이터 함수에 `yield 10`이 있지만  
`{value: undefined, done: true}` 반환

## 8. yield* 표현식
### 8.1 yield*
> `Syntax: yield* 표현식`  
- yield*의 표현식에 따라  
처리하는 방법이 다름
- yield* 의 표현식이 배열
  + next()로 호출할 때마다  
  배열의 엘리먼트를 하나씩 처리
```js
function* sports() {
  yield* [10, 20];
};
const obj = sports();
console.log(obj.next());
console.log(obj.next());

[실행 결과]
{value: 10, done: false}
{value: 20, done: false}
```
1. 첫 번째의 `obj.next()`를 호출하면  
`yield* [10, 20];` 에서 10을 반환함  
`{value: 10, done: false}` 반환
2. 두 번째의 obj.next()를 호출하면  
`yield* [10, 20];`에서 20을 반환함
`{value: 20, done: false}` 반환
3. yield* 의 표현식이 배열이면  
`next()`를 호출할 때마다  
배열의 엘리먼트를 순서대로 반환함

- yield*의 표현식이 제너레이터 함수
  + **함수의 yield를 먼저 처리**
```js
function* point(count) {
  yield count + 5;
  yield count + 10;
};
function* sports(value) {
  yield* point(value);
  yield value + 20;
};
const obj = sports(10);
console.log(obj.next());
console.log(obj.next());
console.log(obj.next());

[실행 결과]
{value: 15, done: false}
{value: 20, done: false}
{value: 30, done: false}
```
1. 첫 번째의 `obj.next()`를 호출하면  
  + `yield* point(value);` 를 실행함
2. **yield* 의 표현식**에 함수를 작성했으므로  
  + `point(value)`를 호출함
  + `point()`가 제너레이터 함수이므로
  + 우선, **제너레이터 오브젝트**를 생성함
3. `next()`로 호출해야 yield가 수행되지만
  + 자동으로 `point()` 첫 번째의  
  `yield count + 5;`를 수행함
  + `{value: 15, done: false}` 반환
4. 다시 `point()`를 호출한 곳에서  
반환 값을 받아 반환함
5. 두 번째의 `obj.next()`를 호출함
  + `point()`의 `yield count + 10;` 를 실행함
  + `{value: 20, done: false}` 반환
6. 세 번째의 `obj.next()`를 호출함
  + `point()`의 yield를 모두 처리했으므로
  + `sports()`의 `yield value + 20;` 을 실행함

- yield* 표현식에서 자신 호출
  + **재귀 호출**
```js
function* sports(point) {
  yield point;
  yield* sports(point + 10);
};
const obj = sports(10);
console.log(obj.next());
console.log(obj.next());
console.log(obj.next());

[실행 결과]
{value: 10, done: false}
{value: 20, done: false}
{value: 30, done: false}
```
1. 첫 번째의 `obj.next()`를 호출하면  
  + `yield point;` 를 실행함
  + `{value: 10, done: false}` 반환
2. 두 번째의 `obj.next()`를 호출함
  + `yield* sports(point + 10);`에서  
  자신을 호출함
  + 첫 번째 줄의 `yield point;`를 실행함
  + `{value: 20, done: false}` 반환
3. 세 번째의 `obj.next()`를 호출함
  + `yield* sports(point + 10);`에서  
  자신을 호출함
  + 첫 번째 줄의 `yield point;`를 실행함
  + `{value: 30, done: false}` 반환
4. **{주의} yield point; 가 없으면**
  + **무한 반복**을 하게 됨!