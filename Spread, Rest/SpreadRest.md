# Spread & Rest

## 1. intro
#### let, const 사용 기준
- `let`, `const` 변수 사용 기준
  + `let` : 변경 **가능**하다
  + `const` : 변경 *불가능*하다
  
- `let`, `const` 변수의 시맨틱을 우선하여 사용
  + 값이 변경되면 `let`
  + 초기값이 변경되지 않으면 `const`
```js
const list = [10, 20];

let values = [10, 20];
values.push(30, 40);

for (let k = 0; k < list.length; k++) {};

const book = (param) => param + 10;
```

## 2. Spread(...)
> Syntax : [...iterable]
  
- [...iterable]
  + `[...]`처럼 [] 안에 점(.) 3개 작성
  + 이어서 **이터러블 오브젝트** 작성
- 이터러블 오브젝트를 하나씩 전개
- `{key: value}` 의 Object가
  + 이터러블 오브젝트는 아니지만 전개 가능
- 용어 사용 기준
  + spread, 분리, 전개를 사용
```js
const list = [21, 22];
console.log([11, ...list, 12]);

const obj = {key: 50};
console.log({...obj});

[실행 결과]
[11, 21, 22, 12]
{key: 50}
```
  
#### 2.1 Array Spread
  
- **spread** 대상 **배열**을  
  작성한 위치에 **엘리먼트 단위**로 **분리(전개)**
- **Array spread** 작성 **형태**
```js
const one = [21, 22];
const two = [31, 32];
const result = [11, ...one, 12, ...two];
console.log(result);
console.log(result.length);

[실행 결과]
[11, 21, 22, 12, 31, 32]
6
```
1. `...one`  
  one 배열의 [21, 22]를  
  엘리먼트 단위로 **분리(전개)**함
2. `...two` 위치에  
  two 배열의 [31, 32]를
  엘리먼트 단위로 **분리(전개)**함
  
- 값이 대체되지 않고 전개
```js
const one = [11, 12];
const result = [11, 12, ...one];
console.log(result);
console.log(result.length);

[실행 결과]
[11, 12, 11, 12]
4
```
1. 앞에 11과 12가 있지만  
**값을 대체하지 않고**  
...을 작성한 위치에 **전개**함

#### 2.2 String Spread
- spread 대상 문자열을  
  작성한 위치에 문자 단위로 전개
- String spread 작성 형태
```js
const target = "ABC";
console.log([...target]);

[실행 결과]
[A, B, C]
```
1. `[...target];`
2. `target`의 `"ABC"`를 **문자 단위**로 **분리**하여  
`...target` **위치**에 설정

### 2.3 Object Spread
- spread 대상 Object를   
  작성한 위치에 프로퍼티 단위로 전개
- Object Spread 작성 형태
```js
const one = {key1: 11, key2: 22};
const result = {key3: 33, ...one};
console.log(result);

[실행 결과]
{key3: 33, key1: 11, key2: 22};
```
1. `...one`  
  one 오브젝트의 **프로퍼티**를 전개
  
- 프로퍼티 이름이 같으면 값 대체
```js
const one = {book: 10, music: 20};
const result = {book: 30, ...one};
console.log(result);
//const check = [...one];

[실행 결과]
{book: 10, music: 20};
```
1. `{book: 30}`과 `{book: 10}`에서  
  프로퍼티 **이름**이 같으므로  
  30이 뒤에는 작성한 10으로 **대체**됨
2. Object는 *이터러블 오브젝트가 아니므로*  
  `[...one]` 형태로 작성하면 *에러 발생*
  
#### 2.3 push (...spread)
- push() 파라미터에 spread 대상 작성
- 배열 끝에 대상을 분리하여 첨부
```js
let result = [21, 22];
const five = [51, 52];
result.push(...five);
console.log(result);

result.push(..."abc");
console.log(result);

[실행 결과]
[21, 22, 51, 52]
[21, 22, 51, 52, a, b, c]
```
1. result 배열 끝에 첨부
2. 배열이면 엘리먼트로 분리하여 첨부하고  
문자열이면 문자 단위로 분리하여 첨부

## 3. Rest 파라미터
#### 3.1 function spread
- 호출하는 **함수 파라미터**에  
**spread 대상** 작성
- **처리 순서 및 방법**
  + 함수가 호출되면  
  우선, 파라미터의 배열을  
  엘리먼트 단위로 **전개**
  + 전개한 **순서대로** 파라미터 값으로 넘겨 줌
  + 호출받는 함수의 파라미터에 순서대로 **매핑**됨
```js
function add(one, two, three) {
  console.log(one + two + three);
};

const values = [10, 20 ,30];
add(...value);

[실행 결과]
60
```
- `one: 10, two: 20, three: 30` 이 매핑된다

#### 3.2 rest 파라미터
- **Syntax** :
```js
function (param, paramN, ...name);
```
- 분리하여 받은 파라미터를 배열로 **결합**
  + `spread`: 분리  
  + `rest`: 결합
```js
function point(...param) {
  console.log(param);
  console.log(Array.isArray(param));
};
const values = [10, 20, 30];
point(...value);

[실행 결과]
[10, 20, 30]
true
```
- **작성 방법**
  + 호출받는 함수의 파라미터에
  + ...에 이어서 파라미터 **이름** 작성
  + 호출한 함수에서 **보낸 순서로 매핑**
- 파라미터와 Rest 파라미터 **혼합** 사용
```js
function point(ten, ...point) {
  console.log(ten);
  console.log(rest);
};
const values = [10, 20, 30];
point(...values);

[실행 결과]
10
[20, 30]
```
1. `ten`에 10이 설정됨
2. 설정되지 않은 **나머지 값** 전체가  
  파라미터 `rest`에 설정됨  
  그래서 **rest 파라미터**라 칭함
3. 나머지라는 시맨틱을 나타내기 위해  
  파라미터 이름은 `rest`로 사용하기도 함
   
#### 3.3 Array-like
- **Object** 타입이이지만
  + 배열처럼 **이터러블** 가능한 오브젝트
  + `for()` 문으로 전개할 수 있음
- **작성 방법**
  + 프로퍼티 `key` 값을 0부터  
  1씩 증가하면서 프로퍼티 값을 작성
  + `length`에 전체 프로퍼티 수 작성
```js
const values = {0: "가", 1: "나", 2: "다",
                length: 3};
for (let k = 0; k < values.length; k++) {
  console.log(value[k]);
}

[실행 결과]
가
나
다
```
1. `length` 프로퍼티는 전개되지 않음
2. `for~in` 문으로 전개하면  
  `length` 프로퍼티도 전개됨

#### 3.4 rest와 argument 차이
- **Argument 오브젝트**
  + 파라미터 작성에 관계없이 **전체**를 설정
  + **Array-like** 형태  
  Array 메소드를 사용할 수 없음
  + `__proto__`가 Object
```js
function book() {
  const param = arguments;
};
  book(10, 20 ,30);
```
> **arguments**의 `__proto__`가 Object

- **rest 파라미터**
  + **매핑되지 않은** 나머지 파라미터만 설정
  + **Array** 오브젝트 형태  
  **Array** 메소드를 사용할 수 있음
  + `__proto__`가 **Array**
```js
function point(...rest) {
  debugger;
};
point(10, 20 ,30);
```

