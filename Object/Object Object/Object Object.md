# Object 오브젝트
## 1. JS 값 비교 방법
#### 1.1 is()
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

## 2. 오브젝트 복사
#### 2.1 assign()
|구분|데이터(값)|
|---|---|
|형태|`Object.assign()`|
|파라미터|열거 가능 오브젝트/ 다수작성가능(opt)|
|반환|첫 번째 파라미터 오브젝트|
- 두 번째 파라미터의 오브젝트 프로퍼티를
  + 첫 번째 파라미터의 오브젝트에 **복사**하고  
  첫 번째를 반환
  + own property만 복사
```js 
const sports = {
  event: "축구",
  player: 11
};
let dup = {};
Object.assign(dup, sports);
console.log(dup);

[실행결과]
{event: 축구, player: 11}
```
#### 2.2 첫 번쨰 파라미터 작성
- 첫 번째 파라미터는 반드시 작성
```js
try {
  const obj = Object.assign(null, {});
} catch(e) {
  console.log("null 작성 불가");
};

[실행 결과]
null 작성 불가
```
1. 첫 번째 파라미터를 작성하지 않거나  
`null`, `undefined` 를 작성하면 *TypeError*
  
- `Number, String, Symbol, Boolean` 값 작성
```js
const obj = Object.assign(100);
console.log(obj.valueOf());

[실행 결과]
100
```
1. 첫 번째 파라미터에 Number를 작성하고  
두 번째 파라미터를 작성하지 않았음
2. **Number 인스턴스**를 생성하여  
파라미터 값 100을  
`[[PrimitiveValue]]` 에 설정함
3. 생성한 인스턴스를 반환함
4. Boolean, String, Symbol도  
같은 방법으로 처리함
  
#### 2.3 두 번째 파라미터 작성
- **열거 가능 오브젝트 작성**
```js
let obj = {};
Object.assign(obj, {ten: 10});
console.log(obj);

const one = Object.create({}, {
  book: {value: 100, enumerable: false},
  sports: {value: 200, enumerable: true}
});
Object.assign(obj, one);
console.log(obj);

[실행 결과]
{ten: 10}
{ten: 10, sports: 200}
```
- **오브젝트 다수 작성**
```js
const book = {title: "책"};
const sports = {item: "축구"};
const obj = Object.assign({}, book, sports);
console.log(obj);

[실행 결과]
{title: 책, item: 축구}
```
1. 두 번째 파라미터 이후에 콤마로 구분하여  
오브젝트를 작성할 수 있음
  
- **값을 작성**
```js
let obj = {ten: 10};
Object.assign(obj, undefined, null, 200);
console.log(obj);

const one = {un: undefined, nu: null};
Object.assign(obj, one);
console.log(obj);

[실행 결과]
{ten: 10}
{ten: 10, un: undefined, un: null}
```
1. 값으로 작성한 `undefined`, `null`, 200이  
복사되지 않음
2. *열거 가능한 오브젝트가 아니기 때문*
  
- **값과 오브젝트를 작성**
```js 
const obj = Object.assign(100, {book: 200});
console.log(obj.valueOf());
console.log(obj.book);

[실행 결과]
100
200
```
1. 100 이므로 Number 인스턴스를 생성함
2. 두 번째 파라미터가 **Object**이므로  
생성한 **Number 인스턴스**에 **복사**함
3. **Number 인스턴스에 Object를 복사하는 것**은  
*데이터 타입이 맞지 않음*
4. Object이므로 복사가 된다는 것을  
설명하기 위함
  + **값이 설정된 인스턴스 형태**
```js
const obj = Object.assign(100, {book: 200});
```
1. `obj`를 펼치면  
- `book: 200`이 있으며 **Object**에서 사용하는
- **프로퍼티** 형태임
2. __proto__에 Number 오브젝트의 메소드가 있음
3. `[[PrimitiveValue]]: 100`
- **프리미티브 값**을 나타내며,
- 첫 번째 파라미터에 작성한 100임

## 3. Deep Copy
- **Object**를 할당하면 프로퍼티 값이 연동됨
  + 한 쪽 오브젝트의 프로퍼티 값을 바꾸면  
  다른 오브젝트의 프로퍼티 값도 바뀜
```js
const sports = {
  item: "축구"
};
let copy = sports;
sports.item = "농구";
console.log(copy.item); // copy.item도 같이 바뀜(연동)

[실행 결과]
농구
```
- `assign()` 함수로 **복사**
```js 
const sports = {
  item: "축구"
};
let copy = {};
Object.assign(copy, sports); 
sports.item = "농구";
console.log(copy.item); // 연동 안됨

[실행 결과]
축구
```
- **그래도 연동 되는 형태**
```js
const book = {
  item: {title: "자바스크립트"}
};
let copy = {};
Object.assign(copy, book);
copy.item.title = "책";
console.log(book.item.title);

[실행 결과]
책
```
1. `{item: {title: "자바스크립트"}}`
2. **Object 안에 Object가 있는 형태**임  
`item.title` 값이 연동됨
3. 이것은 프로퍼티를 복사하지 않고  
**Object 참조를 복사**하기 때문임

- 연동되지 않게 하려면  
프로퍼티 단위로 복사
```js
const book = {
  item: {title: "자바스크립트"}
};
let copy = {};
for (let key in book) {
  let value = book[key];
  copy[key] = {};
  for (let name in value) {
    copy[key][name] = value[name];
  };
};
book.item.title = "책";
console.log(copy.item.title);

[실행 결과]
자바스크립트
```
1. 프로퍼티 단위로 복사하면 연동되지 않지만
2. 단계의 깊이가 유동적이면 코드가 복잡해짐
3. 다단계 계층 구조에서  
값이 연동되지 않도록 복사하는 것을  
**deep copy**, **deep clone** 이라고 부름
  
- **JSON 함수 활용**
```js
const book = {
  item: {title: "자바스크립트"}
};
const copy =
    JSON.parse(JSON.stringify(book));
book.item.title = "책";
console.log(copy.item.title);

[실행 결과]
자바스크립트
```
1. `JSON.stringify()`로 문자열로 **변환**한 후
2. `JSON.parse()`로 **파싱**하면 *연동되지 않음*

## 4. Object 변환
#### 4.1 entries()
|구분|데이터(값)|
|---|---|
|형태|`Object.entries()`|
|파라미터|열거 가능한 오브젝트|
|반환|`[[key, value]]` 형태|
- **열거 가능**한 오브젝트의 `{key: value}`를
  + `[[key, value]]` 형태로 변환
```js
const obj = {music: "음악", book: "책"};
const list = Object.entries(obj);
for (let keyValue of list) {
  console.log(ketValue);
};

[실행 결과]
[music, 음악]
[book, 책]
```
1. `list`는 **이터러블 오브젝트**임
2. `[[key, value]]` 형태를 **Map 형태**라고 부름
  
- **작성한 순서가 바뀌는 경우**
```js
const obj = {10: "십", book: "책", 7: "칠"};
const list = Object.entries(obj);
for (let keyValue of list) {
  console.log(keyValue);
};

[실행 결과]
[7, 칠]
[10, 십]
[book, 책]
```
1. `key`가 영문자일 때는  
`key` 값을 분류하지 않고 작성한 대로 반환
2. 반면, 숫자와 문자가 섞여 있으면  
숫자, 문자 순서로 분류함
  
- **문자열은 문자 하나씩 분리**
```js
const list = Object.entries("ABC");
for (let keyValue of list) {
  console.log(keyValue);
};

[실행 결과]
[0, A]
[1, B]
[2, C]
```
1. 문자열은 문자 하나씩 분리함
2. 인덱스를 `key` 값으로 사용함

#### 4.2 values()
|구분|데이터(값)|
|---|---|
|형태|`Object.values()`|
|파라미터|열거 가능한 오브젝트|
|반환| `[value]` 형태|
- 열거 가능한 오브젝트의 `{key: value}` 를
  + 값만 `[value1, value2]` 형태로 변환
```js 
const obj = {music: "음악", book: "책"};
const list = Object.values(obj);
for (let value of list) {
  console.log(value);
};

[실행 결과]
음악
책
```
- **작성한 순서가 바뀌는 경우**
```js
const obj = {10: "십", book: "책", 7: "칠"};
const list = Object.values(obj);
for (let value of list) {
  console.log(value);
};

[실행 결과]
칠
십
책
```
1. `key`가 영문자일 때는  
`key` 값을 분류하지 않음
2. 숫자와 문자가 섞여 있으면  
숫자, 문자 순서로 **분류**함
  
- **문자열은 문자 하나씩 분리**
```js
const list = Object.values("ABC");
for (let value of list) {
  console.log(value);
};

[실행 결과]
A
B
C
```

#### 4.3 fromEntries()
|구분|데이터(값)|
|---|---\
|형태|`Object.fromEntries()`, ES2019|
|파라미터|이터러블 오브젝트|
|반환|새로운 오브젝트|
- `[[key, value]]` 형태를
  + `{key: value}` 형태로 변환
```js
const list = [["one", 10], ["two", 20]];
const obj = Object.fromEntries(list);
console.log(obj);

[실행 결과]
{one: 10, two: 20}
```
- 프로퍼티 `key`값이 같으면 **값 대체**
```js
const list = [["one", 10], ["one", 20]];
const obj = Object.fromEntries(list);
console.log(obj);

[실행 결과]
{one: 20}
```
#### 4.4 getOwnPropertyDescriptors()
|구분|데이터(값)|
|---|---|
|형태|`Object.getOwnPropertyDescriptors()`|
|파라미터| 대상 오브젝트 |
|반환| 프로퍼티 디스크립터를 포함한 오브젝트|
- `Object`의 **프로퍼티 디스크립터를 반환**
  + **데이터 디스크립터**
```js
const obj = {music: "음악"};
const des =
      Object.getOwnPropertyDescriptors(obj);
for (let name in des.music) {
  console.log(name + ": " + des.music[name]);
};

[실행 결과]
value: 음악
writable: true
enumerable: true
configurable: true
```
1. `{music: "음악"}`  
프로퍼티 디스크립터 중에서
2. **데이터 디스크립터**를 반환함
  
  + **엑세스 디스크립터**
```js 
const obj = {
  get music() {}
};
const des = 
      Object.getOwnPropertyDescriptors(obj);
for (let name in des.music) {
  console.log(name + ": " + des.music[name]);
};

[실행 결과]
get: get music() {}
set: undefined
enumerable: true
configurable: true
```
1. `get: music(){}`
2. **엑세스 디스크립터**를 반환함
  + *상속받은 오브젝트는 반환하지 않음*

## 5. prototype 과 __proto__
#### 5.1 메소드 호출 방법
- **prototype**과 **__proto__**에 연결된  
메소드를 호출하는 방법이 다름
- **prototype**에 연결된 메소드 호출
  + `Array.prototype.slice()` 처럼  
  **prototype**을 작성하여 호출
```js
function Book() {
  this.point = 100;
};
Book.prototype.getPoint = function() {
  console.log(Object.is(this, Book.prototype));
  return this.point;
};
console.log(Book.prototype.getPoint());
console.log(Book.prototype.getPoint.call(Book));

[실행 결과]
true
undefined
false
undefined
```
1. `Book.prototype.getPoint()`  
**prototype**을 작성하여 호출하면  
`getPoint()`에서 `this`가 `Book.prototype`를 참조
2. `Book.prototype.getPoint.call(Book)`  
`this`가 `Book`을 참조함
3. `this.point`를 참조하려면  
인스턴스를 생성하고  
인스턴스의 메소드를 호출해야 함
  
- `__proto__`에 연결된 메소드 호출
  + 인스턴스를 생성하여 호출
  + **new 연산자**로 생성한 인스턴스 구조
```js
function Book() {
  this.point = 100;
};
Book.prototype.getPoint = function() {
  return this.point;
};
const obj = new Book();
console.log(obj.getPoint());
[실행 결과]
100
```
1. `obj`를 펼치면  
- `point: 100`이 있으며 **인스턴스 프로퍼티**이다
- 생성자 함수에서 `this.point = 100` 으로 설정한 것
2. `__proto__`를 펼치면
- **prototype**에 연결된 메소드가 표시됨
- `getPoint`는 `Book.prototype.getPoint`를 참조함
- `__proto__`에 복사하지 않음
3. **생성한 인스턴스 이름을 사용**하여  
- `getPoint()` 메소드를 **호출**하면
- 호출된 메소드에서 `this`로 인스턴스를 참조할 수 있음

## 6. 인스턴스에 함수로 추가
#### 6.1 함수로 추가
- **new 연산자**로 인스턴스를 생성하고  
  + 인스턴스의 **프로퍼티로 함수를 추가**
  + *다른 인스턴스와 공유하지 않음*
- 인스턴스에 추가한 후의 인스턴스 **구조**
```js
function Book() {
  this.point = 100;
};
Book.prototype.getPoint = function() {
  return this.point;
};
const obj = new Book();

//인스턴스 프로퍼티(함수)로 추가
obj.setPoint = function(param) {
  this.point = param;
};
// obj를 펼치면 __proto__ 위에 setPoint가 표시됨
obj.setPoint(200); // point: 200 반환
// 인스턴스의 함수 형태로 호출
// 함수에서 this가 인스턴스를 참조함

console.log(obj.getPoint());
// prototype에 연결된 메소드를 호출함

const newObj = new Book();
// 새로운 인스턴스 생성 -> setPoint() 인스턴스에서 사용 불가
// 인스턴스의 프로퍼티로 설정했기 때문
console.log(newObj.setPoint); //undefined
// 인스턴스의 프로퍼티로 연결한 것과
// prototype에 연결한 메소드의 차이
```

## 7. __proto__에 메소드 추가
> 7절~ 마지막 절까지 비교하며 구분해볼것!!!
#### 7.1 메소드 추가
- `__proto__`에 `function`을 추가하면  
  + **prototype**에 설정됨
  + **메소드로 추가**하는 것과 같음
  + `__proto__`에 추가한 후의 **prototype의 모습**
```js
function Book(param) {
  this.point = param;
};
Book.prototype.getPoint = function() {
  return this.point;
};
const obj = new Book(100);

//__proto__에 메소드를 추가
obj.__proto__.setPoint = function(param) {
  this.point = param;
};
```
1. `obj`를 펼치면 `__proto__`에 `setPoint` 표시
2. `Book.prototype`을 펼치면 `setPoint`가 표시

3. 이렇게 표시가 되는 것은
- `__proto__`에 메소드를 추가하면, `__proto__`에 추가하지 않고  
- **prototype** 에 추가하기 때문
4. `__proto__`에 연결되어 표시된 것은  
- 디버깅 툴에서 가독성을 위해
- **prototype**에 연결된 메소드를 표시한 것임
  
- 추가한 메소드를 인스턴스에 **공유**
```js
function Book(param) {
  this.point = 100;
};
Book.prototype.getPoint() = function() {
  return this.point;
};
const obj = new Book(100);
// beforeObj 인스턴스를 생성
const beforeObj = new Book(100); 

// __proto__에 메소드를 추가함
obj.__proto__.setPoint = function(param) {
  this.point = param;
}

// 새로운 인스턴스를 생성
const afterObj = new Book(300);
// setPoint() 가 인스턴스에 할당되므로
// - 메소드로 호출할 수 있음
beforeObj.setPoint(700);
```
1. `beforeObj` 인스턴스는
- `setPoint()` 메소드를 추가하기 전에 인스턴스를 만들었지만
2. **prototype sharing(공유)**으로 인해
- 추가된 메소드를 사용할 수 있음
3. `setPoint()`가 호출되면
- `Book.prototype`에서 `setPoint`의 존재 여부를 체크하고
- 있으면 `__proto__`가 아니라 `Book.prototype`의
- `setPoint()`를 호출하기 때문

## 8. setPrototypeOf()
#### 8.1 setPrototypeOf(): 인스턴스 사용
|구분| 데이터(값)|
|---|---|
|형태|`Object.setPrototypeOf()`|
|파라미터| 오브젝트 또는 인스턴스 / 오브젝트의 prototype 또는 null|
|반환|첫 번째 파라미터|
- 첫 번째 파라미터의 **prototype**으로
  + 두 번째 파라미터를 설정
```js
let obj = {0: 10, length: 1};
Object.setPrototypeOf(obj, Array.prototype);
```
1. `obj`는 **인스턴스**이다
2. 인스턴스에는 *prototype이 없으며*  
`__proto__`가 있으므로  
`__proto__`에 설정하는 것과 같음
- 첫 번째 파라미터에 인스턴스 작성
  + `setPrototypeOf()` 실행 후 인스턴스 구조
```js
const obj = {0: 10, 1: 20, length: 2};
```
1. **Array-Like 오브젝트**
2. obj를 펼치면
- prototype은 없고 `__proto__`만 있음
3. 이것은 *오브젝트가 아니라*
- `Object.prototype`에 연결된 메소드로
- **생성한 인스턴스**를 뜻함
4. `__proto__`에 `Object.prototype`에 연결된
- 메소드가 설정되어 있으므로
- *Array 오브젝트의 메소드를 사용할 수 없음*
```js
Object.setPrototypeOf(obj, Array.prototype);
```
1. obj의 `__proto__`에 `Array.prototype`에 연결된
- 메소드를 설정함
2. obj를 펼치면
- `Object.prototype`에 연결된 *메소드가 없어지고*
- `Array.prototype`에 연결된 메소드가 표시됨
3. 설명을 위한 것으로 일반적으로 이렇게 사용하지 않지만
- 이처럼 `__proto__`에 설정된 **메소드를 바꿀수 있음**
```js
const callback = (element, index, all) => console.log(element);
obj.forEach(callback);
```
1. obj가 배열이 아니므로 `forEach()`를 사용할 수 없지만
- 바로 앞에서 `__proto__`에 `Array.prototype`에 연결된
- **메소드를 설정**했으므로 사용할 수 있음
2. 콜백 함수가 호출 되면서 **반복**하게 됨
- `console`에 10, 20이 출력됨
```js
const check = Object.prototype;
// Object.prototype이 바뀌지 않음
```
#### 8.2 setPrototypeOf(): prototype 사용
|구분|데이터(값)|
|---|---|
|형태|`Object.setPrototypeOf()`|
|파라미터|오브젝트 또는 인스턴스 / 오브젝트의 prototype 또는 null|
|반환| 첫 번째 파라미터|
- 첫 번째 파라미터에 **prototype**을 작성
- 첫 번째 파라미터의 **prototype**에
  + 두 번째 파라미터의 **prototype**에  
  연결된 프로퍼티를 설정
- **prototype 연결 후의 인스턴스 구조**
```js
function Book() { };
Book.prototype.getBook = function() { };

function Point() { };
Point.prototype.getPoint = function() { };

Object.setPrototypeOf(Point.prototype, Book.prototype);
```
1. `Point.prototype`에
- `Book.prototype`에 연결된 프로퍼티를 설정함
2. `Point.prototype`에 설정하므로 이것을 펼치면
- `Book.prototype.getBook()`이 있어야 하는데 *없음*
3. 또한, `Point.prototype`에 연결한 메소드가
- 지워지지 않고 유지됨
4. 한편, `Point.prototype.__proto__`를 펼치면
-  `getBook()`이 표시됨
5. `setPrototypeOf()` 함수 이름의 뉘앙스가
- prototype에 설정하는 것처럼 보이지만
- prototype에 `__proto__`를 만들고 여기에 **설정**
6. prototype에 설정하면 `getPoint()`가 지워지므로
- Point에 작성된 메소드를 사용할 수 없게 됨
7. 이를 피하기 위해 `__proto__`를 만들어 설정한 것
8. `__proto__`로 구조적으로 계층을 만들어 설정하므로
- 같은 이름의 메소드가 있더라도 대체되지 않음
9. 식별자 해결을 할 때, `__proto__` 순서로 검색하므로
- 같은 이름의 메소드가 있을 때,
- 앞의 메소드가 호출 됨
```js
const obj = new Point(300);
```
1. `new Point(300)`를 실행하면
- `Point.prototype`에 연결된 메소드로 **인스턴스를 생성**함
2. 오른쪽 obj를 펼치면
- `obj.__proto__.__proto__`구조임
- 이것은 `Point.prototype` 구조와 같음
3. 위의 `__proto__`에 `Point.prototype`에 연결된 메소드가 설정
- 아래의 `__proto__`에 `Book.prototype`에 연결된 메소드가 설정
  
- **상속을 위한 목적**이라면
  + `super` 등의 **상속 처리 키워드를 제공**하는
  + **Class**를 사용하는 것이 좋음