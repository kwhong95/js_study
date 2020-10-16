// let sports = "축구";

// if (sports) {
//   let sports = "농구";
//   console.log("안: ", sports);
// };
// console.log("밖:", sports);

/*
[실행 결과]
안: 농구
밖: 축구

let 변수를 사용한다면!!
{}(Block) 으로 안과 밖이 각각의 스코프를 가지게 된다.

1. if (sports) {...}
  블록 {} 안과 밖에 let sports를 작성했으며
  스코프가 다르므로
  같은 이름을 사용할 수 있다
2. 변숫값이 대체되지 않고 유지 된다
3. 블록 안에서 블록 밖의 변수는 접근할 수 있지만
4. 블록 밖에서 블록 안의 변수는 접근할 수 없음
*/

let sports = "축구";
sports = "농구";
console.log(sports);
// let sports = "배구";
{
  let sports = "탁구"
  console.log(sports)
};