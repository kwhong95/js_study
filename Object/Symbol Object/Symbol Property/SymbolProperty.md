# Symbol Property
## 1. Well-Known Symbols
- 스펙에서 @@iterator 형태를 볼수 있음
  + [ES2019 스펙: Well-known Symbols](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-well-known-symbols)

## 2. toStringTag
- `Object.prototype.toString()` 의 확장
- `toString()`으로 인스턴스 타입을 구하면
  + `[object Object]` 형태로 반환
  + 인스턴스 타입을 명확하게 구할 수 없음
```js
const Book = function() {};
const obj = new Book();
console.log(obj.toString());

console.log({}.toString());

[실행 결과]
[object Object]
[object Object]
```
- `Symbol.toStringTag`로 구분 가능
  + `[object Object]`에서  
  두 번째 표시될 문자열을 작성
  + 예: "ABC" 지정, [object "ABC"]로 반환
- **prototype에 연결하여 작성**
```js
const Sports = function() {};
const obj = new Sports();
console.log(obj.toString());

Sports.prototype[Symbol.toStringTag]
                = "농구";
console.log(obj.toString());

[실행 결과]
[object Object]
[object 농구]
```
1. 첫 번째의 object.toString()을 실행하면  
  + 인스턴스 타입을 반환하며
  + [object Object]가 반환됨
  + function 으로 만들었는데  
  Object가 반환됨
2. `Sports.prototype[Symbol.toStringTag]`  
    `= "농구";`  
  + prototype에 `Symbol.toStringTag`를 연결하고
  + [object Object]에서  
  두 번째의 Object에 표시될 문자를  
  "농구"로 작성했음
  + 표시될 문자를 임의로 작성할 수 있음
  + function마다 지정할 수 있으므로  
  자세하게 구분하여 작성할 수 있음
3. 두 번째의 `obj.toString()`을 호출하면  
  + [object 농구]를 출력함
  + 즉, `Symbol.toStringTag`에 작성한  
  문자가 출력됨

## 3. Symbol.isConcatSpreadable
- `Array.prototype.concat()`은
  + 배열의 엘리먼트를 전개하여 반환
```js
const one = [10, 20], two = ["A", "B"];
const show = () => {
  console.log(one.concat(two));
};
show();
two[Symbol.isConcatSpreadable] = true;
show();
two[Symbol.isConcatSpreadable] = false;
show();

[실행 결과]
[10, 20, A, B]
[10, 20, A, B]
[10, 20, [A, B]]
```
1. 대상이 Array이면  
전개하는 것이 디폴트임
2. `@@isConcatSpreadable`을 true로 처리

- `[Symbol.isConcatSpreadable] = true`
  + one 배열 끝에  
  two 배열의 엘리먼트를 하나씩 연결
- `[Symbol.isConcatSpreadable] = false`
  + 전개하지 않고 two 배열 자체를 연결
- **Array-Like 전개**
```js
const one = [10, 20];
const like = {0: "A", 1: "B", length: 2};
const show = () => {
  console.log(one.concat(like));
};
show();
like[Symbol.isConcatSpreadable] = true;
show();
like[Symbol.isConcatSpreadable] = false;
show();

[실행 결과]
[10, 20, {0: A, 1: B, length: 2}]
[10, 20, A, B]
[10, 20, {0: A, 1: B, length: 2}]
```
1. 대상이 Array-Like이면  
전개하지 않는 것이 디폴트임  
Array와 반대
2. `@@isConcatSpreadable`을 false로 처리
3. Array-Like에서 값만 전개함

## 4. Symbol.species
### 4.1 species
- species의 사전적 의미
  + (공통 특성을 지닌)종류, 인류, 종
- Symbol.species는 cosntructor를 반환
  + constructor를 실행하면  
  인스턴스를 생성하여 반환함
  + 결국, 인스턴스를 반환하게 됨
- Symbol.species를 오버라이드하면  
  + 다른 인스턴스를 반환할 수 있다는 의미
- 우선 Symbol.species와 관련된 개념을 살펴보자

### 4.2 메소드를 실행한 후의 결과 형태
```js
const obj = [1, 2, 3];
```
1. [1, 2, 3]으로 Array 오브젝트를 생성하여 obj 에 할당함
2. 오른쪽의 obj를 펼쳐서 obj 구조를 보면
- prototype은 없고 __proto__만 있으므로
3. obj는 빌트인 Array 오브젝트가 아니라
- Array.prototype에 연결된 메소드로 생성한 인스턴스임
4. 다만, new 연산자를 사용하지 않았으므로  
- 인스턴스가 아닌 오브젝트라고 한것
```js
const one = obj.slice(1, 3)
```
1. 위 코드를 실행한 후의 one과 obj의 구조는 차이가 없으며 
- 값 [2, 3]만 다름
2. 이것은 인스턴스에 있는 메소드를 호출하면
- 메소드 실행 결과값을 반환하지 않고
3. 결과값이 설정된 인스턴스를 반환하기 때문
```js
const two = one.slice(1, 2);
```
1. 바로 앞에서 반환된 one으로
- 메소드를 호출할 수 있다는 것은  
- one이 인스턴스이기 때문
2. 또한, slice(1, 2)를 실행하면
- 결과 값이 설정된 인스턴스를 반환함

**정리하면**
1. Array 인스턴스의 메소드를 호출하면
- 값을 반환하는 것이 아니라
2. 반환할 Array 인스턴스를 생성하고
- 메소드에서 구한 값을 반환할 Array 인스턴스에 설정하여
- Array 인스턴스를 반환함

### 4.3 Symbol.species 기능
```js
class Sports extends Array {};
const obj = new Sports(10, 20 ,30);
const one = obj.slice(1, 2);
console.log(one);

[실행 결과]
[20]
```
- `class Sports extends Array {}`
  + 빌트인 Array 오브젝트를  
  상속(확장, 연결)받음
- `const obj = new Sports(10, 20, 30);`
  + 인스턴스를 생성함
- `const one = obj.slice(1, 2);`
  + obj 인스터스의 slice()를 호출하면
  + slice() 처리 결과를 인스턴스에 설정하여  
  인스턴스를 반환함
- 이렇게 인스턴스의 메소드를 호출했을 때
  + 인스턴스를 반환하도록 하는 것이
  + **Symbol.species 기능임**
### 4.4 Symbol.species 오버라이드
- `Symbol.species`는
  + static 악세서 프로퍼티이며
  + getter만 있고 setter는 없음
```js
class Sports extends Array {
  static get [Symbol.species]() {
    return Array;
  }
};
const obj = new Sports(10, 20);
```
- Symbol.species를 사용할 수 있는 빌트인 오브젝트
  + Array, Map, Set, RegExp
  + Promise, ArrayBuffer, TypedArray
- 빌트인 오브젝트를 상속받은 class에
  + Symbol.species를 작성하면  
  빌트인 오브젝트에  
  @@species가 오버라이드됨
- **인스턴스 바꾸기**
```js
class Sports extends Array {
  static get [Symbol.species]() {
    return Array;
  }
};
const one = new Sports(10, 20, 30);
console.log(one instanceof Sports);

const two = one.slice(1, 2);
console.log(two instanceof Array);
console.log(two instanceof Sports);

[실행 결과]
true
true
false
```
1. `class Sports extends Array {}`
  + 빌트인 Array 오브젝트를 상속받음
2. `static get [Symbol.species]() {`
  `return Array`
`}`
  + 빌트인 Array 오브젝트의  
  `@@species`를 오버라이드함
3. `const one = new Sports(10, 20, 30);`
  + 인스턴스를 생성함
  + 파라미터 값이 인스턴스에 설정됨
4. `one instanceof Sports`
  + Sports로 one을 만들었으므로 true 출력
5. `const two = one.slice(1, 2);`
  + Array 오브젝트를 상속받았으므로  
  one 인스턴스로 `slice()`를 호출할 수 있음
  + `slice()` 대상은 인스턴스에 설정된 [10, 20, 30]
  + 인스턴스를 반환하며  
  반환되는 인스턴스에 `slice()` 결과를 설정함
6. `Symbol.species()`로 오버라이드했으므로
  + `static get [Symbol.species](){}` 가 호출됨
  + 호출에 사용한 one 인스턴스 형태를 반환하지 않고  
  Array 인스턴스를 반환함
  + 이처럼 `Symbol.species()`로  
  반환할 인스턴스를 변경할 수 있음
7. `two instanceof Array`
  + two 인스턴스에는  
  Array 인스턴스가 할당되어 있으며
  + Array 오브젝트로 만들었으므로 true 출력
8. `two instanceof Sports`
  + Sports가 아니라 Array 오브젝트로  
  two 인스턴스를 만들었으므로 false 출력

## 5. Symbol.toPrimitive
### 5.1 toPrimitive
- 오브젝트를 대응하는 Primitive 값으로 변환
- 대응, 기대하는 타입
  + number, string, default
- 오브젝트를 **문자열**에 대응
```js
const point = {bonus: 100};
console.log(point.toString());

const book = {
  toString() {
    return "책"
  }
};
console.log(`${book}`);

[실행 결과]
[object Object]
책
```
1. 문자열 대응은 `toString()`을 사용함
2. `point.toString()`  
`Object.prototype.toString()`가 호출됨
3. `${book}`  
book 오브젝트의 `toString()`이 호출됨
- 오브젝트를 **숫자**에 대응
```js
const point = {bonus: 100};
console.log(point.valueOf());

const book = {
  toString() { return 70 },
  valueOf() { return 30 },
};
console.log(book * 20);

[실행 결과]
{bonus: 100}
600
```
1. 숫자 대응은 `valueOf()`를 사용함
2. `point.valueOf()`  
`Object.prototype.valueOf()`가 호출됨
3. `book * 20`  
book 오브젝트 valueOf()가 호출되며  
`toString()`이 호출되지 않음
4. `valueOf()`를 작성하지 않으면  
`toString()`이 호출됨

- `Symbol.toPrimitive()` 사용
```js
const obj = {
  [Symbol.toPrimitive](hint) {
    return hint === "number" ? 30 :
    hint === "string" ? "책" : "default";
  }
};
console.log(20 * obj);
console.log(`${obj}` + 100);
console.log(obj + 50);
console.log("default" == obj);

[실행 결과]
600
책100
default50
true
```
1. 20 * obj
  + 20을 곱하는 숫자 연산으로 처리
  + toPrimitive(hint)의  hint에  
  엔진이 "number"를 설정함
  + 30을 반환하며 20 * 30 = 600을 출력
2. `${obj}` + 100
  + hint에 "string"이 설정됨
3. obj + 50
  + hint에 "default"가 설정됨
4. `"default" == obj`
  + == 비교는 hint에 "default"가 설정됨
