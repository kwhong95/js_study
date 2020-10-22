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