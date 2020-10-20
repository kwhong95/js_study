# 이터레이션
> 개념만 먼저 다루고 자세한 내용은 **Symbol 오브젝트**에서 다룸

## 1. 이터레이션의 개념
#### 1.1 이터레이션(Iteration)의 사전적 의미
> 반복!!!
  
  - `for()`문의 반복 개념과 *차이* 있음
  ```js
  const list = [10, 20];
  for (let value of list) {
    console.log(value);
  };
  const obj = list[Symbol.iterator]();
  console.log(obj.next());
  console.log(obj.next());
  console.log(obj.next());

  [실행 결과]
  10
  20
  {value: 10, done: false}
  {value: 20, done: false}
  {value: undefined, done: true}
  ```
  
#### 1.2 이터레이션을 위한 프로토콜(protocol) 필요
  + 예: `통신 프로토콜(규약)`
  + **데이터 송수신 프로토콜** 정의
  
#### 1.3 이터레이션은 프로토콜을 가지고 있음
  + 프로토콜에 따라 **이터레이션** 수행
  + 프로토콜이 구문과 빌트인이 아니므로  
  프로토콜에 맞으면 **이터레이션** 가능
  > 즉 수행하는 규약이 있으면 이터레이션을 사용 가능하다(확장성이 있다)!
  >> 예 : `Symbol.iterator`, `obj.next()` 등

## 2. 이터레이션 프로토콜 규약은?
#### 2.1 오브젝트가 이터레이션할 수 있는 구조여야 한다
```js
const list = [10, 20];
const obj = list[Symbol.iterator]();

console.log(obj.next());
console.log(obj.next());
console.log(obj.next());

[실행 결과]
{value: 10, done: false}
{value: 20, done: false}
{value: undefined, done: true}
```
> 예: [10, 20]는 가능, 100은 불가능
  
#### 2.2 이터레이션 함수를 갖고 있어야 한다
> 위 예시를 보면 `[Symbol.iterator]();` 함수가 존재함
  
#### 2.3 이터레이션 프로토콜 구분
- `이터러블(iterable) 프로토콜` : 이터레이터를 생성하는 프로토콜
- `이터레이터(iterator) 프로토콜` : 이터레이터를 출력하는 즉, 표출하는 수행 프로토콜
  
#### 2.4 개발자 코드로 프로토콜을 맞춘다
- 이터레이션할 수 없는 오브젝트를  
이터레이션할 수 있도록 만들 수 있다

## 3. 이터러블 오브젝트
#### 3.1 이터러블 프로토콜이란?
- 오브젝트가 **반복**할 수 있는 구조여야 함
- `Symbol.iterator`를 가지고 있어야 함
```js
const list = [10, 20];
console.log(list[Symbol.iterator]);

[실행 결과]
function value() { [native code] }
```
#### 3.2 빌트인 오브젝트
- 디폴트로 이터러블 프로토콜을 갖고 있음
- 즉, `Symbol.iterator`를 갖고 있음
- Array, Argument, String, TypedArray, Map  
  Set, DOM NodeList
  
  #### 3.3 이터러블 오브젝트
  - 이터러블 프로토콜을 갖고 있는 오브젝트
  - **반복** 구조, `Symbol.iterator()`
  ```js
  const list = [10, 20];
  console.log(list[Symbol.iterator]);

  const obj = {one: 10, two: 20};
  console.log(obj[Symbol.iterator]);
  
  [실행 결과]
  function values() { [native code] }
  undefined
  ```
  1. `[]` 리터럴로 생성한 `list`에  
  `Symbol.iterator`가 있으므로  
  `Array`는 **이터러블 오브젝트**이다
  2. `{}` 리터럴로 생성한 `obj`에  
  `Symbol.iterator`가 없으므로
  `Object`는 **이터러블 오브젝트**가 *아니다*
  3. `for 문`의 반복과 이터레이션이 `차이` 가 있듯이  
  `for-in`의 열거와 이터레이션은 `차이` 가 있다
    
  #### 3.4 이터러블 오브젝트의 구조
  ```js
  const list = ["A", "B"];
  ```
  1. `list`의 구조를 펼치면 `__proto__`가 있으며  
  `__proto__`를 펼치면  
  **Array 오브젝트**의 메소드가 표시
  2. `Symbol(Symbol.iterator)` 가 존재  
  따라서 **Array 오브젝트**는 **이터러블 오브젝트**이다
  3. 또한 `Symbol(Symbol.iterator)`를 펼치면  
  `__proto__`에 **Function 오브젝트 메소드**가  
  연결되어 있음  
  즉, `Symbol.iterator`는 **함수**이다
  4. `Symbol.iterator`가 함수이므로 호출이 가능하다
  
  #### 3.5 자체 오브젝트는 없으나!
  - **이터러블 오브젝트**를 상속 받아도 됨
  - 즉, `prototype chain(__proto__)`에 있으면 가능
  - 예를 들어, **Array 오브젝트**를 상속 받으면  
  **이터러블 오브젝트**가 된다
  > 개념을 잘 숙지해야 논리적으로 접근해  
  좋은 이터러블 객체를 만들 수 있다

  ## 4. 이터레이터 오브젝트
  #### 4.1 이터레이터 프로토콜
  - **이터레이터(iterator) 프로토콜**
    + 값을 순서대로 생성하는 방법(규약)
  - **이터레이터 오브젝트**
    + `Symbol.iterator()`를 호출
    + 이터레이터 오브젝트를 **생성**하고 **반환**
    + 이터레이터 오브젝트에 `next()` 가 있음
    + 생성한 오브젝트를 **이터레이터**라고도 부름
  ```js
  const list = [10, 20];
  const obj = list[Symbol.iterator]();
  console.log(obj.next());
  console.log(obj.next());
  console.log(obj.next());

  [실행 결과]
  {value: 10, done: false}
  {value: 20, done: false}
  {value: undefined, done: true}
  ```
  1. **이터레이터 오브젝트**의 `next()`를 호출하면  
  **이터레이터를 호출**한다고도 한다
  2. `{value: 10, done: false}`를 반환함  
  `value`는 *[10, 20]*에서 첫 번째 **값**이고  
  `done: false`는 **이터레이터 상태**이다
  3. 두 번째 `next()` 호출
  4. `{value: 20, done: false}`를 반환  
  `value`는  *[10, 20]* 에서 두 번째 **값**이고  
  `done: false`는 **이터레이터 상태**이다
  5. 세 번째 `next()` 호출
  6. `{value: undefined, done: true}` 반환  
  `undefined`는 처리할 *값이 없다*는 의미  
  `done: true`는 **이터레이터의 종료**를 의미
  
  - **이터레이터 오브젝트 구조**
  ```js
  const list = [1, 2];
  ```
  1. `list.__proto__`를 펼치면  
  - `Symbol(Symbol.iterator)`가 있으므로  
  - **이터레이터 오브젝트**를 만들 수 있음

  ```js
  const obj = list[Symbol.iterator]();
  ```
  1. 위 형태로 호출하면  
  - **이터레이터 오브젝트**를 생성하여 반환함
  2. `obj.__proto__`를 펼치면 `next()`가 있음
  - `next()`가 있으므로 **obj**는 **이터레이터 오브젝트**이다
  ```js
  console.log(obj.next());
  console.log(obj.next());
  console.log(obj.next());
  [실행 결과]
  {value: 1, done: false}
  {value: 2, done: false}
  {value: undefined, done: true}
  ```
