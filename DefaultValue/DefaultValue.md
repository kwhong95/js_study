# Default Value
## Default Value
- 값을 할당하지 않으면 사전에 정의된 값을 할당
  + default value: 사전에 정의된 값
- **할당할 값이 없으면 디폴트 값을 할당**
```js
const [one, two, five = 50] = [10, 20];
console.log(five);

[실행 결과]
50
```
1. `one`에 10을, `two`에 20을 분할 할당함
2. `five`에는 할당할 값이 없으며  
이 때, `five = 50 `에서 **50을 five에 할당**함
3. 이것을 **default value**라고 함
4. `=` 의 **왼쪽에 이름**을 작성하고 **오른쪽에 값**을 작성
  
- **할당할 값이 있으면 디폴트 값을 무시**
```js
const [one, two, five = 50] = [10, 20, 70]
console.log(five);

[실행 결과]
70
```
1. 왼쪽 오른쪽 모두 값이 3개 적용
2. **값(70)**이 있으므로 `five`에 70 할당  
`five = 50` 에서 50을 할당하지 않음
  
- **Object는 프로퍼티 이름으로 체크**
```js
const {one, two = 20} = {one: 10};
console.log(two);

[실행 결과]
20
```
1. 오른쪽 `one`의 값인 10을  
왼쪽의 `one` 프로퍼티 값으로 분할 할당
2. `two`에 할당할 값이 없으며  
`two = 20`에서 20을 `two`에 할당
  
- **디폴트 값 적용 순서**
  + **왼쪽에서 오른쪽**으로 적용
```js
const [one, two = one + 20,
            five = two + 50] = [10];
console.log(two);
console.log(five);

[실행 결과]
30
80
```
1. 오른쪽 `one`의 값인 10을  
왼쪽의 `one` 프로퍼티 값으로 분할 할당
2. 오른쪽에 값이 없으므로 디폴트 값을 할당  
**왼쪽에서 오른쪽으로 할당**
3. `two = one + 20`  
`one`의 값이 10이므로 30이 `two`에 설정됨
4. five = two + 50  
`two`의 값이 30이므로 80이 `five`에 설정됨
  
- **함수의 파라미터**에 디폴트 값 적용
  + 넘겨받은 파라미터 값이 없으면  
  디폴트 값을 할당
```js
const add = (ten, two = 20) => ten + two;
const result = add(10);
console.log(result);

[실행 결과]
30
```
1. `add(10);`  
호출하는 함수의 파라미터 수는 하나임
2. `(ten, two = 20)`  
`ten`에 넘겨받은 10이 설정됨  
`two`에 디폴트 값인 20이 할당됨
3. **디폴트 값을 작성하지 않으면**  
`two`에 `undefined`가 설정된다
  
  + 넘겨받은 파라미터 값이 있으면  
  디폴트 값을 무시
```js
const add = (ten, two = 20) => ten + two;
const result = add(10, 50);
console.log(result);

[실행 결과]
60
```
1. `add(10, 50)`  
두 번째 파라미터에 50을 작성함
2. 호출하는 함수의 파라미터 수와  
호출받는 함수의 파라미터 수가 **같으면**  
*디폴트 값을 적용하지 않는다*
  
  + 호출한 함수의 파라미터 값이  
  `undefined`일 때
```js
const point = () => 20;
const add = (one, two = point()) => one + two;
const result = add(10, undefined);
console.log(result);

[실행 결과]
30
```
1. `add(10, undefined)`  
undefined도 값이지만  
파라미터 값을 넘겨주지 않은 것과 같음
2. `point()` **함수를 호출**하고  
반환된 값을 **디폴트 값**으로 사용