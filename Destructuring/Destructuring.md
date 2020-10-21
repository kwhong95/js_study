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
[one...four] = [1, 2, 3, 4];
console.log([one, two, three, four]);

[실행 결과]
[1, undefined, undefined, 4]
```
1. `[one...four]` 형태에서  
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
