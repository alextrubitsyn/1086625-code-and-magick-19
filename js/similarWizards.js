'use strict';

(function () {

  var similarWizards = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var COUNT_SIMILAR_WIZARDS = 4;

  var renderWizard = function (element) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = element.name;
    wizardElement.querySelector('.wizard-coat').style.fill = element.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = element.colorEyes;
    return wizardElement;
  };

  var makeWizardsBlock = function (elements) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < COUNT_SIMILAR_WIZARDS; i++) {
      fragment.appendChild(renderWizard(window.util.getRandomElement(elements)));
    }
    similarWizards.appendChild(fragment);
  };

  document.querySelector('.setup-similar').classList.remove('hidden');

  var onSuccess = function (wizards) {
    makeWizardsBlock(wizards);
  };


  var onError = function (message) {
    message = 'Волшебники не загрузились! ' + message;
    var errorLoad = document.createElement('div');
    errorLoad.classList.add('error');
    errorLoad.style = 'left: 50%; transform: translateX(-50%); bottom: 0; position: absolute; display: inline-block; width: 500px; z-index: 300; color: red; padding: 30px; text-align: center; background-color: #ffffff;';
    errorLoad.fontSize = '30px';
    errorLoad.textContent = message;
    document.querySelector('header').insertAdjacentElement('beforeend', errorLoad);
    setTimeout(window.util.eraseError, window.variables.TIMEOUT_MESSAGE);
  };

  window.backend.load(onSuccess, onError);

})();
