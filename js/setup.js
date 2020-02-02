'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARD_COUNT = 4;
var setupUser = document.querySelector('.setup');
var setupUserOpen = document.querySelector('.setup-open');
var setupUserClose = setupUser.querySelector('.setup-close');
var setupInputUserName = setupUser.querySelector('.setup-user-name');
var setupWizard = document.querySelector('.setup-wizard-appearance');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireballColor = document.querySelector('.setup-fireball-wrap');
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var focusOnInput = false;

var getRandomRange = function (minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum)) + minNum;
};

var getRandomElement = function (elements) {
  return elements[getRandomRange(0, elements.length)];
};


var onSetupUserEscapePress = function (evt) {
  if (evt.key === ESC_KEY && !focusOnInput) {
    closeSetupUser();
  }
};

var onInputFocus = function () {
  focusOnInput = true;
};

var onInputBlur = function () {
  focusOnInput = false;
};

var onWizardCoat = function () {
  var coatColor = getRandomElement(WIZARD_COAT_COLORS);
  setupWizardCoat.style.fill = coatColor;
  setupWizard.querySelector('input[name="coat-color"]').value = coatColor;
};

var onWizardEyes = function () {
  var eyesColor = getRandomElement(WIZARD_EYES_COLORS);
  setupWizardEyes.style.fill = eyesColor;
  setupWizard.querySelector('input[name="eyes-color"]').value = eyesColor;
};

var onWizardFireball = function () {
  var fireballColor = getRandomElement(WIZARD_FIREBALL_COLORS);
  setupFireballColor.style = 'background: ' + fireballColor + ';';
  setupFireballColor.querySelector('input').value = fireballColor;
};


var openSetupUser = function () {
  setupUser.classList.remove('hidden');
  document.addEventListener('keydown', onSetupUserEscapePress);
  setupInputUserName.addEventListener('focus', onInputFocus);
  setupInputUserName.addEventListener('blur', onInputBlur);
  setupWizardCoat.addEventListener('click', onWizardCoat);
  setupWizardEyes.addEventListener('click', onWizardEyes);
  setupFireballColor.addEventListener('click', onWizardFireball);
};

var closeSetupUser = function () {
  setupUser.classList.add('hidden');
  document.removeEventListener('keydown', onSetupUserEscapePress);
  setupInputUserName.removeEventListener('focus', onInputFocus);
  setupInputUserName.removeEventListener('blur', onInputBlur);
  setupWizardCoat.removeEventListener('click', onWizardCoat);
  setupWizardEyes.removeEventListener('click', onWizardEyes);
  setupFireballColor.removeEventListener('click', onWizardFireball);
};

setupUserOpen.addEventListener('click', function () {
  openSetupUser();
});

setupUserOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openSetupUser();
  }
});

setupUserClose.addEventListener('click', function () {
  closeSetupUser();
});

setupUserClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closeSetupUser();
  }
});

var createWizards = function (count) {
  var elements = [];
  for (var i = 0; i < count; i++) {
    elements[i] = {
      name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
      coatColor: getRandomElement(WIZARD_COAT_COLORS),
      eyesColor: getRandomElement(WIZARD_EYES_COLORS)
    };
  }
  return elements;
};

var renderWizard = function (element) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = element.name;
  wizardElement.querySelector('.wizard-coat').style.fill = element.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = element.eyesColor;
  return wizardElement;
};

var makeWizardsBlock = function (elements) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < elements.length; i++) {
    fragment.appendChild(renderWizard(elements[i]));
  }
  similarWizards.appendChild(fragment);
};

document.querySelector('.setup-similar').classList.remove('hidden');

var similarWizards = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

makeWizardsBlock(createWizards(WIZARD_COUNT));



