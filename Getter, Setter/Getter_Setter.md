# Getter & Setter
## 1. getter
- **getter**로 선언된 함수를 **자동**으로 호출
  + **값을 반환**하는 시맨틱을 갖고 있으므로  
  **getter 함수에서 값을 반환해야 함**
- *ES5 형태*
```js
var book = {};
Object.defineProperty(book, "title", {
  get: function() {
    return "책";
  }
});
console.log(book.title);

[실행 결과]
책
```
1. `book.title`을 실행하면 title 프로퍼티에서  
**get 속성**의 존재를 체크
2. 있으면 `get()` 함수를 호출하며  
"책"이 반환되어 출력됨
3. `book.title.get()` 처럼 함수로 호출하면  
*에러가 발생함*
4. ES5의 Descriptor를 참조

- **ES6 형태**
```js
const book = {
  point: 100,
  get getPoint() {
    return this.point;
  }
};
console.log(book.getPoint);

[실행 결과]
100
```
1. `get getPoint(){}` 처럼 `getPoint()` 앞에
**get**을 작성하면 **getter**로 선언
2. `getPoint()` 함수가 자동으로 호출

- **ES6 장점**
  + ES5 처럼 프로퍼티 속성 구조가 아님
  + 작성 편리
  + 다수의 **getter** 사용 가능
```js
const book = {
  get getPoint() {
    return "포인트";
  },
  get getTitle() {
    return "제목";
  }
};
console.log(book.getPoint);
console.log(book.getTitle);

[실행 결과]
포인트
제목
```
1. 다수의 getter 선언 가능

## 2. setter
- 프로퍼티에 값을 할당하면  
  + **setter**로 선언된 함수 자동 호출
  + **값을 설정**하는 시맨틱을 갖고 있으므로  
  **setter 함수**에서 값을 설정해야 함
- *ES5 형태*
```js
var book = {title: "HTML"};
Object.defineProperty(book, "change", {
  set: function(param) {
    this.title = param;
  }
});
book.change = "자바스크립트";
console.log(book);

[실행 결과]
{title: 자바스크립트 }
```
1. `book.change = "자바스크립트"` : 를 실행하면  
**change** 프로퍼티에서  
**set** 속성의 존재 여부를 체크함
2. 있으면 `set()` 함수를 호출함
3. "자바스크립트"를 파라미터 값으로 넘겨 줌

- **ES6 형태**
```js
const book = {
  point: 100,
  set setPoint(param) {
    this.point = param;
  }
};
book.setPoint = 200;
console.log(book.point);

[실행 결과]
200
```
1. `setPoint()` 앞에 **set**을 작성하면  
**setter**로 선언
2. `book.setPoint = 200;`  
**setPoint**에 값을 할당  
`setPoint()`가 자동으로 호출됨
3. 파라미터 값으로 200을 넘겨줌

- **변수값을 함수 이름으로 사용**
```js
const name = "setPoint";
const book = {
  point: 100,
  set [name](param) {
    this.point = param;
  }
};
book[name] = 200;
console.log(book.point);
```
1. `name` 변수값인 `"setPoint"`가  
**함수 이름으로 사용**됨
2. `getter`도 같은 방법으로 사용할 수 있음

- **setter 삭제**
```js
const name = "setPoint";
const book = {
  set [name](param) {
    this.point = param;
  }
};
delete book[name];
console.log(book[name]);

[실행 결과]
undefined
```
1. **delete** 연산자로 **setter를 삭제** 가능