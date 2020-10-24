# 연산자, 기타
## 1. Trailing commas
- **Object** 끝에 콤마 사용
  + } 앞에 콤마 사용 가능
- **배열** 끝에 콤마 사용
  + ] 앞에 콤마 사용 가능
```js
const obj = {
  book: 100,
  point: 200,
};

const list = [100, 200,];
```

## 2. 거듭 제곱
- **거듭 제곱**
```js
console.log(2 ** 3);
console.log(3 ** 2);

console.log(2 ** 3 ** 2);
console.log(2 ** (3 ** 2));
console.log((2 ** 3) ** 2);

[실행 결과]
8
9
512
512
64
```
1. `2 ** 3 ** 2`  
2의 3승의 2승이 아니라
2. 먼저 3의 2승을 구하며 값이 9  
2의 9승 이므로 512

- **좌결 합성**
  + 왼쪽에서 오른쪽으로 계산
  + `1 + 2 + 3은 (1 + 2) + 3`으로 계산
- **우결 합성**
  + 오른쪽에서 왼쪽으로 계산
  + `A ** B ** C`에서 `A ** (B ** C)`로 계산

## 3. try-catch
- `try-catch`의 **catch(error)**에서  
  + `catch`처럼 *(error)* 를 생략 
- `(error)`에서 메세지를 받아  
사용하지 않을 때 편리함
- **타이핑 실수 방지**
```js
const sports = "스포츠";
try {
  sports = "축구";
} catch(error) {
  console.log("(error) 작성");
};
// catch만 작성
try {
  sports = "축구";
} catch {
  console.log("(error) 생략");
};

[실행 결과]
(error) 작성
(error) 생략
```

## 4. 함수 작성 형태
- **Object**에 **함수**를 작성할 때
  + **function 키워드를 작성하지 않음**
```js
const sports = {
  point: 100,
  //ES5 형태
  getValue: function() {
    return this.point;
  },
  //ES6 형태
  getPoint() {
    return this.point;
  }
};
console.log(sports.getPoint());

[실행 결과]
100
```
1. `getPoint() {}`처럼  
function 키워드를 사용하지 않음
  
- 참고 : **Object에 함수를 작성하는 이유**
  + 함수에서 `this`로 **Object 전체** 참조
  + **new 연산자**로 인스턴스를 생성하지 않음  
  + Object 전체가 하나의 묶음  
  **접근성, 가독성**이 좋음
  + `sports`에 시맨틱을 부여할 수 있으며  
  다른 오브젝트와 이름과  
  프로퍼티 이름이 충돌되지 않음