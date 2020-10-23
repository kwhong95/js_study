# Number 오브젝트
## 1. IEEE 754
- IEEE(Institute of Electrical and Electronics Engineers)
- 자바스크립트는 IEEE 754에 정의된  
  + 64bit 부동 소수점으로 수를 처리
    + double-precision floating-point  
    format numbers
  + 64bit로 최소값과 최대값을 처리
- 정수와 실수를 구분하지 않음
  + 1을 1.0으로 처리
  + 1과 1.2를 더할 수 있음
## 2. 64비트 구성
- Sign 비트
  + 63: 1비트
  + 값이 0이면 양수, 1이면 음수
- 지수(exponent)
  + 52~62: 11비트
- 가수(fraction)
  + 0 ~51: 52비트 + 1(Sign 비트): 53비트
![screenshot](./20201022234500.png)
## 3. 값을 구하는 방법
- 비트 값은 0 아니면 1
- 2^승 값을 더해 값을 구함
  + 0비트 부터 1, 1, 1 이면
  + 1(2^0) + 2(2^1) + 4 = 7

  ## 4. Number 상수
|상수 이름|상수 값|
|Number.MAX_SAFE_INTEGER|9007199254740991 (2의 53승 -1)|
|Number.MIN_SAFE_INTEGER|-9007199254740991 (-(2의 53승 -1))|
- **safe integer**란
  + 지수(e)를 사용하지 않고 나타낼 수 있는 값
  + 2의 64승이 아닌 2의 53승
- `Number.MAX_SAFE_INTEGER`
  + **safe integer 최대값**
```js
console.log(Number.MAX_SAFE_INTEGER);

console.log(Math.pow(2, 53) - 1);

[실행 결과]
9007199254740991
9007199254740991
```
- `Number.MIN_SAFE_INTEGER`
  + **safe integer 최솟값**
```js
console.log(Number.MIN_SAFE_INTEGER);

console.log(-(Math.pow(2, 53) - 1));

[실행 결과]
-9007199254740991
-9007199254740991
```

## 5. 진수, EPSILON
#### 5.1 Number.EPSILON
- `Number.EPSILON`
  + 아주 작은 값
  + 2.2204460492503130808472633361816E-16
  + 또는 2^-52
- 사용 사례
  + 미세한 값 차이 형태
```js
const total = 0.1 + 0.2;
console.log(total);
console.log(total === 0.3);

[실행 결과]
0.30000000000000004
false
```
1. 0.1과 0.2를 더했는데  
0.3아 아닌 0.300000...4를 출력
2. 값이 같지 않으므로 `false`가 출력
3. JS가 **부동 소수점 처리**를 하기 때문  
IEEE 754
4. 이처럼 **미세한 값차이**로  
일치하지 않을 때 **EPSILON**을 사용함
  + **미세한 값 차이를 같은 값으로 간주**
```js
const value = Math.abs(0.1 + 0.2 - 0.3);
console.log(value < Number.EPSILON);

[실행 결과]
true
```
1. 값 차이가 `Number.EPSILON` 보다  
작으면 `true`를 반환
  + **0 / 0 으로 NaN이 되는 것을 방지**
```js
console.log(0 / 0);
const value = 0 / (0 + Number.EPSILON);
console.log(value);

[실행 결과]
NaN
0
```
1. 0 / 0 은 `Nan`
2. `(0 + Number.EPSILON)` 처럼  
작은 값을 더해 나누면 0이 됨
3. 0 이므로 후속 처리를 할 수 있음

#### 5.2 진수
- **Binary(2진수)**
  + 0b0101, 0B01010 형태로 작성
  + 숫자 0 다음에 b/B 작성하고  
  이어서 0 또는 1로 값을 작성
```js
const value = 0B111;
console.log(value);

[실행 결과]
7
```
- **Octal(8진수)**
  + 0O0105 형태로 작성
  + 숫자 0 다음에 영문 o/O 작성하고  
  이어서 0~7 로 값을 작성
```js
const value = 0o111;
/// 1 + 8 + 64
console.log(value);

[실행 결과]
73
```
## 6 Number 함수
#### 6.1 isNaN()
