'use strict';

(function () {
  var COAT_COLOR = 'coat-color';
  var EYES_COLOR = 'eyes-color';
  var setupWizard = document.querySelector('.setup-wizard-appearance');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireballColor = document.querySelector('.setup-fireball-wrap');
  var coatColorInput = setupWizard.querySelector('input[name = ' + COAT_COLOR + ']');
  var eyesColorInput = setupWizard.querySelector('input[name = ' + EYES_COLOR + ']');
  var fireballColorInput = setupFireballColor.querySelector('input');
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  window.variables.coatColor = setupWizardCoat.style.fill;
  window.variables.eyesColor = setupWizardEyes.style.fill;

  var onCoatClick = function () {
    window.variables.coatColor = window.util.getRandomElement(WIZARD_COAT_COLORS);
    setupWizardCoat.style.fill = window.variables.coatColor;
    coatColorInput.value = window.variables.coatColor;
    window.debounce(window.similar.updateWizards)();
  };

  var onEyesClick = function () {
    window.variables.eyesColor = window.util.getRandomElement(WIZARD_EYES_COLORS);
    setupWizardEyes.style.fill = window.variables.eyesColor;
    eyesColorInput.value = window.variables.eyesColor;
    window.debounce(window.similar.updateWizards)();
  };

  var onFireballClick = function () {
    var fireballColor = window.util.getRandomElement(WIZARD_FIREBALL_COLORS);
    setupFireballColor.style = 'background: ' + fireballColor + ';';
    fireballColorInput.value = fireballColor;
  };


  var open = function () {
    setupWizardCoat.addEventListener('click', onCoatClick);
    setupWizardEyes.addEventListener('click', onEyesClick);
    setupFireballColor.addEventListener('click', onFireballClick);
  };

  var close = function () {
    setupWizardCoat.removeEventListener('click', onCoatClick);
    setupWizardEyes.removeEventListener('click', onEyesClick);
    setupFireballColor.removeEventListener('click', onFireballClick);
  };

  window.setupColors = {
    open: open,
    close: close
  };
})();
