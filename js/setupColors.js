'use strict';

(function () {

  var onCoatClick = function () {
    window.variables.coatColor = window.util.getRandomElement(window.variables.WIZARD_COAT_COLORS);
    window.variables.setupWizardCoat.style.fill = window.variables.coatColor;
    window.variables.setupWizard.querySelector('input[name = ' + window.variables.COAT_COLOR + ']').value = window.variables.coatColor;
    window.similar.updateWizards();
  };

  var onEyesClick = function () {
    window.variables.eyesColor = window.util.getRandomElement(window.variables.WIZARD_EYES_COLORS);
    window.variables.setupWizardEyes.style.fill = window.variables.eyesColor;
    window.variables.setupWizard.querySelector('input[name = ' + window.variables.EYES_COLOR + ']').value = window.variables.eyesColor;
    window.similar.updateWizards();
  };

  var onFireballClick = function () {
    var fireballColor = window.util.getRandomElement(window.variables.WIZARD_FIREBALL_COLORS);
    window.variables.setupFireballColor.style = 'background: ' + fireballColor + ';';
    window.variables.setupFireballColor.querySelector('input').value = fireballColor;
  };


  var open = function () {
    window.variables.setupWizardCoat.addEventListener('click', onCoatClick);
    window.variables.setupWizardEyes.addEventListener('click', onEyesClick);
    window.variables.setupFireballColor.addEventListener('click', onFireballClick);
  };

  var close = function () {
    window.variables.setupWizardCoat.removeEventListener('click', onCoatClick);
    window.variables.setupWizardEyes.removeEventListener('click', onEyesClick);
    window.variables.setupFireballColor.removeEventListener('click', onFireballClick);
  };

  window.setupColors = {
    open: open,
    close: close
  };
})();
