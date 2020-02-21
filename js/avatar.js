'use strict';

(function () {
  var FILE_TYPES = ['png', 'gif', 'jpg', 'jpeg'];

  var fileInput = document.querySelector('input[name = "avatar"]');
  var avatarImage = document.querySelector('.setup-user-pic');

  fileInput.addEventListener('change', function () {
    var file = fileInput.files[0];
    var fileName = file.name.toLowerCase();

    var FileTypeChecking = FILE_TYPES.some(function (ext) {
      return fileName.endsWith(ext);
    });

    if (FileTypeChecking) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarImage.src = reader.result;
      });
    }
  });
})();
