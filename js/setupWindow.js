
'use strict';

(function () {

  var setupUser = document.querySelector('.setup');
  var setupUserOpen = document.querySelector('.setup-open');
  var setupUserClose = setupUser.querySelector('.setup-close');
  var setupInputUserName = setupUser.querySelector('.setup-user-name');
  var focusOnInput = false;
  var setupTopFirst = setupUser.style.top;
  var setupLeftFirst = setupUser.style.left;

  var onEscapePress = function (evt) {
    if (evt.key === window.variables.ESC_KEY && !focusOnInput) {
      closeSetupUser();
    }
  };

  var onInputFocus = function () {
    focusOnInput = true;
  };

  var onInputBlur = function () {
    focusOnInput = false;
  };


  var openSetupUser = function () {
    setupUser.classList.remove('hidden');
    document.addEventListener('keydown', onEscapePress);
    setupInputUserName.addEventListener('focus', onInputFocus);
    setupInputUserName.addEventListener('blur', onInputBlur);
    window.setupColors.openSetupColors();
  };

  var closeSetupUser = function () {
    setupUser.classList.add('hidden');
    document.removeEventListener('keydown', onEscapePress);
    setupInputUserName.removeEventListener('focus', onInputFocus);
    setupInputUserName.removeEventListener('blur', onInputBlur);
    window.setupColors.closeSetupColors();
    setupUser.style.top = setupTopFirst;
    setupUser.style.left = setupLeftFirst;

  };

  setupUserOpen.addEventListener('click', function () {
    openSetupUser();
  });

  setupUserOpen.addEventListener('keydown', function (evt) {
    if (evt.key === window.variables.ENTER_KEY) {
      openSetupUser();
    }
  });

  setupUserClose.addEventListener('click', function () {
    closeSetupUser();
  });

  setupUserClose.addEventListener('keydown', function (evt) {
    if (evt.key === window.variables.ENTER_KEY) {
      closeSetupUser();
    }
  });

})();
