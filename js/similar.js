'use strict';

(function () {

  var COUNT_SIMILAR_WIZARDS = 4;
  var RANK_COAT = 2;
  var RANK_EYES = 1;
  var RANK_MAX = RANK_COAT + RANK_EYES;
  var setupSimilar = document.querySelector('.setup-similar');
  var similarList = setupSimilar.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizards = [];

  var renderWizard = function (element) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = element.name;
    wizardElement.querySelector('.wizard-coat').style.fill = element.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = element.colorEyes;
    return wizardElement;
  };

  var makeWizardsBlock = function (elements) {
    similarList.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < COUNT_SIMILAR_WIZARDS; i++) {
      fragment.appendChild(renderWizard(elements[i]));
    }
    similarList.appendChild(fragment);
  };

  var updateWizards = window.debounce(function (coatColor, eyesColor) {
    var similarWizards = [];
    var rankWizards = [[], [], [], []];
    for (var i = 0; i < wizards.length; i++) {
      var rank = 0;
      if (wizards[i].colorCoat === coatColor) {
        rank += RANK_COAT;
      }
      if (wizards[i].colorEyes === eyesColor) {
        rank += RANK_EYES;
      }
      rankWizards[rank].push(wizards[i]);
      if (rank === RANK_MAX && rankWizards[3].length === COUNT_SIMILAR_WIZARDS) {
        break;
      }
    }
    for (var j = (rankWizards.length - 1); j >= 0; j--) {
      if (similarWizards.length < COUNT_SIMILAR_WIZARDS) {
        similarWizards = similarWizards.concat(rankWizards[j]);
      } else {
        break;
      }
    }
    makeWizardsBlock(similarWizards);
  });

  var onSuccess = function (data) {
    wizards = data;
    updateWizards(window.setupColors.firstCoat, window.setupColors.firstEyes);
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
