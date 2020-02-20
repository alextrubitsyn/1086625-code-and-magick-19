'use strict';

(function () {

  var setupSimilar = document.querySelector('.setup-similar');
  var similarList = setupSimilar.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizards = [];
  var COUNT_SIMILAR_WIZARDS = 4;
  var coatColor;
  var eyesColor;

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

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank++;
    }
    return rank;
  };


  var updateWizards = function () {
    var similarWizards = [];
    var rankWizards = [[], [], [], []];
    for (var i = 0; i < wizards.length; i++) {
      rankWizards[getRank(wizards[i])].push(wizards[i]);
      if (getRank(wizards[i]) === 3 && rankWizards[3].length === 4) {
        break;
      }
    }
    for (var j = 3; j >= 0; j--) {
      if (similarWizards.length < 4) {
        var q = rankWizards[j];
        similarWizards = similarWizards.concat(q);
      } else {
        break;
      }
    }
    makeWizardsBlock(similarWizards);
  };

  window.setupColors.wizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  window.setupColors.wizard.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  var onSuccess = function (data) {
    wizards = data;
    coatColor = window.setupColors.firstCoat;
    eyesColor = window.setupColors.firstEyes;
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
