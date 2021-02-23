document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {

        console.log('file system open: ' + fs.name);
        getSampleFile(fs.root, 'HiI8XBUNOo', 'iNrUaD3XVq0JHg4c4OZDCr3R0rMwEjyKIL3fsaELGmSlOEK7V6Oaww8SaBRBuGoNRw8r9S4kfibOYIdQ4FGgwWaJFR2xiozNC7z2');

    }, onErrorLoadFs);

    function onErrorLoadFs() {

    }

    function getSampleFile(dirEntry, serial_number, token) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', `https://api-douceur-de-chien.boreljaquet.ch/api/preview-pdf/${serial_number}`, true);
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        xhr.responseType = 'blob';

        xhr.onload = function() {
            if (this.status == 200) {

                var blob = new Blob([this.response], { type: 'application/pdf' });
                saveFile(dirEntry, blob, "download.pdf");
            }
        };
        xhr.send();
    }

    function saveFile(dirEntry, fileData, fileName) {

        dirEntry.getFile(fileName, { create: true, exclusive: false }, function(fileEntry) {

            writeFile(fileEntry, fileData);

        }, onErrorCreateFile);
    }

    function writeFile(fileEntry, dataObj, isAppend) {

        // Create a FileWriter object for our FileEntry (log.txt).
        fileEntry.createWriter(function(fileWriter) {

            fileWriter.onwriteend = function() {
                console.log("Successful file write...");
                if (dataObj.type == "image/png") {
                    readBinaryFile(fileEntry);
                } else {
                    readFile(fileEntry);
                }
            };

            fileWriter.onerror = function(e) {
                console.log("Failed file write: " + e.toString());
            };

            fileWriter.write(dataObj);
        });
    }

    function readBinaryFile(fileEntry) {

        fileEntry.file(function(file) {
            var reader = new FileReader();

            reader.onloadend = function() {

                console.log("Successful file write: " + this.result);
                displayFileData(fileEntry.fullPath + ": " + this.result);
            };

            reader.readAsArrayBuffer(file);

        }, onErrorReadFile);
    }
}