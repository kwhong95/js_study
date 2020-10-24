# Object 오브젝트
## 1. is(), JS 값 비교 방법
|구분|데이터(값)|
|---|---|
|형태|`Object.is()`|
|파라미터|비교 대상 값|
|반환|타입까지 같으면 `true`, 아니면 `false`|
- 두 개의 파라미터 **값과 타입**을 비교
  + 같으면 `true`, 아니면 `false` 반환
```js
const result = Object.is(10, "10"); //type이 다름
console.log(result);

const one = {}, two = {};
console.log(Object.is(one, two)); //메모리 주소가 다름

[실행 결과]
false
false
```
- 오브젝트 비교 목적이 아님
  + []와 []의 비교, {} {} 비교는 `false`
- JS 값 비교 방법
  + **값과 타입**까지 모두 비교: `===`
  + 타입은 비교하지 않고 **값**만 비교: `==`
```js
console.log((undefined == null));
console.log((undefined === null));
console.log(Object.is(undefined, null));

[실행 결과]
true
false
false
```
1. `Object.is()`는 타입까지 비교함
2. `===`에서 `=`를 수를 세는 것보다  
`Object.is()`가 가독성이 좋을 수 있음
3. 타이핑 실수(==)를 피할 수 있지만  
`===`에 익숙한 개발자도 있음

- `Object.is()`와 `===` 비교 차이
  + NaN 비교
```js
console.log((NaN === NaN));
console.log(Object.is(NaN, NaN));
console.log((NaN === 0 / 0));
console.log(Object.is(NaN, 0 / 0));

[실행 결과]
false
true
false
true
```
  + +0 과 -0 비교
```js
console.log((0 === -0));
console.log(Object.is(0, -0));

[실행 결과]
true
false
```
- 활용한 형태
```js
function check(data) {
  if (Object.is(typeof data, "object")) {
    console.log(data);
  } else {
    console.log("object 타입이 아님");
  };
};
check({value: 10});
check(200);

[실행 결과]
{value: 10}
object 타입이 아님
```
1. `Object.is(typeof data, "object")`
2. `typeof type data` 결과로 비교함