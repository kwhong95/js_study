let book;
let one, two;

/*
1. let book;
   값을 할당하지 않고 변수만
   선언할 수 있음
   초기 값은 undifined가 할당 (사용 불가)
2. let one, two;
  콤파로 구분하여 다수를 선언 가능
*/

let book = "책";
let one = 1, two = (10 + 20);
//let five = 5, let six = 6;
//let five = 5, var six = 6;

/*
1. let book = "책";
  변수를 선언하고 초기값을 할당함
2. let one = 1, two = (10 + 20);
  콤마로 구분하여 다수의 변수를 선언하고
  값을 할당한 형태
3. let five = 5, let six = 6;
  SyntaxError 발생
  let을 처음에 한 번만 작성
4. let five = 5, var six = 6;
  콤마로 구분하여
  let과 var을 같이 사용할수 없음!
*/