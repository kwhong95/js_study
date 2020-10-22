# For-of, for-of for-in 차이, for-of Object
## 1. for-of
#### 1.1 Syntax
> for (variable of iterable) { }

#### 1.2 이터러블 오브젝트 반복
- **iterable**
  + 이터러블 오브젝트를 작성
  + 표현식을 작성하면 평과 결과를 사용
- **variable**
  + 변수 이름 작성
  + **이터러블 오브젝트를 반복할 때**마다  
  `variable`에 **값이 할당**됨
```js
const list = [1, 2, 3];
for (let k = 0; k < list.length; k++) {
  console.log(list[k]);
};

for (let value of list) {
  console.log(value);
};

[실행 결과]
1
2
3
1
2
3
```
 #### 1.3 배열
 - **배열을 반복**하면서 엘리먼트를 하나씩 전개
 ```js
 for (let value of [1, 2, 3]) {
   console.log(value);
 };
 
[실행 결과]
1
2
3
```
#### 1.4 String
- **문자열을 반복**하면서 문자를 하나씩 전개
```js
for (let value of "ABC") {
  console.log(value);
};

[실행 결과]
A
B
C
```
#### 1.5 NodeList
- **NodeList를 반복**하면서 엘리먼트를 하나씩 전개
`nodeList`
```html
<ul>
  <li class=show>첫 번째</li>
  <li class=show>두 번째</li>
  <li class=show>세 번째</li>
</ul>
```
  
```js
const nodes =
    document.querySelectorAll(".show");
for (let node of nodes) {
  console.log(node.textContent);
};

[실행 결과]
첫 번째
두 번째
세 번째
```
## 2 for-in, for-of 차이
#### 2.1 for-in
+ **열거 가능한 프로퍼티가 대상** => `enumerable = true`
+ `{key: value}` 형태는  
  디폴트가 `enumerable : true`
+ `Object.defineProperty()` 는  
  디폴트가 `enumerable: false`
```js
const obj = {};
Object.definedProperties(obj, {
  sports: {
    enumerable: false, value: "스포츠"
  },
  book: {
    enumerable: true, value: "책"
  },
});
for (let item of obj) {
  console.log(item + ": " + obj[item]);
};

[실행 결과]
book: 책
```
#### 2.2 for-of
- **이터러블 오브젝트**가 대상
- **Object**는 전개 되지 않음
- **prototype**의 프로퍼티도 전개되지 않음

#### 2.3 for-of, Object
- **Object**는 이터러블 오브젝트가 아니므로  
**for-of** 사용 불가
- **Object**를 **for-of**로 전개할 수 있는 방법  
  + `Object.keys()`로  
  프로퍼티 이름을 배열로 만들고
  + 만든 배열을 **for-of**로 전개
```js
const sports = {
  soccor: "축구",
  baseball: "야구"
};
const keyList = Object.keys(sports);

for (let key of KeyList) {
  console.log(key + ": " + sports[key]);
};

[실행 결과]
soccer: 축구
baseball: 야구
```
