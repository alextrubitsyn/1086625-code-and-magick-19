'use strict';

(function () {

  var getRandomRange = function (minNum, maxNum) {
    return Math.floor(Math.random() * (maxNum - minNum)) + minNum;
  };

  var getRandomElement = function (elements) {
    return elements[getRandomRange(0, elements.length)];
  };

  var eraseError = function () {
    var error = document.querySelector('.error');
    if (error) {
      error.remove();
    }
  };

  window.util = {
    getRandomElement: getRandomElement,
    eraseError: eraseError
  };
})();
