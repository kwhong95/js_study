# Template Literal
```js
Stntax: 
`문자열`
`문자열 ${표현식} 문자열`
tag `문자열 ${표현식} 문자열`
```

- **Template Literal**
  + **문자열 처리**를 위한 리터럴
  + 표현식을 포함할 수 있음
- **backtick** 안에 표현식 작성
  + 표현식을 `${표현식}` 형태로 작성
```js
console.log(`ABC`);
const one = 1, two = 2;
const result = `1 + 2는 ${one + two}이 된다`;
console.log(result);

[실행 결과]
ABC
1 + 2는 3이 된다
```
1. **백틱(``)** 안에 문자열을 작성함  
문자열이 그대로 문자열로 출력됨
2. `${one + two}`  
템플릿에 표현식을 작성함
3. 아래 방법으로 표현식을 평가함
- one에 one 변수값 1을,  
two에 two 변수값 2를 설정함
- one의 값과 two의 값을 더해  
표현식 위치에 설정함
4. 템플릿의 모든 **공백**이 그대로 반영

- **줄 바꿈 작성 차이**
```js 
console.log("ES5-1라인\n2라인");
```
1. ES5 형태로 문자열 중간에서
- 줄을 바꾸려면 `\n`을 작성함

```js
console.log(`1라인
    2라인`);
```
1. **Template 리터럴 사용**
2. ES5 처럼 \n을 사용하지 않고  
- **백틱 안**에서 줄을 바꿈
- 줄 앞에 공백을 작성하면 공백으로 처리됨

## 1. Tagged Template
- **tagged Template**
  + 템플릿에 함주 이름 작성한 형태
- 호출되는 함수를  
**태그 함수(tag function)**라고 부름
- `show()` 함수를 호출하면서
  + 문자열을 배열로 파라미터로 넘기고
  + 표현식 결과를 하나씩 파라미터로 넘김
```js
const one = 1, two = 2;
const show = (text, value) => {
  console.log(`${text[0]}${value}`);
  console.log(text[1]);
};
show `1 + 2 = ${one + two}`;

[실행 결과]
1 + 2 = 3
""
```
1. **Template**에서 **문자열**과 **표현식** 분리함
2. `"1 + 2 ="`가 문자열이고  
`${one + two}`가 표현식이며 평가하면 3이 됨
3. `show()` 함수를 호출함
4. 문자열을 배열로 넘겨 줌  
왼쪽에서 오른쪽으로 배열 엘리먼트로 추가  
마지막에 빈 문자열을 엘리먼트로 추가
5. 표현식은 평가 결과를 넘겨 줌
6. `log(text[1])`  
호출하는 함수에서 넘겨 준 빈 문자열  
`text[1]`이 없으면 **undefined**가 출력됨
  
- 호출하는 곳에서
  + 표현식을 평가한 값을 다수 넘겨줄 때
  + 태그 함수에 대응하는  
  파라미터 이름을 작성한 형태
- **문자열을 분리**하면
  + `["1+2=", "이고 1-2=", "이다"]`
  + 3개의 배열 엘리먼트가 됨
- **표현식을 분리**하면
  + `${one + two}`와 `${one - two}`
- show 태그 함수 호출
```js
const one = 1, two = 2;
const show = (text, plus, minus) => {
  console.log(`${text[0]}${plus}`);
  console.log(`${text[1]}${minus}`);
  console.log(`${text[2]}${text[3]}`);
};
show `1+2=${one+two}이고 1-2=${one-two}이다`;

[실행 결과]
1+2=3
이고 1-2=-1
이다undefined
```
1. **text 파라미터**는  
`["1+2=", "이고 1-2=", "이다"]`  
끝에 문자열이 있으면  
4번째에 빈 문자열이 설정되지 않음
2. `plus` 파라미터는 3
3. `minus` 파라미터는 -1

- 태그 함수에 **Rest 파라미터** 작성
- 문자열을 분리하면
  + ["1+2=", 이고 1-2=", "이다"]
  + 3개의 배열 엘리먼트가 됨
- 표현식을 분리하면
  + ${one + two}와 ${one - two}
  + [3, -1]
- show 태그 함수를 호출
```js
const one = 1, two = 2;
const show = (text, ...rest) => {
  console.log(`${text[0]}${rest[0]}`);
  console.log(`${text[1]}${rest[1]}${text[2]}`);
};
show `1+2=${one+two}이고 1-2${one-two}이다`;

[실행 결과]
1+2=3
이고 1-2=-1이다
```
1. text 파라미터는  
["1+2=", "이고 1-2=", "이다"]
2. rest 파라미터는 [3, -1]

## 2. String.raw
|구분|데이터(값)|
|---|---|
|형태|String.raw `templateString`|
|반환|반환 형태(opt)|

- String 오브젝트에 속하지만
  + Template을 사용하므로 여기서 다룸
- `String.raw`에
  + **이어서 Template 작성**
```js
const one = 1, two =2;
const result = String.raw `1+2=${one+two}1`;
console.log(result);

[실행 결과]
1+2=3
```
1. one에 1을, two에 2를 설정함
2. 표현식을 평가하고 결과를  
표현식 위치에 설정함
  + **줄 바꿈을 문자로 처리**
```js
console.log(`one\ntwo`);
console.log(String.raw `one\ntwo`);

[실행 결과]
one
two
one\ntwo
```
1. `역슬래시()`를 특수 문자가 아니라  
일반 문자로 처리함
2. `\n`을 일반 문자로 처리하므로  
줄을 바꾸지 않음
  + **유니코드의 코드 포인트 처리**
```js
console.log(`\u{31}\u{32}`);
console.log(String.raw `\u{31}\u{32}`);

[실행 결과]
12
\u{31}\u{32}
```
1. 역슬래시()에 이어서 유니코드를 작성함  
코드 포인트 값을 문자로 반환함
2. 역슬래시()를 **일반 문자로 처리**하므로  
유니코드를 변환하지 않고 문자로 출력함

## 3. String.raw() => 함수
|구분|데이터(값)|
|---|---|
|형태|`String.raw()`|
|파라미터|(raw: 값) 형태/ 조합할 값|
|반환| 반환 형태(opt)|
- raw의 "문자열"을 문자 하나씩 전개하면서
  + 두 번째 파라미터부터 조합하고 연결
  + **문자열**
```js 
const one = 1, two = 2;
console.log(String.raw({raw: "ABCD"}, one, two, 3));

[실행 결과]
A1B2C3D
```
1. A를 반환 버퍼에 넣고
2. `raw()`의 2번째 파라미터 값을 버퍼에 첨부  
즉, one 변수값인 1을 첨부하며 A1이 됨
3. B를 반환 버퍼에 끝에 첨부함
4. `raw()`의 3번째 파라미터 값을 버퍼에 첨부  
즉, two 변수값인 2를 첨부함
5. 현재까지 모습은 A1B2
6. C를 반환 버퍼 끝에 첨부함
7. 4번째 파라미터 값인 3을 버퍼에 첨부
8. D를 반환 버퍼 끝에 첨부함  
5번째 파라미터는 값이 없어서 첨부하지  
않는 것이 아니라 값 자체를 첨부하지 않음
9. 조합한 결과를 반환
  + **배열**
```js
const rawValue = {raw: ["A", "B", "C"]};
console.log(String.raw(rawValue, 1, 2, 3));

[실행 결과]
A1B2C
```
1. `A${1}B${2}C`
2. C 뒤에는 표현식이 없는 것으로 처리함  
따라서 3이 첨부되지 않음
  
- 첫 번째 파라미터는 `{raw: 값}` 형태
- 두 번째 파라미터부터 조합할 값 작성
  + `({raw: "ABCD"}, 1, 2, 3)`