# Destructuring
## 1. Destructuring Assignment(분할 할당)
- 사전적 의미
  + ~구조를 파괴하다
  + 파괴, 해체는 있는 것이 없어지는 뉘앙스
  + 원 데이터는 변경되지 않음
- **작성 형태**
```js
let one, two, three;
const list = [1, 2, 3];
[one, two, three] = list;
console.log(one);
console.log(two);
console.log(three);
console.log(list);

[실행 결과]
1
2
3
[1, 2, 3]
```
> 위의 관점으로 보면 **분할**/**분리**에 가까움

#### 1.1 Array 분할 할당
- **배열**의 엘리먼트를 분할하여 할당
  + **인덱스에 해당하는 변수에 할당**
  ```js
  let one, two, three;
  [one, two, three] = [1, 2, 3];
  console.log(one);
  console.log(two);
  console.log(three);
  
  [실행 결과]
  1
  2
  3
  ```
1. 왼쪽 인덱스에 해당하는  
  오른쪽 배열의 값을 변수에 할당
2. one에 1, two에 2, three 3이 할당
  + **할당받을 변수 수가 적은 경우**
  ```js
  let one, two;
  [one, two] = [1, 2, 3];
  console.log(one);
  console.log(two);

  [실행 결과]
  1
  2
  ```
1. 왼쪽 할당받을 변수가 2개이고  
오른쪽에 분할 할당할 값이 3개임
2. 왼쪽의 변수 인덱스에 맞추어  
값을 할당하므로 *3은 할당되지 않음*
  + **할당받을 변수가 많은 경우**
```js
let one, two, three, four;
[one, two, three, four] = [1, 2, 3];
console.log(three);
console.log(four);

[실행 결과]
3
undefined
```
1. 왼쪽의 할당받을 변수가 4개이고  
  오른쪽에 분할 할당할 값이 3개
2. 왼쪽에 값을 할당할 수 없는 변수에  
`undefined`가 설정
  + **배열 차원에 맞추어 분할 할당**
```js
let one, two, three, four;
[one, two, [three, four]] 
                    = [1, 2, [3, 4]];
console.log([one, two, three, four]);

[실행 결과]
[1, 2, 3, 4]
```
1. [three, four] 와 [3, 4]가 배열
2. 배열 차원이 **변환**됨
  + 매치되는 인덱스에 *변수가 없으면*  
  값을 *할당하지 않음*
```js
let one, two, three, four;
[one, , ,four] = [1, 2, 3, 4];
console.log([one, two, three, four]);

[실행 결과]
[1, undefined, undefined, 4]
```
1. `[one, , , four]` 형태에서  
콤마로 구분하고 *변수를 작성하지 않음*
2. 인덱스를 *건너 띄어 할당*함
3. `one`에 1 할당  
2와 3은 건너 띄고 `four`에 4를 할당함
  
- **spread**와 같이 사용
  + 나머지를 전부 할당
```js
let one, rest;
[one, ...rest] = [1, 2, 3, 4];
console.log(one);
console.log(rest);

[실행 결과]
1
[2, 3, 4]
```
1. `one`에 1을 할당하고  
2. 나머지 2, 3, 4를 `rest`에 **배열**로 할당
3. **rest 파라미터**를 호출받는 함수의 파라미터에  
  작성하지만, **나머지**라는 시맨틱이 강해서  
  코드처럼 사용하기도 함
4. 분리하지 않고 **결합된 상태**를 설정하므로  
어긋나지 않음
  + 인덱스를 반영한 **나머지** 할당
```js
let one, three, rest;
[one, , three, ...rest]
                    = [1, 2, 3, 4, 5];
console.log(three);
console.log(rest);

[실행 결과]
3
[4, 5]
```
1. one에 1을 할당
2. 2는 건너띄고 three에 3을 할당
4. 나머지 [4, 5]를 rest에 할당

#### 1.2 Object 분할 할당
- **Object의 프로퍼티**를 분할하여 할당
- 프로퍼티 이름이 같은  
프로퍼티에 값을 할당
```js
const {one, two} = {one: 10, two: 20};
console.log(one);
console.log(two);

[실행 결과]
10
20
```
1. 왼쪽의 Object가  
{name: value} 형태가 아닌  
프로퍼티 이름만 작성했음
2. 프로퍼티 이름이 같은  
오른쪽 프로퍼티 값을
왼쪽의 프로퍼티 값으로 할당
3. one에 10, two에 20을 할당함  
{one: 10, two: 20} 형태가 됨
- 프로퍼티 이름을 **별도로 작성**
```js
let one, two;
({one, two} = {one: 10, two: 20});
console.log(one);
console.log(two);

[실행 결과]
10
20
```
1. `let one, two;`  
프로퍼티 이름을 앞에 별도로 작성함
2. `({one, two} = {one: 10, two: 20});`  
전체를 소괄호 () 안에 작성해야 함
  
- **프로퍼티 값 위치에 변수 이름 작성**
```js
let five, six;
({one: five, two: six} = {one: 5, two: 6});
console.log(five);
console.log(six);
//console.log(one);

[실행 결과]
5
6
```
1. 이름을 별도로 선언하였으므로  
소괄호 () 안에 작성함
2. 오른쪽 one 프로퍼티 값 **5를 five**에 할당함
3. 오른쪽 two 프로퍼티 값 **6을 six**에 할당함
4. `console.log(one)`을 실행하면 *ReferenceError*  
프로퍼티 이름으로 값을 구할 수 없음
5. five와 six 변숫값을 구하는 것이 목적이다
  
- **Object 구조에 맞추어 값 할당**
```js
const {one, plus: {two, three}}
        = {one: 10, plus: {two:20, three:30}};
console.log(one);
console.log(two);
console.log(three);
// console.log(plus);

[실행 결과]
10
20
30
```
1. `plus: {two: 20, three: 30}`  
`plus`는 **구조(경로)**를 만들기 위함
2. 왼쪽 `plus`가 있고 two가 있으면  
two 프로퍼티 값에 20을 할당함
3. 구조가 같지 않으면 실행할 때 *에러 발생*
4. `console.log(plus`)  
plus는 구조(경로)를 만들기 위한 것으로  
**실제로 존재하지 않음**
5. plus가 없으므로 *ReferenceError 발생*
6. 할당한 후, 이름으로 값을 구할 수 있음
  
- **나머지를 Object로 할당**
```js
const {one, ...rest}
        = {one: 10, two: 20, three: 30};
console.log(rest);
[실행 결과]
{two: 20, three: 30}
```
1. rest에 **나머지 Object**를 할당함

#### 1.3 파라미터 분할 할당
- 호출하는 함수에서  
**Object** 형태로 **넘겨준 파라미터 값**을  
호출받는 **함수의 파라미터에 맞추어** 할당
```js
function add({one, two}) {
  console.log(one + two);
};
add({one: 10, two: 20});

[실행 결과]
30
```
1. 호출하는 함수에서 넘겨준 `one`과 `two`를  
호출받는 **함수의 프로퍼티 이름에 맞추어**  
프로퍼티 값을 분할 할당함
  
- **Object 구조에 맞추어 값을 할당**
```js
function add({one, plus: {two}}) {
  console.log(one + two);
};
add({one: 10, plus: {two: 20}});

[실행 결과]
30
```
1. 호출하는 함수에서 넘겨준  
**Object 구조와 프로퍼티에 맞추어**  
프로퍼티 값을 할당함

## 2. Object 오퍼레이션
- 같은 프로퍼티 이름 사용
```js
const value = {book: 10, book: 20};
console.log(value);

[실행 결과]
{book: 20}
```
1. `{book: 10, book: 20}`에서  
프로퍼티 이름인 book이 같음
2. ES5 strict 모드에서  
이름이 같으면 *에러가 발생*
3. ES6 부터는 strict 모드에 관계없이  
에러가 발생하지 않음  
뒤에 작성한 프로퍼티 값으로 **대체**됨
  
- **Shorthand property names**
```js
const one = 10, two = 20;
const value = {one, two};
console.log(values);

[실행 결과]
{one: 10, two: 20}
```
1. one과 two 변수에 값을 작성
2. {one, two} 형태로 values에 할당
3. one이 프로퍼티 이름이 되고  
10이 프로퍼티 값으로 할당됨

## 3. 프로퍼티 이름 조합
- **문자열을 프로퍼티 이름으로 사용**
```js
const value = {
  ["one" + "two"] : 12
};
console.log(value.onetwo);

[실행 결과]
12
```
1. [] 안에 **문자열**로 이름을 작성
2. `"one"` 과 `"two"`를 **연결**하여  
`onetwo`를 프로퍼티 이름으로 사용
  
- **변숫값을 프로퍼티 이름으로 사용**
```js
const item = "world";
const sports = {
  [item] : 100,
  [item + "Cup"] : "월드컵",
  [item + "Sports"] : function() {
    return "스포츠";
  }
};
console.log(sports[item]);
console.log(sports[item + "Cup"]);
console.log(sports[item + "Sports"]());

[실행 결과]
100
월드컵
스포츠
```
1. 변수값을 프로퍼티 이름으로 사용함
2. 변수값과 문자열을 연결할 수 있음
3. 프로퍼티 이름에 공백이 있는 것이 어색하지만  
공백을 넣을 수도 있음
4. 함수로도 호출이 가능함  
변수값에 따라 함수 이름을 정의할 수 있음
  
- **분할 할당을 조합한 형태**
```js
const item = "book";
const result = {[item]: title}
                  = {book: "책"};
console.log(result);

[실행 결과]
{book: "책"}
```
1. **변수값을 프로퍼티 이름으로 사용**하고  
분할 할당한 형태
2. `{[item]: title}`  
  `{book: title}` 형태가 됨  
3. `{book: "책"}`  
`{book: title}`에 "책"이 할당됨