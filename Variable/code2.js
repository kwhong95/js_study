"use strict";

function point() {
  try {
    value = 300;
  } catch(e) {
    console.log("글로벌 변수 사용 불가");
  };
};

point();