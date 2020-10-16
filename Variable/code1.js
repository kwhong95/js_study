// "use strick";

value = 100;

function point() {
  value = 300;
  console.log("함수:", value);
};

point();

/*
1. var 키워드를 사용하지 않고
   vlaue를 글로벌 변수로 선언하고 100 할당
2. point() 함수 안에서 value 변수에 300 할당
   value 변수가 로컬 변수가 아니므로
   글로벌 오브젝트의 value 변수에 300 할당
3. 함수 안에서 글로벌 변수에
   값을 설정하는 것은 좋은 모습이 아니다.
4. 로컬 변수와 글로벌 변수를
   구분한 목적을 생각하라.
[실행 결과] 함수 : 300
*/