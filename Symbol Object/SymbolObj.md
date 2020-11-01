# Symbol Object
## 1. primitive 값
- 자바스크립트에서 Primitive 값은
  + 오브젝트가 아니라 값이며  
  함수를 갖고 있지 않음
- `const num = 100;`을 할당하면
  + num 변수에 100만 할당되며  
  아무것도 첨부되지 않음
  + 100이 primitive 값
- ES5의 primitive 값 타입
  + string, number, boolean,  
  null, undefined
- ES6에서 symbol 타입 추가

## 2. wrapper 오브젝트
- **wrapper 오브젝트는**?
  + 프리미티브 값이 포함된 오브젝트
  + wrapper 오브젝트에는 메소드가 있음
- wrapper 오브젝트가 있는 프리미티브 값 타입
  + `string: String`, `number: Number 오브젝트`
  + `boolean: Boolean`, `symbol: Symbol 오브젝트`
- `const obj = new String(100);`
  + obj 인스턴스의 `[[PrimitiveValue]]`에  
  100이 설정됨
  + **[[PrimitiveValue]] 형태**
- `undefined, null`은 **wrapper 오브젝트** *없음*
```js
const sports = new String(100);
```
1. 오른쪽의 sports를 펼치면
2. `[[primitiveValue]]`: "100"이 있음
- `[[PrimitiveValue]]`가 프리미티브 값을 나타내는
- 프로퍼티 이름이며, "100"이 프로퍼티 값임
3. `sports`가 **wrapper 오브젝트**임
```js
const sym = Symbol("ABC");
```
1. sports 를 펼치면 `[[PrimitiveValue]]`가 표시되지만
2. sym을 펼칠 수가 없으며
- `[[PrimitiveValue]]`가 표시되지 않음
3. 그렇다고 Symbol에 Primitive 값이 없는 것은 아니며
4. 이것은 Symbol은 Primitive 값을
- **외부에 노출시키지 않는 특성** 때문임
  
## 3. Symbol()
| 구분 | 데이터(값) |
| --- | --- |
| 형태 | `Symbol()` |
| 파라미터 | 설명, 주석(opt) |
| 반환 | 유일한 Symbol 값 |
- `Symbol()` 함수는 값을 생성하여 반환
  + **반환된 값을 볼 수 없음**
  + new 연산자를 사용할 수 없음
```js
const sym = Symbol();
console.log(sym);
console.log(typeof sym);

[실행 결과]
Symbol()
symbol
```
1. `const sym = Symbol()`  
Symbol 오브젝트가 아니라  
Symbol 값을 생성하여 반환함
2. 새로운 값을 생성하여 반환하므로  
값을 생성한다는 표현 적절함
3. `console.log(sym)`  
생성한 Symbol 값이 출력되지 않고  
Symbol 값을 생성한 코드 형태가 표시됨
4. `typeof sym`  
Symbol로 생성한 값 타입은 symbol 임
  
- 프로그램 전체를 통해 **유일한 값** 제공
```js 
const one = Symbol();
const two = Symbol();
console.log(one == two);

[실행 결과]
false
```
1. `Symbol()`을 실행할 때마다  
프로그램 전체에서  
하나만 있는 값을 생성함
2. 따라서 one의 값과 two의 값은 다름
  
- **Symbol 값으로 연산 불가**
```js
let sym = Symbol();
try {
  const add = sym + 5;
} catch(e) {
  console.log("연산 불가");
};

[실행 결과]
연산 불가
```
1. `const add = sym + 5;`  
Symbol이 값이지만 연산할 수 없음
  
- **Symbol 타입 변경 불가**
```js
let sym = Symbol();
try {
  +sym;
} catch {
  console.log("값 타입 변경 불가");
};
[실행 결과]
값 타입 변경 불가
```
1. `+sym;`  
단항 +연산자는 Number 타입으로 바꿈  
Symbol 타입을 바꿀 수 없음
2. 이외에도 비교할 수 없는 등의  
Symbol 값 사용에 제약이 있음
3. 이것은 외부에 값이  
노출되지 않도록 하기 위해서임
4. 외부의 Symbol 값이 노출되는  
처리(계산, 변환 등)을 할 수 없음
  
- 파라미터에 **주석, 설명**을 작성
```js
const sym = Symbol("주석, 설명");
console.log(sym);

[실행 결과]
Symbol(주석, 설명)
```
1. `const sym = Symbol("주석, 설명");`  
파라미터에 `Symbol()`로 생성한 값의  
설명, 주석을 문자열로 작성함
2. 생성한 Symbol 값을 볼 수 없으므로  
값 설명이 필요할 때 사용함
3. `Symbol()` 실행에 영향을 미치지 않음
4. `console.log(sym)`  
생성한 Symbol 값이 출력되지 않고  
Symbol 값을 생성한 코드가 표시됨
  
- Symbol값을 **문자열**로 바꿔서 연결
```js
const sym = Symbol("설명");
console.log(sym.toString() + "연결");

[실행 결과]
Symbol(설명)연결
```
1. `sym.toString() + "연결"`  
2. Symbol 값을 `toString()`으로 변환하면  
에러가 발생하지 않지만
3. 값이 변환되지 않고  
값을 만든 형태에 문자열을 연결함
4. `new String(sym)` 형태는 *에러가 발생함*
  
- **Template에 사용**
```js
const sym = Symbol("주석, 설명");
try {
  `${sym}`
} catch {
  console.log("`${sym} 불가`");
};

[실행 결과]
`${sym} 불가`
```
1. Symbol 값을 Template에  
사용할 수 없음

## 4. Symbol 사용 형태
- **Object의 프로퍼티 키로 사용**
  + Symbol 값이 유일하므로 *중복되지 않음*
  + `symbol-keyed property` 라고 부름  
  ```js
  const sym = Symbol("설명");
  const obj = {[sym]: 100};
  ```
1. `const obj = {[sym]: 100};`  
2. Symbol 값을  
Object의 프로퍼티 키로 사용함
3. [sym] 처럼 대괄호 안에  
Symbol() 할당한 변수 이름을 작성함
4. 이를 `symbol-keyed property`라고 부름
+ **프로퍼티 값 추출 방법**
```js
const sym = Symbol("설명");
const obj = {[sym]: 100};
console.log(obj[sym]);
console.log(obj.sym);

[실행 결과]
100
undefined
```
1. `obj[sym]`  
Symbol() 결과를 할당한 sym을  
프로퍼티 키로 사용하여 값을 구함
2. 프로퍼티 값인 100이 출력됨
3. `obj.sym`  
undefined가 출력되며  
`obj[sym]` 형태를 사용해야 함
  
- **Object에서 함수 이름으로 사용**
```js
const sym = Symbol("함수 이름");
const obj = {
  [sym](param) {
    return param;
  }
};
console.log(obj[sym](200));

[실행 결과]
200
```
1. `[sym](param){}` 형태로 함수를 정의하고
2. `obj[sym](200)` 형태로 호출함
  
- for-in 문에서 사용
  + Symbol이 열거되지 않음
  + `[[Enumerable]]: false` 이기 떄문
```js
const obj = {
  [Symbol("100")]: 100,
  two: 200
};
for (let key in obj) {
  console.log(key);
};

[실행 결과]
two
```
1. Object에 `symbol-keyed` 프로퍼티를  
사용하여 프로퍼티 값을 작성했음
2. **for-in 문**으로 열거되지 않음  
에러가 나지 않음
- `Object.getOwnPropertySymbol()` 로 열거 가능
- `for-of`문에서 사용 
  + 배열 안에 `Symbol()` 작성
```js
const list = [Symbol("100")];
for (let value of list) {
  console.log(value);
};

[실행 결과]
Symbol(100)
```
- `JSON.stringify()` 에서 사용
  + **Symbol 값이 문자열로 변환되지 않음**
```js
const sym = Symbol("JSON");
const result =
  JSON.stringify({[sym]: "ABC"});
console.log(result);

[실행결과]
{}
```
1. `JSON.stringify()`는  
Object의 프로퍼티 키와 값을
`{"key": "value"}` 형태로 변환함
2. Symbol은 변환에서 제외
3. 이것은, Symbol 값을 외부에  
노출하지 않기 위해서임
4. 빈 오브젝트가 반환됨