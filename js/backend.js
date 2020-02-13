'use strict';

(function () {
  var STATUS_CODE = {
    OK: 200
  };

  var searchError = function (cod) {
    var errors = {
      '400': 'Синтаксическая ошибка в запросе к серверу',
      '401': 'Ошибка аутентификации',
      '403': 'Ошибка ограничения доступа',
      '404': 'Ошибка адреса запроса',
      '500': 'Ошибка сервера',
      'default': 'Ошибка сетевого обмена, код: ' + cod
    };
    return errors[cod] || errors['default'];
  };

  var handleRequest = function (xhr, onLoad, onError) {
    xhr.timeout = window.variables.TIMEOUT;

    var onXhrLoad = function () {
      if (xhr.status === STATUS_CODE.OK) {
        onLoad();
        // onLoad(xhr.response);
      } else {
        onError(searchError(xhr.status));
      }
      xhr.removeEventListener('load', onXhrLoad);
    };

    var onXhrError = function () {
      onError('Ошибка соединения! Проверьте подключение к сети!');
      xhr.removeEventListener('error', onXhrError);
    };

    var onXhrTimeout = function () {
      onError('Запрос не успел выполниться за ' + (xhr.timeout / 1000) + 'с! Повторите запрос позднее!');
      xhr.removeEventListener('timeout', onXhrTimeout);
    };

    xhr.addEventListener('load', onXhrLoad);
    xhr.addEventListener('error', onXhrError);
    xhr.addEventListener('timeout', onXhrTimeout);

  };

  // Выгрузка на сервер данных игрока
  var save = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    handleRequest(xhr, onLoad, onError);

    xhr.open('POST', URL);
    xhr.send(data);
  };

  // Загрузка с сервера похожих волшебников
  var load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick/data';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    handleRequest(xhr, onLoad, onError);

    xhr.open('GET', URL);
    xhr.send();

  };


  window.backend = {
    save: save,
    load: load
  };

})();
