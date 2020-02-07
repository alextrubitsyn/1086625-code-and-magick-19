'use strict';

(function () {

  var similarWizards = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


  var createWizards = function (count) {
    var elements = [];
    for (var i = 0; i < count; i++) {
      elements[i] = {
        name: window.util.getRandomElement(window.variables.WIZARD_NAMES) + ' ' + window.util.getRandomElement(window.variables.WIZARD_SURNAMES),
        coatColor: window.util.getRandomElement(window.variables.WIZARD_COAT_COLORS),
        eyesColor: window.util.getRandomElement(window.variables.WIZARD_EYES_COLORS)
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


  makeWizardsBlock(createWizards(window.variables.WIZARD_COUNT));

})();
