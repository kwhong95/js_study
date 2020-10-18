# cosnt 변수
## 1. const 변수의 특징
> 구문: `name1[= value1][,name2 [=value2]]`
- 값을 바꿀 수 없는 변수 선언
- name1에 변수 이름 작성, 식별자로 사용
```js
const sports = "축구";
try {
  sports = "농구";
} catch(e) {
  console.log("const 할당 불가");
};

[실행 결과]
const 할당 불가
```
1. `const sports = "축구";`
  sports 를 `const로 선언`하고 값 할당
2. `try {sports = "농구";`
  `try 블록`도 별도의 스코프지만 `const, let`을 작성하지 않으므로
3. sports 변수에 값을 할당하게 된다.
  sports가 const 변수이므로 `에러 발생`

- value1, value2에 초기값 작성
  + 반드시 값을 작성, 변수 선언만 불가
  + 표현식 작성 가능, 평가 결과 사용
- JS에서 상수는 대문자 사용이 관례
```js
const bonus = 100;
const POINT = 200;
```
1. const가 상수이지만
  값 형태에 따라 바꿀 수도 있음
2. `const POINT = 200;`
  대문자 사용이 코딩 관례
- 우선 let이 아닌 const 사용 가능을 검토
> 변수 선언 우선순위: `const` > `let` > `var`

#### const 변수 전체를 바꿀 수 없지만
- Object의 프로퍼티 값을 바꿀 수 있음
```js
const book = {title: "책"};
try {
  book = {title: "음익 책"};
} catch(e) {
  console.log("const 전체 할당 불가");
};
book.title = "미술 책";
console.log(book.title)

[실행 결과]
const 전체 할당 불가
미술 책
```
1. `book = {title: "음악 책};`
  book에 값을 할당하면 `에러 발생`
  book 전체를 바꿀 수 없음
2. `book.title = "미술 책";`
  프로퍼티 값은 변경 가능
3. const 변수의 변경 불가는
  book에 값을 할당하는 것을 의미

- 배열의 엘리먼트 값도 바꿀 수 있음
```js
const book = ["책"];
try {
  book = ["음악 책"];
} catch(e) {
  console.log("const 전체 할당 불가");
};
book[0] = "미술 책";
console.log(book[0]);

[실행 결과]
const 전체 할당 불가
미술 책
```
1. `book = ["음악 책"];`
  book에 값을 할당하면 에러 발생
2. `book[0] = "미술 책";`
  엘리먼트 값은 변경 가능