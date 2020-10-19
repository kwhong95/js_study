#  Arrow Function
## 1. Arrow Function 이란?
- **Arrow** 의 사전적 의미
  + 화살, 화살표 `=>`
  + 화살푶 함수로 표기
- 코드 형태
  + `(param) => { Function Code }`

  ```js
  const add = function(one, two) {
    return one + two;
  };
  console.log(add(1, 2));

  const total = (one, two) => {
    return one + two;
  };
  console.log(total(1, 2));

  [실행 결과]
  3
  3
  ```
  1. `function` 키워드 대신에  
     **화살표 ( => )** 사용
  2. **=>** 양쪽에 공백 작성 가능
  
- `function() {}` 의 축약 형태이지만  
  + 고려할 사항도 있음(*this 참조가 다름*)
  
- 화살표 함수와 전통적인 함수의 구분이 필요할 때
  + 전통적인 형태를 일반 함수라 부름

  ## 2. 함수 블록 사용
  #### 2.1 함수 블록과 return 작성 생략
  ```js
  const total = (one, two) => one + two;
  console.log(total(1, 2));

  [실행 결과]
  3
  ```
  1. **함수 블록{}**과 `return`을 생략한 형태로  
  `{return one + two}` 와 같음
  2. **=>** 앞에서 줄을 분리하면 *SyntaxError*
  3. **=>** 뒤에서는 줄을 분리할 수 있음.
    ```js
    (one, two) =>
    one + two
    ```

    #### 2.2 함수 블록 {} 만 작성한 형태
    ```js
    const total = (one) => {};
    console.log(total(1));

    [실행 결과]
    undefined
    ```
    1. **함수 블록{}만** 작성하면 `undifined`반환
    2. 함수 블록에 `return`을 작성하지 않은 것과 같음
    3. `return`을 작성하지 않으면  
      디폴트로 `undefined`를 반환
    4. **화살표 함수** 때문이 아닌 **JS** 문법임

    #### 2.3 {key: value}를 반환하는 형태
    ```js
    const point = (param) => ({book: param});
    const result = point("책");
    for (const key in result) {
      console.log(key + ": "+ result[key]);
    };

    [실행 결과]
    book: 책
    ```
    1. `{key: value}`를 **소괄호()**로 감싸면  
    `{key: value}` 를 반환
    2. **소괄호()**를 작성하지 않으면  
    `undifined` 반환

  ## 3. 파라미터 사용
  #### 3.1 파라미터가 하나일 때
  ```js
  const get = param => param + 20;
  console.log(get(10));

  [실행 결과]
  30
  ```
  1.  **파라미터**가 하나이면  
  (*param*) 에서 **소괄호** 생략 가능
  2. `get(10)`에서 **10**이 *param*에 설정

  #### 3.2 파라미터가 없으면 소괄호만 작성
  ```js
  const get = () => 10 + 20;
  console.log(get());

  [실행 결과]
  30
  ```

  ## 4. 화살표 함수 구조
  - `function`을 **=>**로 표기하는 것이 전부가 아님
  - **화살표 함수**는 *일반 함수*와 **구조**가 다름
    + 화살표 함수 나름의 특징이 있음

  ```js
  {
    debugger;
    "use strict"

    const book = function() {
      return 100;
    };
  ```
  - *book*의 **구조**를 알아보면
    + **prototype**과 **constructor**가 있음
  
  ```js
  const point = () => 100;
  ```
  1. *point*의 **구조**를 알아보면
    + **prototype**과 **constructor**가 *없음*
  2. **prototype**에 **메소드**를 연결하여 확장할 수 *없음*
  3. **prototype**이 없으므로 그만큼 **가벼움**
  4. `new 연산자`로 **인스턴스**를 생성 *불가능*
  5. **화살표 함수**의 `특징`이며 `용도`
  > **단독 사용에 용이하다!!**

  ## 5. arguments 사용 불가
  #### 5.1 arguments 사용할 수 없음
  ```js
  const point = () => {
    try{
      const args = arguments;
    } catch (error) {
      console.log("arguments 사용 불가");
  };
  point(10, 20);
  ```
  1. `point(10, 20)` 형태로 호출하면  
    + 일반 함수에서는 **arguments**에 *10, 20*이 설정되지만
  2. 화살표 함수에서 *ReferenceError*가 발생함
    + 즉, **arguments**를 사용할 수 없음
  3. point 함수 구조를 전개하면  
    + **arguments**가 표시는 되어있으나 *사용 불가*
    > 일반 함수와 구조를 맞추기 위함일듯
  
  #### 5.2 arguments 대신 rest 파라미터 사용

  ## 6. 화살표 함수와 this
  #### 6.1 strict 모드 에서 함수를 호출할 때
  - *함수 앞에 오브젝트 작성 필수*
  ```js
  "use strict"
  function book() {
    function getPoint() {
      console.log(this);
    };
    getPoint();
    // window.getPoint();
  };
  window.book();

  [실행 결과]
  undefined
  ```
  1. *strict 모드*는 `window.book()`처럼  
  호출하는 함수 앞에 오브젝트를 작성해야 함  
  이렇게 하지 않으면 `book()`함수 안에서  
  `this`값이 `undefined`가 됨
  2. 또한, `getPoint()`처럼  
  `window`를 앞에 작성하지 않으면  
  `getPoint()` 안에서 `this`값이 `undefined`이다
  3. 이를 피하기 위해 `window.getPoint()`로 호출하면  
  window 오브젝트에  
  `getPoint()`가 없으므로 *에러 발생*
  4. strict 모드의 함수에서  
  `this`를 참조하기 위해서는  
  `this`를 별도로 저장한 후  
  사용해야 하는데 *번거로움* **But!!**

  - **화살표 함수로 해결**
  ```js
  "use strict"
  var point = 100;
  function sports() {
    const getPoint = () => {
      console.log(this.point);
    };
    getPoint();
  };
  window.sports();

  [실행 결과]
  100
  ```
  1. 화살표 함수로 작성하면  
  `getPoint()`로 호출할 수 있습니다
  2. 또한, `getPoint()`화살표 함수 안에서  
  `this`가 `undefined`가 아니라  
  **글로벌(window) 오브젝트**를 참조함
  3. `var point = 100`을 작성했으므로  
  *100* 이 출력됨

  #### 6.2 화살표 함수에서 this가 글로벌 오브젝트 참조

  > `this` 값이 `undefined`
  ```js
  const book = {
    point: 500,
    getPoint: function() {
      console.log(this.point);
    }
  };
  book.getPoint();
  ```
  - 일반 함수인 `book.getPoint()`를 호출하면  
    + 함수 안에서 `this`가 **book 오브젝트**를 참조
    + 따라서 `console`에 *500* 출력

  ```js
  var point = 100;
  const sports = {
    getPoint: () => {
      console.log("this.point", this.point);
    }
  };
  sports.getPoint();
  ```
  1. 화살표 함수인 `sports.getPoint()`를 호출하면  
  - `local`에 `this.undefined`가 표시
  
  2. 이것은, 화살표 함수는 함수에  
  - `this`를 갖고 있지 않기 때문

  3. 이 때, `this`가 **window 오브젝트**를 참조

  4. `console.log("this.point", this.point);`  
  - `var point = 100;` 에서 **var** 키워드를 사용했으므로  
  - point 변수가 **Window 오브젝트**에 설정
  - 따라서 `console`에 *100*이 출력

  #### 6.3 this가 정적 스코프 참조
  - 화살표 함수에서 **정적 스코프**의 `this`를 사용
  - **정적(Lexical) 스코프**란?
    + 엔진이 **해석**할 때, 화살표 함수를 만나면  
    + **function 오브젝트**를 생성하고
    + **화살표 함수가 속한 스코프**를  
    생성한 오브젝트에 **바인딩**
  - 오브젝트에 **바인딩**된 스코프의 `this`를
    + 화살표 함수에서 `this`로 사용
  ```js
  var title = "책";
  const book = {
    show: () => console.log(this.title)
  };
  book.show();

  [실행 결과]
  책
  ```
  1. `show()` 화살표 함수에서  
  `this`가 **window 오브젝트**를 참조하는 것은  
  2. 함수 밖 스코프의 변수를 사용하듯이  
  `show()` 의 스코프 **book 오브젝트**에  
  설정된 스코프의 `this`를  
  화살표 함수에서 `this`로 사용하기 때문
  3. **book 오브젝트**가  
  **글로벌 오브젝트**에 *설정*되므로  
  `this`가 **window 오브젝트**를 *참조*하게 됨

  > 중요한 부분 놓치지 말고 넘어가자!

  ## 7. 화살표 함수와 인스턴스
  - **인스턴스**에서
    + 화살표 함수의 작성 **위치**에 따라
    + `this`가 참조하는 **오브젝트**가 *다름*
  
  #### 7.1 prototype에 메소드로 작성
  ```js
  var point = 200;
  const Point = function () {
    this.point = 100;
  };
  Point.prototype.getPoint = () => {
    console.log(this.point);
  };
  new Point().getPoint();

  [실행 결과]
  200
  ```
  1. **property**에 화살표 함수를 연결하면  
  함수 안에서 `this`가  
  **글로벌 오브젝트**를 참조
  2. `console.log(this.point)`에서  
  **글로벌 오브젝트**의 `point` 값인 *200*을 출력

  #### 7.2 prototype에 메소드 안에 작성
  ```js
  const Point = function() {
    this.point = 100;
  };
  Point.prototype.getPoint = function() {
    const add = () => this.point + 20;
    console.log(add());
    [1, 2].forEach((value) => {
      console.log(this.point + value);
    })
  };
  new Point().getPoint();

  [실행 결과]
  120
  101
  102
  ```
  1. **prototype**에 일반 함수를 연결하고  
    **함수 안에 화살표 함수**를 작성한 형태
  2. `getPoint()`가 일반 함수이므로  
  `this`가 생성한 **인스턴스** 참조
  3. 또한, 화살표 함수에서도  
  `this`가 생성한 **인스턴스**를 참조
  4. 화살표 함수의 **스코프**인 `getPoint()`의  
  `this`를 사용하기 때문

  #### 7.3 화살표 함수의 특징
  - *function* 대신 `=>` 를 사용, 함수 표현식 형태  
    + *prototype*이 없으므로 함수가 **가볍다**
    + *constructor*가 없으므로  
    *new 연산자*로 **인스턴스**를 생성할 수 없다
  - 화살표 함수에 `this`가 없다
    + 화살표 함수로 **Function 오브젝트**를 생성할 때
    + 정적으로 화살표 함수가 속한 스코프의 `this`를   
    화살표 함수에 **바인딩**한다
    + 바인딩된 `this` 참조가 바뀌지 않으며  
    화살표 함수에서 `this`로 사용
    + 일반 함수는 `call()` 등으로 바꿀 수 있다
  - *메소드*보다 **함수**로 사용하는 것이 **효율성**이 높다
  > **단독**으로 사용하는 것이 좋다!