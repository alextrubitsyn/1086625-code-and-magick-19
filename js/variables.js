'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var COAT_COLOR = 'coat-color';
  var EYES_COLOR = 'eyes-color';
  var TIMEOUT = 10000;
  var TIMEOUT_MESSAGE = 5000;
  var wizards;
  var wizardsRank = [{}];
  var setupWizard = document.querySelector('.setup-wizard-appearance');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireballColor = document.querySelector('.setup-fireball-wrap');
  var coatColor = setupWizardCoat.style.fill;
  var eyesColor = setupWizardEyes.style.fill;

  window.variables = {
    WIZARD_COAT_COLORS: WIZARD_COAT_COLORS,
    WIZARD_EYES_COLORS: WIZARD_EYES_COLORS,
    WIZARD_FIREBALL_COLORS: WIZARD_FIREBALL_COLORS,
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    COAT_COLOR: COAT_COLOR,
    TIMEOUT: TIMEOUT,
    TIMEOUT_MESSAGE: TIMEOUT_MESSAGE,
    EYES_COLOR: EYES_COLOR,
    setupWizard: setupWizard,
    setupWizardCoat: setupWizardCoat,
    setupWizardEyes: setupWizardEyes,
    setupFireballColor: setupFireballColor,
    coatColor: coatColor,
    eyesColor: eyesColor,
    wizards: wizards,
    wizardsRank: wizardsRank
  };
})();
