
'use strict';

(function () {

  var setupUser = document.querySelector('.setup');
  var form = setupUser.querySelector('.setup-wizard-form');
  var setupUserOpen = document.querySelector('.setup-open');
  var setupUserClose = setupUser.querySelector('.setup-close');
  var setupTopFirst = setupUser.style.top;
  var setupLeftFirst = setupUser.style.left;

  var onEscapePress = function (evt) {
    if (evt.key === window.variables.ESC_KEY && document.activeElement.name !== 'username') {
      closeSetupUser();
    }
  };

  var openSetupUser = function () {
    if (setupUser.classList.contains('hidden')) {
      setupUser.classList.remove('hidden');
      document.addEventListener('keydown', onEscapePress);
      window.setupColors.open();
    }
  };

  var closeSetupUser = function () {
    if (!setupUser.classList.contains('hidden')) {
      setupUser.classList.add('hidden');
      document.removeEventListener('keydown', onEscapePress);
      window.setupColors.close();
      setupUser.style.top = setupTopFirst;
      setupUser.style.left = setupLeftFirst;
    }
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

  var onLoad = function () {
    closeSetupUser();
  };

  var onError = function (message) {
    message = 'Ваши данные не отправлены на сервер! ' + message;
    var errorLoad = document.createElement('div');
    errorLoad.classList.add('error');
    errorLoad.style = 'left: 50%; transform: translateX(-50%); bottom: 0; position: absolute; display: inline-block; width: 500px; z-index: 300; color: red; padding: 30px; text-align: center; background-color: #ffffff;';
    errorLoad.fontSize = '30px';
    errorLoad.textContent = message;
    setupUser.insertAdjacentElement('beforeend', errorLoad);
    setTimeout(window.util.eraseError, window.variables.TIMEOUT_MESSAGE);
  };

  form.addEventListener('submit', function (evtForm) {
    evtForm.preventDefault();
    window.backend.save(new FormData(form), onLoad, onError);
  });

})();
