define(['jquery'], function($) {

  console.log("Function : fileupload");

  return {

    itemNum: 0,

    insertFileUpload: function(divName) {

      var itemNum = this.itemNum++;

      var uploadFileId = "uploadFileId-" + itemNum;
      var uploadProgressId = "uploadProgressId-" + itemNum;
      var buttonId = "buttonId-"+ itemNum;

      console.log("insertFileUpload called");


    var input = $('<input type="file" multiple id="' + uploadFileId + '">');
    var button = $('<button type="button" id="' + buttonId + '">Upload</button>');
  var progress = $('<progress id="' + uploadProgressId + '" value="0" max="0"></progress>');
 //  var progress = $('<progress id="uploadProgressId" value="0" max="0"></progress>');
    var form = $(divName).append('<form Select File: >');


    form.append(input);
    form.append(button);
    form.after(progress);
    //var f1 = form.append(input);
    //f1.append(button).append("<div/>").append(progress);

    var uploadButton = document.getElementById(buttonId);

      uploadButton.addEventListener("click", function(e) {

        var fileInput = document.getElementById(uploadFileId);

        var fd = new FormData();

        for (var x=0; x<fileInput.files.length; x++) {
          fd.append("file-" + x, fileInput.files[x]);
        }

        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {

          if (xhr.readyState === 4 && xhr.status !== 200) {
            console.log("error occurred");
            console.dir(xhr);
          }

          if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(JSON.parse(xhr.responseText));

            var parser = new DOMParser();
            console.log(parser.parseFromString(xhr.responseText, "application/xml"));
          }

        });

        console.dir(xhr);

        xhr.upload.addEventListener("progress", function(e) {

          console.log("uploading ...");          

          var uploadProgress = document.getElementById(uploadProgressId);
          uploadProgress.setAttribute("max", e.total);
          uploadProgress.setAttribute("value", e.loaded);
        });

        xhr.open("POST", "/api/upload");
        xhr.send(fd);
      });


    }
  };

});