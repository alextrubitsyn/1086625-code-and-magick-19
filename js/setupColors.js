'use strict';

(function () {
  var setupWizard = document.querySelector('.setup-wizard-appearance');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireballColor = document.querySelector('.setup-fireball-wrap');


  var onCoatClick = function () {
    var coatColor = window.util.getRandomElement(window.variables.WIZARD_COAT_COLORS);
    setupWizardCoat.style.fill = coatColor;
    setupWizard.querySelector('input[name = ' + window.variables.COAT_COLOR + ']').value = coatColor;
  };

  var onEyesClick = function () {
    var eyesColor = window.util.getRandomElement(window.variables.WIZARD_EYES_COLORS);
    setupWizardEyes.style.fill = eyesColor;
    setupWizard.querySelector('input[name = ' + window.variables.EYES_COLOR + ']').value = eyesColor;
  };

  var onFireballClick = function () {
    var fireballColor = window.util.getRandomElement(window.variables.WIZARD_FIREBALL_COLORS);
    setupFireballColor.style = 'background: ' + fireballColor + ';';
    setupFireballColor.querySelector('input').value = fireballColor;
  };


  var openSetupColors = function () {
    setupWizardCoat.addEventListener('click', onCoatClick);
    setupWizardEyes.addEventListener('click', onEyesClick);
    setupFireballColor.addEventListener('click', onFireballClick);
  };

  var closeSetupColors = function () {
    setupWizardCoat.removeEventListener('click', onCoatClick);
    setupWizardEyes.removeEventListener('click', onEyesClick);
    setupFireballColor.removeEventListener('click', onFireballClick);
  };

  window.setupColors = {
    openSetupColors: openSetupColors,
    closeSetupColors: closeSetupColors
  };
})();
