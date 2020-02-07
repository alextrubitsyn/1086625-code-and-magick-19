'use strict';

(function () {

  var getRandomRange = function (minNum, maxNum) {
    return Math.floor(Math.random() * (maxNum - minNum)) + minNum;
  };

  var getRandomElement = function (elements) {
    return elements[getRandomRange(0, elements.length)];
  };

  window.util = {
    getRandomElement: getRandomElement
  };
})();
