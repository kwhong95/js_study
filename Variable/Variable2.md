## 8. let 변수와 this
- 글로벌 오브젝트에서
> let 변수를 this로 참조 불가
```js
var music = "음악";
let sports = "축구";
console.log(this.muic, this.sports);

[실행 결과]
음악, undefined
```
1. 현재 위치는 글로벌 오브젝트
2. var music = "음악";
   window 오브젝트에 설정
3. let sports = "축구";
  window 오브젝트에 설정 되지 않음
4. this.music에서
  this가 window 오브젝트를 참조하여
  music이 window 오브젝트에 설정되어 있으므로
  `음악`이 출력
5. this.sports에서
  sports가 window에 설정되지 않으므로
  `undifined`가 출력