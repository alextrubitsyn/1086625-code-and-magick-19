'use strict';

(function () {

  var setupSimilar = document.querySelector('.setup-similar');
  var similarWizards = setupSimilar.querySelector('.setup-similar-list');
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
    similarWizards.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < COUNT_SIMILAR_WIZARDS; i++) {
      fragment.appendChild(renderWizard(elements[i]));
    }
    similarWizards.appendChild(fragment);
  };

  var updateWizards = function () {
    window.variables.wizardsRank.forEach(function (wizard) {
      wizard.rank = 0;
      if (wizard.colorCoat === window.variables.coatColor) {
        wizard.rank += 2;
      }
      if (wizard.colorEyes === window.variables.eyesColor) {
        wizard.rank++;
      }
    });
    window.variables.wizardsRank.sort(function (a, b) {
      return b.rank - a.rank;
    });
    makeWizardsBlock(window.variables.wizardsRank);
  };

  var onSuccess = function (data) {
    window.variables.wizards = data;
    data.forEach(function (element, index) {
      var wizard = {};
      wizard.name = element.name;
      wizard.colorCoat = element.colorCoat;
      wizard.colorEyes = element.colorEyes;
      window.variables.wizardsRank[index] = wizard;
    });
    updateWizards();
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

  setupSimilar.classList.remove('hidden');
  window.backend.load(onSuccess, onError);

  window.similar = {
    makeWizardsBlock: makeWizardsBlock,
    updateWizards: updateWizards
  };

})();
