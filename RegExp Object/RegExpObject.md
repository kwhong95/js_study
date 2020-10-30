# RegExp 오브젝트
## 1. lastIndex
- 정규 표현식 사용 형태
```js
const value = "ABC";
const obj = new RegExp("A", "g");
console.log(obj.text(value));
const reg = /A/g;
console.log(reg.test(value));

[실행 결과]
true
true
```
1. `const obj = new RegExp("A", "g")`
**RegExp 인스턴스**를 생성함  
A로 매치 대상에 매치함
g 플래그는 모두 매치함
2. `obj.test(value)`  
obj에 설정된 A를 ABC에 매치하며  
A가 있으므로 `true`를 반환
3. `const reg = /A/g`  
정규 표현식 리터럴을 사용한 형태임
new 연산자를 사용하지 않았을 뿐, 1번과 같음

- 매치 시작 위치를  
  + lastIndex 프로퍼티에 설정
  + 디폴트 값: 0
- g 플래그를 사용하면  
  + lastIndex 프로퍼티 위치부터 매치
  + `const value = "ABABA"`, `obj = /B/g`
```js 
const value = "ABABA", obj = /B/g;
console.log(obj.test(value) + ": " + obj.lastIndex);
console.log(obj.test(value) + ": " + obj.lastIndex);
console.log(obj.test(value) + ": " + obj.lastIndex);

[실행 결과]
true: 2
true: 4
false: 0
```
1. `obj.text(value)`  
B가 ABABA에 있으므로 매치되며 `true` 반환
2. `obj.lastIndex`  
lastIndex 값으로 2가 출력됨
B가 매치된 인덱스는 1이며 1을 더한 값임  
2가 다음에 매치를 시작할 위치임
3. `obj.text(value)`  
lastIndex 값이 2이므로  
대상 문자열의 2번 인덱스부터 B를 매치함
4. `obj.lastIndex`  
lastIndex 값으로 4가 출력됨  
B가 매치된 인덱스는 3이며 1을 더한 값임
5. g 플래그는 매치가 되면  
lastIndex 값에 1을 더함
6. `obj.test(value)`  
대상 문자열의 4번 인덱스부터 B를 매치하며  
매치가 되지 않아 `false`가 출력됨
7. `obj.lastIndex`  
매치가 되지 않으면 lastIndex 값은 0이 됨

- g 플래그를 사용하지 않으면
  + lastIndex 프로퍼티 값이 바뀌지 않음
  + lastIndex 값을 지정해도  
  적용되지 않고 0번 인덱스부터 매치
```js
const value = "ABABA", obj = /B/;
console.log(obj.test(value) + ": " + obj.lastIndex);
console.log(obj.test(value) + ": " + obj.lastIndex);

[실행 결과]
true: 0
true: 0
```
1. `obj = /B/`  
g 플래그를 사용하지 않음
2. `obj.test(value)`  
B가 ABABA에 있으므로 매치되며 true 반환  
3. `obj.lastIndex`  
lastIndex 값으로 0이 출력됨  
0은 디폴트 값으로 값이 바뀌지 않음
4. `obj.test(value)`  
매치가 되어 true가 출력됨
5. `obj.lastIndex`  
lastIndex 값으로 0이 출력됨

```js
const value = "ABACC", obj = /B/;
console.log(obj.test(value) + ": " + obj.lastIndex);
obj.lastIndex = 2;
console.log(obj.test(value) + ": " + obj.lastIndex);
console.log(obj.test(value) + ": " + obj.lastIndex);

[실행 결과]
true: 0
true: 2
true: 2
```
1. `true: 0`  
매치가 되었으므로 1이 출력되어야 함
2. `obj.lastIndex = 2`  
lastIndex에 2를 설정했으므로
3. `obj.test(value)`  
2번 인덱스부터 매치를 해야 하지만  
0번 인덱스부터 매치함
4. 2번 인덱스부터 매치하면  
B가 없으므로 `false`가 반환됨

## 2. y 플래그
- lastIndex 위치에 매치
  + lastIndex 부터가 아니라  
  lastIndex 위치에 매치
  + 매치되면 lastIndex 값이 1 증가
  + `const value = "AABBA", obj = /A/y`
```js
const value = "AABBA", obj = /A/y;
console.log(obj.test(value) + ": " + obj.lastIndex);
console.log(obj.test(value) + ": " + obj.lastIndex);
console.log(obj.test(value) + ": " + obj.lastIndex);

[실행 결과]
true: 1
true: 1
false: 0
```
1. g 플래그를 사용하지 않았음
2. `obj.text(value)`  
A가 매치되어 `true`가 출력됨
3. lastIndex의 디폴트 값이 0이므로  
0번 인덱스의 A에 매치한 것
4. `obj.lastIndex`  
1이 출력되며, 매치된 인덱스 1을 더한 값  
y 플래그는 매치가 되면 lastIndex에 1을 더함
5. `obj.text(value)`  
A가 매치되어 true가 출력됨  
1번 인덱스의 A에 매치한 것임
6. `obj.lastIndex`  
2가 출력되며 매치된 인덱스에 1을 더한 값
7. `obj.test(value)`  
A가 매치되지 않아 false가 출력됨
8. 4번 인덱스에 A가 있지만  
2번 인덱스에 매치하며  
2번 인덱스 값이 B이므로 매치되지 않음
9. `obj.lastIndex`  
매치되지 않으면 lastIndex 값이 0이 됨

- `lastIndex` 값을 지정할 수 있음
```js
const value = "AABBA", obj = /A/y;
console.log(obj.sticky);
obj.lastIndex = 4;
console.log(obj.test(value) + ": " + obj.lastIndex);

[실행 결과]
true
true: 5
```
1. `obj.sticky`  
y플래그를 사용하면  
sticky 프로퍼티에 true가 설정됨
2. `obj.lastIndex = 4`  
lastIndex 프로퍼티 값에 4를 할당했으므로  
4번 인덱스의 문자에 매치하게 
3. `obj.test(target)`  
4번 인덱스에 A가 있으므로  
매치가 되어 true가 출력됨
4. `obj.lastIndex`  
1이 증가된 5가 출력됨

## 3. u 플래그
- 정규 표현식의 패턴을
  + 유니코드의 코드 포인트로  
  변환하여 매치
  + unicode 프로퍼티에 true 설정
```js
const obj = new RegExp("\u{31}\u{32}", "u");
console.log(obj.test("12"));
console.log(obj.unicode);
console.log(/\u{1f418}/u.test("🐘"));

[실행 결과]
true
true
true
```
1. `new RegExp("\u{31}\u{32}", "u")`  
패턴을 코드 포인트로 변환하고  
u flag로 인스턴스를 생성함
2. `obj.test("12")`  
매치가 되므로 true가 출력됨
3. `obj.unicode`  
unicode 프로퍼티 값이 true로 설정됨
4. `/\u{1f418}/u.test/("🐘")`  
이모지도 매치할 수 있음
  
- u플래그를 사용하지 않으면
  + 코드 포인트를 문자로 매치
```js
const result = /\u{31}\u{32}/.test("12");
console.log(result);

[실행 결과]
false
```
1. / 다음에 플래그를 작성하지 않음
2. 패턴의 코드 포인트를 일반 문자로 간주하여  
12와 매치하므로 `false`가 출력됨

## 4. s 플래그
- 정규 표현식에서 dot(.)은
  + 모든 문자를 매치하지만  
  줄 바꿈 문자는 매치하지 않음
- S 플래그를 사용하면(ES2018)
  + 줄 바꿈 문자를 매치
  + dotAll 플래그에 true 설정
- 줄 바꿈 문자
  + U+000A Line Feed(LF)("\n")
  + U+000D Carriage Return(CR)("\r")
  + U+2028 Line Seperator
  + U+2029 Pragraphy Separator
```js
const text = `line
줄을 바꿈`;
//이전 방법
console.log(/[\s\S]+/.test(text));
console.log(/[^]+/.test(text));
//s 플래그
const obj = new RegExp(".+", "s");
console.log(obj.test(text));
console.log(obj.dotAll);

[실행 결과]
true
true
true
true
```
1. line 바로 뒤에 줄 바꿈 문자가 있으나  
표시되지 않은 것임
2. ES2018 이전에는 이전 방법으로 매치
3. s 플래그로 줄 바꿈 문자를 매치할 수 있음
