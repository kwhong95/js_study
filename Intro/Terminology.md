# 용어 사용 기준 

## 1. Object, Instance

#### 1.1 Built-in Object
- Function, Object, Array 등

#### 1.2 Object
- Built-in 오브젝트로 생성한 오브젝트
- function book() {..code}
- [1, 2], { key : value }

#### 1.2 Instance
- new 연산자로 생성한 오브젝트
- new Book();

## 2. Property, Function

#### 2.1 property key vs name
- property name: String
- property key: String과 Symbol
- ES6 스펙, 6.1.7 The Object Type

#### 2.2 Fucntion, Method
- ES5: function, method
- ES6: function, method, static method
- Array.isArray()
- Array.property.forEach()

## 뉘앙스 고려

#### ES6+에 새로운 용어가 많음
- 직역에 따른 뉘앙스 차이를 피하기 위해
- 되도록 영어 발음 표기
- 용어이므로 개념 중심으로 접근 필요