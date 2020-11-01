# Array 오브젝트
## 1. from(), of()
#### 1.1 from()
|구분| 데이터(값) |
|---|---|
|형태|`Array.from()`|
|파라미터|변환 대상, 이터러블 오브젝트
|파라미터2|호출된 함수에서 this로 참조할 오브젝트(opt)|
|반환| **Array 오브젝트**|
- 첫 번째 파라미터의 오브젝트를  
Array 오브젝트로 변환
```js
const like = {0: "zero", 1: "one", length:2};
const list = Array.from(like);
console.log(list);

console.log(Array.from("ABC"));

[실행 결과]
[zero, one]
[A, B, C]
```
1. **Array-like 오브젝트**를  
Array 오브젝트로 변환하여 반환함
2. `"ABC"`를 문자 단위로 **분리**하여 **배열**로 반환
```js
function args() {
  return Array.from(arguments);
};
console.log(args(1, 2, 3));

[실행 결과]
[1, 2, 3]
```
1. **Argument 오브젝트**는 **Array-like** 임

```js 
// <li class=sports>축구</li>
// <li class=sports>농구</li>
const nodes =
      document.querySelectorAll(".sports");
const show = (node) => console.log(node.textContnent);
Array.from(nodes).forEach(show);

[실행 결과]
축구
농구
```
1. **NodeList**가 **이터러블 오브젝트**이므로  
`Array.from()`으로 읽을 수 있음

- 두 번째 파라미터에 함수 작성(opt)
  + 이터러블 오브젝트를 전개할 때마다 호출
```js
const like = {0: "zero",1: "one", length: 2};
console.log(Array.from(like, value => {
  return value + "변경";
});

[실행 결과]
[zero변경, one변경]
```
1. **이터러블 오브젝트**를 하나씩 읽음
2. 읽은 값을 넘겨주면서 콜백 함수를 호출함
3. 콜백 함수에서 반환된 값을  
배열에 첨부하여 반환함

- 세 번째 파라미터에 오브젝트 작성(opt)
  + 호출된 함수에서 this로 참조
```js
const like = {0: 10, 1: 20, length:2};
console.log(Array.from(like, function(value) {
  return value + this.plues;
}, {plus: 70}));

[실행 결과]
[80, 90]
```
1. 콜백 함수에서 `this`로  
**3번째 파라미터의 오브젝트를 참조**함
2. 화살표 함수를 사용하면 콜백 함수에서  
3번째 파라미터의 오브젝트를 참조 하지 않음

#### 1.2 of()
|구분|데이터(값)|
|---|---|
|형태| `Array.of()`|
|파라미터| 변환 대상 값, 다수 작성 가능|
|반환| Array 오브젝트 |
- 파라미터 값을 **Array**로 변환, 반환
- 파라미터에 변환 대상 값을 작성
  + 콤마로 구분하여 다수 작성 가능
```js
const result = Array.of(1, 2, 3);
console.log(result);
console.log(Array.of());

[실행 결과]
[1, 2, 3]
[]
```
1. Array 오브젝트를 생성하고
2. 파라미터 값 1, 2, 3을  
Array 오브젝트에 첨부하여 반환함
3. 파라미터를 작성하지 않으면  
빈 Array 오브젝트를 반환함

## 2. 배열 엘리먼트 복사
#### 2.1 copyWithin()
|구분|데이터(값)|
|---|---|
|형태| `Array.prototype.copyWithin()`|
|파라미터1| 복사한 값을 설정할 시작 인덱스|
|파라미터2| 복사 시작 인덱스(opt)
|파라미터3| 복사 끝 인덱스(opt)|
|반환| 변경된 Array 오브젝트|
- 범위 값을 복사하여 같은 오브젝트에 설정
- 두 번째 파라미터의 인덱스부터 복사하여
  + 첫 번째 파라미터 인덱스부터  
  순서대로 설정(대체)
```js
const list = ["A", "B", "C", "D", "E"];
const copy = list.copyWithin(1, 3);
console.log(list);
console.log(copy);

[실행 결과]
[A, D, E, D, E]
[A, D, E, D, E]
```
1. list 배열이 대상임
2. 두 번째 파라미터의 3번 인덱스부터  
배열의 끝까지 복사하여
3. 첫 번째 파라미터의 1번 인덱스부터 차례로 설정
4. D와 E를 복사하므로 엘리먼트가 2개이며
5. 1번 인덱스로부터 2개를 대체하므로  
B가 D로, C가 E로 대체됨
6. 복사 대상에 대체하므로  
반환된 Array 오브젝트와 복사 대상이 같음
- 세 번째 파라미터의 인덱스 직전까지 복사
```js
const list = ["A", "B", "C", "D", "E"];
list.copyWithin(0, 2, 4)
console.log(list);

[실행 결과]
[C, D, C, D, E]
```
1. 두 번째 파라미터의 2번 인덱스 부터
2. 세 번째 파라미터의 4번 인덱스 직전까지  
복사하여 list 배열의 0번 인덱스부터 설정
3. 2번 인덱스, 3번 인덱스를 복사하므로  
C와 D를 복사하게 됨
4. A가 C로, B가 D로 대체됨

- 복사 시작 인덱스와 끝 인덱스를  
작성하지 않으면 배열 전체를 복사
```js
const list = ["A", "B", "C", "D", "E"];
list.copyWithin(3);
console.log(list);

[실행 결과]
[A, B, C, A, B]
```
1. list 배열 전체가 복사 대상
2. 3번 인덱스부터 대체함
3. 복사할 엘리먼트 수가  
대체할 엘리먼트 수보다 많으면
4. 매치되는 인덱스만 값을 대체하고  
남는 것은 대체하지 않음
5. D가 A로, E가 A로 대체됨

- `copyWithin()` 함수의 특징
  + **shallow copy(앝은 복사**)
  + 같은 배열 안에서 이동하는 개념
  + 배열의 엘리먼트 수가 변동하지 않음
```js
const lis = ["A", {B: "가"}, "C"];
console.log(list.copyWithin(0, 1));

[실행 결과]
[{B: 가}, C, C]
```
1. `{B: "가"}`를 복사할 때  
새로운 `{B: "가"}`를 만들지 않고  
현재의 메모리 주소를 복사함
2. **shallow copy(앝은 복사)**라고 함
3. shallow copy는 값이 연동됨
4. 연동되지 않도록 하려면  
Deep Copy를 해야 함

#### 2.2 generic
- copyWithin function is intentionally generic
- generic 사용 형태
```js 
const like = {0: 10, 1: 20,2: 30, length: 3};
console.log(Array.prototype.copyWithin.call(like, 1, 0));

[실행 결과]
{0: 10, 1: 20, 2: 20, length: 3}
```
1. `call()`의 첫 번째 파라미터에  
**Array-like**를 작성했으며  
**Array-like** 타입은 **Object**임
2. `copyWith()`이 **Array 메소드** 이므로  
Array를 넘겨주어야 하는데  
**Array-like**를 넘겨주어도 처리가 됨
3. 이것이 **Generic** 임
`copyWithin()`은 **Generic 함수**임
4. 배열로 반환하지 않고  
대상 오브젝트 형태로 반환함
- generic이 뜻하는 것은?
  + copyWithin()이 Array 메소드이므로  
  Array 오브젝트가 처리 대상이지만
  + generic은 Array 오브젝트가 아닌  
  Array-like, 이터러블 오브젝트를  
  처리할 수 있다는 것을 뜻함

## 3. 값은 값, 인덱스 검색
#### 3.1 find()
|구분|데이터(값)|
|---|---|
|형태|`Array.prototype.find()`|
|파라미터1|콜백 함수|
|파라미터2|콜백 함수에서 this로 참조할 오브젝트(opt)|
|반환| **배열 엘리먼트** 또는 `undefined`|
-  배열의 엘리먼트를  
하나씩 읽어가면서 콜백 함수 호출
  + 콜백 함수에서 `true`를 반환하면  
  `find()`를 종료하면서
  + 현재 처리중인 **엘리먼트 값을 반환**
```js
const list = ["A", "B", "C"];
const cb = (value, index, all) => value === "B";
const result = list.find(cb);
console.log(result);

[실행 결과]
B
```
1. `["A", "B", "C"]`를 반복하면서 **콜백 함수 호출**
2. 콜백 함수에서 엘리먼트 값이 B이면  
`true`를 반환함
3. 콜백 함수에서 true를 반환하면  
현재 처리중인 엘리먼트 값인 B를 반환하고  
`find()` 실행을 종료함
4. 조건에 맞으면 `find()` 실행을 종료하므로  
배열 앞에서 true가 되면 효율이 높음

- 파라미터: 엘리먼트, 인덱스, 배열 전체

```js 
const list = ["A", "B", "C"];
const cb = (value, index, all) => value === 77;
const result = list.find(cb);
console.log(result);

[실행 결과]
undefined
```
1. 콜백 함수에서 조건이 맞는 값이 없으면  
`undefined`를 반환함

```js 
const list = ["A", "B", "C"];
function cb(value, index, all) {
  return value === "A" && value === this.check;
};
const result = list.find(cb, {check: "A"});
console.log(result);

[실행 결과]
A
```
1. 두 번째 파라미터에 콜백 함수에서  
`this`로 참조할 오브젝트를 작성한 형태
2. 콜백 함수를 화살표 함수(=>)로 작성하면  
콜백 함수에서 *this가 window를 참조하므로*  
두 번째 파라미터의 오브젝트를 참조하지 못함
3. **일반 함수를 작성해야 함**

#### 3.2 findIndex()
|구분|데이터(값)|
|---|---|
|형태|`Array.prototype.findIndex()`|
|파라미터1|콜백 함수|
|파라미터2|콜백 함수에서 this로 참조할 오브젝트(opt)|
|반환|배열 인덱스 또는 -1|
- 배열의 엘리먼트를  
하나씩 읽어가면서 콜백 함수 호출
  + 콜백 함수에서 true 반환하면  
  findIndex() 종료하면서
  + 현재 처리중인 엘리먼트의 인덱스를 반환
```js
const list = ["A", "B", "C"];
const cb = (value, index, all) => value === "B";
console.log(list.findIndex(cb));

[실행 결과]
```
1. `["A", "B", "C"]`를 반복하면서 **콜백 함수 호출**
2. 콜백 함수에서 엘리먼트 값이 B이면  
`true`를 반환함
3. 콜백 함수에서 `true`를 반환하면  
현재 처리중인 엘리먼트의 인덱스를 반환하고  
`findIndex()`를 종료함
```js
const list = ["A", "B", "C"];
const cb = (value, index, all) => value === 77;
const result = list.findIndex(cb);
console.log(result);

[실행 결과]
-1
```
1. 콜백 함수에서 조건에 맞는 값이 없으면  
-1 을 반환함
2. `indexOf(searchValue, fromIndex)`는  
값을 직접 지정할 수 있으며  
검색을 시작할 인덱스를 지정할 수 있음
3. 콜백 함수가 없으므로 다양한 조건으로 체크 불가
4. 단, 값만으로 인덱스를 찾을 때는 `indexOf()`가 효율적
5. `includes(searchValue, fromIndex)`는  
`true/false`를 반환함

## 4. 대체, 포함 여부
#### 4.1 fill()
|구분|데이터(값)|
|---|---|
|형태|`Array.prototype.fill()`|
|파라미터1| 설정할 값 |
|파라미터2| 시작 인덱스(opt)|
|파라미터3| 끝 인덱스(opt)|
|반환| 변경된 Array 오브젝트 |
- 범위 값을 지정한 값으로 설정, 반환
- **설정 방법**
  + 시작 인덱스부터 끝 인덱스 직전까지
  + 첫 번째 파라미터 값으로 설정(**대체**)
```js
const list = ["A", "B", "C"];
list.fill("책", 1);
console.log(list);

[실행 결과]
[A, 책, 책]
```
1. 시작 인덱스를 작성하고  
끝 인덱스를 작성하지 않으면
2. 시작 인덱스부터 끝까지가 대체 대상
3. 첫 번째 파라미터 값인 "책"으로 대체함

```js
const list = ["A", "B", "C", "D"];
list.fill("책", 1, 3);
console.log(list);

[실행 결과]
[A, 책, 책, D]
```
1. 끝 인덱스를 작성하면
2. 시작 인덱스부터  
끝(인덱스 -1)까지가 대체 대상

```js
const list = ["A", "B", "C"];
list.fill("책");
console.log(list);

[실행 결과]
[책, 책, 책]
```
1. 시작 인덱스와 끝 인덱스를 작성하지 않으면  
전체가 대체 대상

- Generic 함수
```js
const like = {0: "A", 1: "B", 2: "C", length: 3};
console.log(Array.prototype.fill.call(like, "책", 1));

[실행 결과]
{0: A, 1: 책, 2: 책, length: 3}
```
1. Array-like를 사용하여 대체 처리

#### 4.2 includes()
|구분| 데이터(값) |
|---|---|
|형태| `Array.prototype.includes()` |
|파라미터1| 비교하려는 값 |
|파라미터2| 비교 시작 인덱스(opt), Default: 0 |
|반환| true: 있음, false: 없음 |
- 대상 배열에
  + 첫 번째 파라미터 값이 있으면 true,  
  없으면 false를 반환
  + 두 번째 파라미터는 선택이며  
  비교 시작 인덱스 작성
```js
const list = [10, 20, 30];
console.log(list.includes(10));
console.log(list.includes(50));

console.log(list.includes(10, 1));

[실행 결과]
true
false
false
```
1. 10이 있지만  
1번 인덱스부터 비교하므로 false를 반환
2. 두 번째 파라미터에 음수를 작성하는 등의  
값을 작성할 때의 처리는 MDN 참조

- 제너릭 함수
```js 
const like = {0: 10, 1: 20, 2: 30, length: 3};
console.log(Array.prototype.includes.call(like, 20));

[실행 결과]
true
```

## 5. 배열 차원 변환(ES2019)
#### 5.1 flat()
|구분| 데이터(값) |
|---| ---|
|형태|`Array.prototype.flat()`, ES2019|
|파리미터| 대상 **깊이**(opt), Default: 1|
|반환| 새로운 배열 |
- 배열 차원을 **변환**하고  
새로운 배열로 설정하여 반환
```js
const list = [1, 2, [3, 4]];
const result = list.flat();
console.log(result);
console.log(list);

[실행 결과]
[1, 2, 3, 4]
[1, 2, [3, 4]]
```
1. `flat()` 파라미터에 값을 작성하지 않았으며  
디폴트 값은 1임
2. 파라미터에 1을 더하면 2차원이 되며  
2차원까지를 엘리먼트로 변환함
3. [1, 2]는 1, 2가 되며  
[[3, 4]]도 3, 4가 됨
4. **변환한 엘리먼트**를  
새로운 배열에 설정하여 **반환**함  
따라서 1차원 배열의 엘리먼트로 설정됨
5. `flat()` 대상인 *list 배열은 바뀌지 않음*

- **파라미터에 0을 작성한 경우**
```js
const list = [1, 2, [3, 4]];
console.log(list.flat(0));

[실행 결과]
[1, 2, [3, 4]]
```
1. 파라미터 값 0에 1을 더하면 1
2. [1, 2]는 1, 2가 되며  
배열에 설정하여 반환하므로 [1, 2]가 됨
3. [[3, 4]]는 [3, 4]가 되며  
배열에 설정하여 반환하므로 [[3, 4]]가 됨

- **파라미터에 1보다 큰 값을 작성**
```js
const list = [1, 2, [3, 4, [5, [6]]]];
console.log(list.flat(2));

[실행 결과]
[1, 2, 3, 4, 5, [6]]
```
1. 파라미터에 1을 더한 3차원까지  
엘리먼트로 변환하므로 [[[5]]] 까지 변환함
2. 4차원인 6은 4차원에서 3차원을 빼면  
1차원이 됨 즉, [6]으로 변환되고  
배열에 설정하여 반환하므로 [[6]]이 됨

- **빈 엘리먼트를 삭제**
```js 
const list = [1, 2, , , , [3, 4]];
console.log(list.length);
const change = list.flat();
console.log(change);
console.log(change.length);

[실행 결과]
6
[1, 2, 3, 4]
4
```

#### 5.2 flatMap()
|구분| 데이터(값)|
|---|---|
|형태| `Array.prototype.flatMap()`, ES2019|
|파라미터1| 콜백 함수 |
|피라미터2| 콜백 함수에서 this로 참조할 오브젝트(opt)|
|반환| 새로운 배열 |
- `flat()`와 기본 기능은 같음
- 배열을 **반복**하면서 콜백 함수 호출
  + 파라미터: 엘리먼트, 인덱스, 배열 전체
  + 콜백 함수에서 반환한 값을 **배열로 반환**
```js
const list = [10, 20];
const cb = (element, index, all) => {
  return element + 5;
};
console.log(list.flatMap(cb));
console.log(list.map(cb));

[실행 결과]
[15, 25]
[15, 25]
```
1. 콜백 함수에서 파라미터로 넘겨준 값을  
단지 값만 변경하여 반환하면
2. map()과 flatMap()의 차이가 없음
  
- `map()`과 차이
```js
const list = [10 ,20];
const cb = (element, index, all) => {
  return [element + 5];
};
console.log(list.map(cb));
console.log(list.flatMap(cb));

[실행 결과]
[[15], [25]]
[15, 25]
```
1. 콜백 함수에서 배열로 반횐
2. map()은 반환된 배열을  
새로운 배열에 설정하여 반환  
2차원 배열이 되지만
3. flatMap()은 반환된 값을  
1차원 줄여서 반환함
4. 이것이 **map()과 flatMap() 의 차이**

## 6. Array 이터레이터 오브젝트 생성
#### 6.1 entries()
|구분| 데이터(값) |
|---|---|
|형태| `Array.prototype.entries()`|
|반환| Array 이터레이터 오브젝트|
- Array 오브젝트를  
Array 이터레이터 오브젝트로 생성, 반환
- 배열의 엘리먼트를  
`[key, value]` 형태로 변환
  + **Array 이터레이터 오브젝트 구조**
```js
const iterator = ["A", "B"].entries();
console.log(iterator.next().value);
console.log(iterator.next().vlaue);

[실행 결과]
[0, A]
[1, B]
```
1. `["A", "B"].entries();`  
Array 이터레이터 오브젝트를 생성함
2. Array 이터레이터 오브젝트는  
`[key, value]` 형태임
3. 배열의 인덱스가 `key`가 되고  
엘리먼트 값이 `value`가 됨

```js
const list = ["A", "B"];
const iterator = list.entries();
```
1. 오른쪽의 iterator를 펼치면 `__proto__`가 있음
2. 이를 펼치면 `next()`가 있음
3. 따라서 이터레이터 오브젝트이며 `next()`를 호출할 수 있음

```js                             
const result = iterator.next();
```
1. 오른쪽의 result를 펼치면  
- value가 있으며, `done: false`가 있음
2. value의 타입은 Array이며 이를 펼치면  
- `0: 0, 1: "A", length: 2`
3. `result.value`는 Array 오브젝트 형태임
- list에 Array 오브젝트를 할당함
- `result.value`와 list가 같음
- 다만, `done: false` 가 있는 것이 Array 오브젝트와 다름
4. 이 형태가 Array 이터레이터 오브젝트 구조임
```js
console.log(result);
console.log(iterator.next().value);
```
1. value 프로퍼티 값을 구해야  
`done: false`를 제외하고 값을 구할 수 있음

- `for - of` 문으로 전개 

```js
const iterator = ["A", "B"].entries();
for (const property of iterator) {
  console.log(property);
};

[실행 결과]
[0, A]
[1, B]
```
1. 전개만 할 때에는 `next()`가 *불편함*  
이유는, 끝난 것을 체크해야 하기 때문
2. 연속해서 전개만 할 때에는 `for - of` 가 편리함
3. of 앞의 property 변수에  
[0, A] 형태로 설정되므로  
값을 사용하려면 코드를 추가해야 하며  
이때 **분할 할당**을 사용하면 편리함

```js
const iterator = ["A", "B"].entries();
for (const [key, value] of iterator) {
  console.log(`${key}: ${value}`);
};

[실행 결과]
0: A
1: B
```
1. 분할 할당으로  
`key`, `value`를 분할할 수 있음

- 이터레이터는 다시 반복할 수 없음
```js 
const iterator = ["A", "B"].entries();
for (const [key, value] of iterator) {
  console.log(`${key}: ${value}`);
};
for (const property of iterator) {
  console.log("다시 전개");
};
console.log(iterator.next());

[실행 결과]
0: A
1: B
{value: undefined, done: false}
```
1. 끝까지 읽은 이터레이터 오브젝트를  
다시 읽을 수 없음
2. `for (const prorperty of iterator){}` 에서  
"다시 전개"가 출력되지 않은 것은  
다시 읽을 수 없기 때문
3. `iterator.next()`  
이터레이터 오브젝트를 전부 읽으면  
`{value: undefined, done: true}`를 반환함

#### 6.2 keys()
|구분| 데이터(값) |
|---|---|
|형태| `Array.prototype.keys()` |
|반환| Array 이터레이터 오브젝트 |
- Array 오브젝트를  
Array 이터레이터 오브젝트로 **생성, 반환**
  + `entries()`와 같으며
  + `[key, value]` 형태에서  
  **value는 반환하지 않고 key만 반환**
- 배열 인덱스가 **key**가 됨
```js
const iterator = ["A", "B"].keys();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

[실행 결과]
{value: 0, done: false}
{value: 1, done: false}
{value: undefined, done: true}
```
1. 생성한 Array 이터레이터 오브젝트는  
[key] 형태임
2. value에 인덱스가 설정됨

```js
const iterator = ["A", "B"].keys();
for (const property of iterator) {
  console.log(property);
};

[실행 결과]
0
1
```
1. key만 설정되므로 값이 하나임  
따라서 분할 할당을 하지 않아도 됨

#### 6.3 values()
|구분| 데이터(값) |
|---|---|
|형태| `Array.prototype.values()` |
|반환| Array 이터레이터 오브젝트 |
- Array 오브젝트를  
Array 이터레이터 오브젝트로 생성, 반횐
- [key, value] 형태에서
  + **key는 반환하지 않고 value만 반환**
- 배열의 엘리먼트 값이 `value`가 됨
```js
const iterator = ["A", "B"].values();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

[실행 결과]
{value: A, done: false}
{value: B, done: false}
{value: undefined, done: true}
```
1. 생성한 Array 이터레이터 오브젝트는  
[value] 형태임

```js
const iterator = ["A", "B"].values();
for (const property of iterator) {
  console.log(property);
};

[실행 결과]
A
B
```
1. values만 설정되므로 값이 하나임

- `[Symbol.iterator]()` 사용
```js
const check = Array.prototype.values
    === Array.prototype[Symbol.iterator];
console.log(check);

const iterator =
        ["A", "B"][Symbol.iterator]();
for (const property of iterator) {
  console.log(property);
};

[실행 결과]
true
A
B
```
1. `Array.prototype.values()`와  
`Array.prototype[Symbol.iterator]`가 같음
2. 따라서 `values()` 대신에  
`[Symbol.iterator]()` 를 사용해도  
결과가 같음

- 값이 연동됨
```js
let list = ["A", "B"];
let iterator = list.values();
list[0] = "연동"
console.log(iterator.next());
console.log(iterator.next());

[실행 결과]
{value: 연동 done: false}
{value: B done: false}
```
1. Array 이터레이터 오브젝트에서  
배열의 메모리 주소를 참조하므로  
값이 **연동**됨