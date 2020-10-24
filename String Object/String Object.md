# String Object
## 1. Unicode
- 유니코드는  U+0031 형태
- 코드 포인트(code point)
  + 0031 이 코드 포인트
  + 문자 코드라고도 부름
  + 코드 포인트로 문자/이모지 등을 표현
  + 4자리 이상의 UTF-16 진수 형태
- 110만개 정도 표현
  + U+0000 ~ U+1FFFF
  
#### 1.1 Unicode 용어
- **Plane(평면)**
  + 코드 포인트 전체를 17개 plane으로 나눔
  + 하나의 plane은 65535(U+FFFF)개
- **첫 번째 plane**
  + BMP(Basic Multillingual Plane)라고 부름
  + **일반적인 문자(영문자, 숫자)**가 여기에 속함
  + 한글 코드 포인트도 여기에 속함
- **첫 번째 plane을 제외한 plane**
  + Supplementary plane, Astral plane이라고 부름
  + **5자리 이상의 코드 포인트**를 표현할 수 있음
  + ES6+에서 지원
- **이스케이프 시퀀스(Escape Sequence)**
  + 역슬래시와 **16진수**로 값을 작성
  + 이를 16진수 이스케이프 시퀀스라고 부름
```js 
const escape = "\x31\x32\x33"
console.log(escape);
console.log("\\");

[실행 결과]
123
\
```
1. 역슬래시가 에디터에 `"\"` 형태로 표시됨
2. x를 소문자로 작성해야 함
3. JS 코드에서 역슬래시를 표시하려면  
**역슬래시를 2개 작성**해야 함
  
- **유니코드 이스케이프 시퀀스**
  + Unicode Escape Sequence
  + 이스케이프 시퀀스를  
  **유니코드**로 작성한 형태
```js
const escape = "\x31\x32\x33";
console.log(escape);
const unicode = "\u0034\u0035\u0036"; // 역슬레시 다음 u를 작성
console.log(unicode);

[실행 결과]
123
456
```
- UES값 범위
  + UTF-16 진수로  
  U+0000에서 U+FFFF까지 사용가능

- ES5문제
  + U+FFFF보다 큰 코드 포인트는  
  어떻게 작성할 것인가?
- 유니코드 코드 포인트 이스케이프
  + 코드 포인트 값에 관계없이  
  사용할 수 있는 형태 필요
  + \u{31}, \u{1f418} 형태
```js
const unicode = "\u0031\u0032\u0033";
console.log(unicode);
const es6 = "\u{34}\u{35}\u{36}";
console.log(es6);
//코끼리 이모지
console.log("\u{1f418}"); //중괄호 안에 코드포인트 작성

[실행 결과]
123
456
`코끼리 그림`
```
#### 1.2 ES5 호환성
- **Surrogate pair**
  + \u{1f418} 형태를 ES5에서 사용 불기
  + ES5에서는 두 개의  
  유니코드 이스케이프 시퀀스 사용
  + 이를 Surrogate pair라고 함
```js
// "\uD83D"와 "\uDC18"을 연결하여 작성
const pair = "\uD83D\uDC18";
console.log(pair);

[실행 결과]
`코끼리 그림`
```
- Surrogate pair 계산 방법
  + 스펙에 정의됨 (6.1.4)
  
- 유니코드 사용의 참조 사항
  + 브라우저, 스마트폰에 따라  
  표시되는 문자 모습이 다름
  + (https://unicode-table.com)
## 2. Unicode 함수
#### 2.1 fromCodePoint()
|구분| 데이터(값)|
|---|---|
|형태| `String.formCodePoint()`|
|파라미터| 코드포인트, `num1[, ...[, numN]]`|
|반환| 코드 포인트에 해당하는 문자로 변환|
- 유니코드의 코드 포인트에 해당하는 문자 반환
- 파라미터에 다수의 코드 포인트 작성 가능
  + 문자를 연결하여 반환
```js
const point = String.fromCodePoint;
console.log(point(49, 50, 51));
console.log(point(44032, 44033));

console.log(point(0x31, 0x32, 0x33));
console.log(point(0x1F428));

[실행 결과]
123
가각
123
`코끼리 그림`
```
1. 49, 50, 51  
코드 포인트를 **10진수**로 작성한 형태
2. 0x31, 0x32, 0x33  
코드 포인트를 **16진수**로 작성한 형태
  
- ES5의 `fromCharCode()` 사용
  + **Surrogate pair**로 작성
```js
console.log(String.fromCharCode(0x1f418));
console.log(String.fromCharCode(0xD83D, 0xDC18));

[실행 결과]
`네모`
`코끼리 그림`
```
1. `fromCharCode()`에서는  
`0x1f418` 형태를 지원하지 않으므로
2. `fromCharCode(0xD83D, 0xDC18)`처럼  
Surrogate pair로 작성함

#### 2.2 codePointAt()
|구분|데이터(값)|
|---|---|
|형태| `String.prototype.codePointAt()`|
|파라미터|유니코드로 변환할 문자열의 인덱스|
|반환|코드 포인트 값|
- 대상 문자열에서  
  + 파라미터에 작성한 인덱스 번째 문자를
  + 유니코드 코드 포인트로 변환하여 반환
  + 코드 포인트는 UTF-16으로 인코딩된 값
```js
const result = "가나다".codePointAt(2);
console.log(result);
console.log(typeof result);

console.log("가나다".codePointAt(3));
console.log(String.fromCodePoint(result));

[실행 결과]
45796
number
undefined
다
```
1. `"가나다".codePointAt(2)`  
문자열 "가나다"에서 3번째의  
코드 포인트를 구해 반환함
2. 반환된 코드 포인트 타입은 **number** 이다
3. 인덱스 번째에 문자가 없으면  
**undefined**를 반환함
4. `codePointAt(2)`의 값은 45796이고  
`fromCodePoint(45796)`의 값은 "다" 이다

#### 2.3 정리
- 요구 사항
  + `String.fromCodePoint(49, 50)`와
  + `"123".codePoint(1)`은 형태가 다르다
  + 형태를 다르게 한 것은 무엇 때문일까?
- JavaScript 설계 관점
  + `String.fromCodePoint(49, 50)`
    + 직접 호출하는 함수 형태
    + 파라미터에 다수 작성
  + `"123".codePointAt(1)`
    + `String.prototype.codePointAt()` 호출
    + **prototype**을 사용한 메소드 형태
    + 파라미터에 인덱스 하나만 작성
  + [1, 2, 3] 으로 작성하면 어떻게 될까?
  + `codePointAt()`은 값을 구하는 대상이 있지만  
    + `fromCodePoint()`는 대상이 없음
- 다양한 생각의 접근을 필요로 함

#### 2.4 nomalize()
|구분|데이터(값)|
|---|---|
|형태| `String.prototype.nomalize()`|
|파라미터|정규화 형식, 디폴트: NFC|
|반환|변환된 문자열|
- 대상 문자열을 파라미터에 지정한  
  + 유니코드 정규화 형식으로  
  변환하여 반환
- 유니코드 정규화 방식
  + NFC, NFD, NFKC, NFKD
  + http://www.unicode.org/reports/tr15/
```js
console.log("ㄱ".codePointAt().toString(16));
console.log("ㅏ".codePointAt().toString(16));
console.log("\u{3131}\u{314F}");

[실행 결과]
3131
314f
ㄱㅏ
```
1. ㄱ과 ㅏ의 코드 포인트를 16진수로 구함
2. ㄱ과 ㅏ의 코드 포인트를 연결하여 작성
3. "가"로 표시되지만 어색함
  
```js
const point = "\u{3131}\u{314F}";
console.log(point.nomalize("NFC"));
console.log(point.nomalize("NFD"));

console.log(point.nomalize("NFKD"));
console.log(point.nomalize("NFKC"));

[실행 결과]
ㄱㅏ
ㄱㅏ
가
가
```
1. NFC와 NFD는 단지 연결하여 어색하지만
2. NFKD와 NFKC는 모아 쓴 형태로 표시

## 3. 시작/끝 체크 복제
#### 3.1 startsWith()
|구분|데이터(값)|
|---|---|
|형태|`String.prototype.startsWith()`|
|파라미터|비교 문자열 / 비교 시작 인덱스(opt) / 디폴트: 0|
|반환| 시작하면 true, 아니면 false|
- 대상 문자열이  
  + 첫 번째 파라미터의 문자열로  
  시작하면 `true`, 아니면 `false`반환
  + 정규 표현식 사용 불가
```js
const target = "ABC";
console.log(target.startsWith("AB"));
console.log(target.startsWith("BC"));

console.log(/^AB/.test(target));

[실행 결과]
true
false
true
```
1. `"AB"`로 시작하므로 `true`를 반환
2. `"BC"`가 있지만 시작이 아니므로 `false`
3. 정규 표현식의 `^`과 같음
  
- 두 번째 파라미터
  + 선택이며, 비교 시작 인덱스 작성
```js 
const target = "ABCD";
console.log(target.startWith("BC", 1));
console.log(target.startWith("BC", 2));

[실행 결과]
true
false
```
1. `"BC"`가 중간에 있지만
2. 시작 인덱스가 1이므로 `true`를 반환

#### 3.2 endWith()
|구분| 데이터(값)|
|---|---|
|형태| `String.prototype.endsWith()`|
|파라미터| 비교 문자열 / 사용 문자열 길이(opt) / 디폴트: 문자열 전체|
|반환| 끝나면 true, 아니면 false|
- 대상 문자열이
  + 첫 번째 파라미터의 문자열로  
  끝나면 `true`, 아니면 `false` 반환
```js 
const target = "ABC";
console.log(target.endsWith("BC"));
console.log(target.endsWith("AB"));

console.log(/BC$/.test(target));

[실행 결과]
true
false
true
```
1. `"BC"`로 끝나므로 `true`를 반환
2. `"AB"`가 있지만 끝이 아니므로 `false`
3. 정규 표현식의 `$`와 같음
- 두 번째 파라미터
  + 선택이며, 사용할 문자열 길이 지정
```js
const target = "ABC";
console.log(target.endsWith("AB", 2));

[실행 결과]
true
```
1. `"AB"`로 끝나지 않지만
2. 대상 문자열을 3자리가 아닌  
2자를 사용하므로  
즉, `"AB"`만 사용하므로 `true`를 반환
  
#### 3.3 repeat()
|구분|데이터(값)|
|---|---|
|형태|`String.prototype.repeat()`|
|파라미터|**복제**할 수(opt) / 디폴트: 0|
|반환| **복제**하여 만든 문자열|
- 대상 문자열을
  + 파라미터에 작성한 수만큼  
  **복제**, **연결**하여 반환
```js
const target = "ABC";
console.log(target.repeat(3));
console.log(target.repeat(0));
console.log(target.repeat());
console.log(target.repeat(2.7));

[실행 결과]
ABCABCABC
""
""
ABCABC
```
1. `repeat(3)`
"ABC"를 3번 복제하고 연결하여 반환
2. 파라미터를 작성하지 않거나 0을 작성하면  
빈문자열 반환
3. 2.7에서 0.7을 무시하고 2를 사용

#### 3.4 includes()
|구분| 데이터(값) |
|---|---|
|형태|`String.prototype.includes()`|
|파라미터|존재 여부 비교 문자열 / 비교 시작 인덱스(opt) / 디폴트: 0|
|반환| 존재하면 true 아니면 false|
- 대상 문자열에
  + 첫 번째 파라미터의 문자열이 있으면 `true`  
  없으면 `false` 반환
```js
const target = "123"
console.log(target.includes("1")); 

console.log(target.incluedes(12));
console.log(target.incluedes("13"));

[실행 결과]
true
true
false
```
- 첫 번째 파라미터
  + 숫자이면 문자열로 변환하여 체크
- 두 번째 파라미터(선택)
  + 비교 시작 인덱스 작성
```js
const target = "ABC";
console.log(target.includes("A", 1));

try { 
  result = target.includes(/^A/);
} catch(e) {
  console.log("정규 표현식 사용 불가");
};

[실행 결과]
false
정규 표현식 사용 불가
```
1. "A"가 있지만 0번 인덱스에 있음
2. 1번 인덱스부터 비교하므로 존재하지 않음
