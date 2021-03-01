/**
 * Auteur : Jonathan Borel-Jaquet - T.IS-E2A
 * Date : 01/03/21
 * Description : Script JavaScript pour la vue client.html
 */

$(function() {
    var api_token_client;
    var isAdministrator = localStorage.getItem("isAdministrator");
    if (isAdministrator == "1") {
        api_token_client = localStorage.getItem("api_token_client");
    } else {
        api_token_client = localStorage.getItem("api_token");
    }

    GetClient(api_token_client, isAdministrator);
    InitializeDataTableOfDogs(api_token_client);
    InitializeDataTableOfDocuments(api_token_client);
});

/**
 * @desc Méthode permettant de récupérer les informations d'un client pour son affichage.
 * @param {string} token - Token d'authentification de l'utilisateur.
 * @param {string} isAdministrator - Valeur 0 ou 1 pour connaitre le rôle de l'utilisateur.
 */
function GetClient(token, isAdministrator) {
    $.ajax({
        url: 'https://api-douceur-de-chien.boreljaquet.ch/api/user',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        type: 'GET',
        dataType: 'json',
        success: function(data, statut) {
            localStorage.setItem('idUser', data.id)
            DisplayClientInformation(data, isAdministrator);
        },
        error: function(resultat, statut, erreur) {
            showAlert("danger", "Erreur");
        }
    });
}

/**
 * @desc Méthode permettant d'afficher les données du client ainsi que des composants si l'utilisateur est admin.
 * @param {Object} data - Objet data retourné par une requête AJAX.
 * @param {string} isAdministrator - Valeur 0 ou 1 pour connaitre le rôle de l'utilisateur.
 */
function DisplayClientInformation(data, isAdministrator) {
    $("#firstname").text(data["firstname"]);
    $("#secondname").text(data["secondname"]);
    $("#email").text(data["email"]);
    if (isAdministrator == "1") {
        $("#parentButtonReturn").append($('<button id="btnReturn" class="customButton" style="background-color: #0d6efd;" type="button">Retour</button>'));
        $("#toolbardog").append($('<button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addDogModal">Ajouter un chien</button>'));
        $("#toolbardocument").append($('<button id="btnMoveCreateFile" type="button" class="btn btn-secondary">Ajouter un document</button>'));
    }
}

/**
 * @desc Événement click du bouton retour.
 */
$("#parentButtonReturn").on("click", "#btnReturn", function() {
    window.location.href = "home.html";
});

/**
 * @desc Événement click du bouton de création de document PDF.
 */
$("#toolbardocument").on("click", "#btnMoveCreateFile", function() {
    window.location.href = "createFile.html";
});

/**
 * @desc Méthode permettant d'afficher les chiens d'un utilsateur grâce à son token.
 * @param {string} token - Token d'authentification de l'utilisateur.
 */
function InitializeDataTableOfDogs(token) {
    $.ajax({
        url: 'https://api-douceur-de-chien.boreljaquet.ch/api/dog',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        type: 'GET',
        dataType: 'json',
        success: function(data, statut) {
            var $table = $('#tableDog')
            $table.bootstrapTable({
                data: data,
            })
        },
        error: function(resultat, statut, erreur) {
            showAlert("danger", "Erreur");
        }
    });
}

/**
 * @desc Méthode permettant d'afficher les documents d'un utilsateur grâce à son token.
 * @param {string} token - Token d'authentification de l'utilisateur.
 */
function InitializeDataTableOfDocuments(token) {
    $.ajax({
        url: 'https://api-douceur-de-chien.boreljaquet.ch/api/document',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        type: 'GET',
        dataType: 'json',
        success: function(data, statut) {
            var $table = $('#tableDocument')
            $table.bootstrapTable({
                data: data,
            })
        },
        error: function(resultat, statut, erreur) {
            showAlert("danger", "Erreur");
        }
    });
}

/**
 * @desc Méthode permettant d'ajouter un chien pour un client.
 * @param {string} token - Token d'authentification de l'utilisateur.
 * @param {string} idUser - ID du client.
 * @param {string} dogName - Nom du chien.
 * @param {string} dogChip_id - Numéro de puce sous-cutané du chien.
 */
function AddDogForClient(token, idUser, $dogName, $dogChip_id) {
    $.ajax({
        url: `https://api-douceur-de-chien.boreljaquet.ch/api/dog/${idUser}`,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        type: 'POST',
        dataType: 'json',
        data: { name: $dogName, chip_id: $dogChip_id },
        success: function(data, statut) {
            var lastIndex = $("#tableDog >tbody >tr").length;
            var $table = $('#tableDog')
            $table.bootstrapTable('insertRow', {
                index: lastIndex,
                row: {
                    name: $dogName,
                    chip_id: $dogChip_id
                }
            })
            showAlert("success", "Chien ajouté");
        },
        error: function(resultat, statut, erreur) {
            var allErrors = resultat.responseJSON;
            if ('errors' in allErrors) {
                $.each(allErrors.errors, function(index, value) {
                    showAlert("danger", value);
                });
            }
        }
    });
}




/**
 * @desc Événement click du bouton d'ajout de chien.
 */
$("#btnAddDog").on("click", function() {
    var token = localStorage.getItem('api_token');
    var idUser = localStorage.getItem('idUser');
    var dogName = $("#dog_name_input").val();
    var dogChip_id = $("#dog_chip_id_input").val();
    AddDogForClient(token, idUser, dogName, dogChip_id);
});

/**
 * @desc Méthode pour ajouter du contenue HTML dans le composant Bootstrap Table des documents.
 * {@link <https://examples.bootstrap-table.com/index.html#column-options/events.html>}
 */
function operateFormatterDocument(value, row, index) {
    return [
        '<a class="download" href="javascript:void(0)" title="download">',
        '<i class="bi bi-download" style="font-size: 2rem;"></i>',
        '</a>  ',
    ].join('')
}

/**
 * @desc Événement click du bouton de téléchargement.
 */
window.operateEventsDocument = {
    'click .download': function(e, value, row, index) {
        var api_token_client;
        var isAdministrator = localStorage.getItem("isAdministrator");
        if (isAdministrator == "1") {
            api_token_client = localStorage.getItem("api_token_client");
        } else {
            api_token_client = localStorage.getItem("api_token");
        }
        downloadPDF(api_token_client, row["serial_number"]);
    }
}

/**
 * @desc Méthode permettant de télécharger le document PDF.
 * @param {string} token - Token d'authentification de l'utilisateur.
 * @param {string} serial_number - Numéro de série du document.
 */
function downloadPDF(token, serial_number) {
    var blob = "";
    var filename = "";
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (this.status == 200) {
            blob = new Blob([this.response])
            if (typeof cordova !== 'undefined') {
                filename = `DDC_conditions_inscription_${serial_number}.pdf`
                saveBlob2File(filename, blob)
            }
        } else {
            showAlert("danger", "Erreur");
        }
    };
    try {
        xhr.open('GET', `https://api-douceur-de-chien.boreljaquet.ch/api/preview-pdf/${serial_number}`, true);
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        xhr.responseType = 'blob';
        xhr.send();
    } catch (e) {
        alert(e);
    }
}

/**
 * @desc Méthode permettant de sauvegarder le Blob en fichier.
 * @param {string} fileName - Nom du fichier.
 * @param {Object} blob - Objet Blob.
 */
function saveBlob2File(fileName, blob) {
    var folder = cordova.file.externalRootDirectory + 'Download'
    window.resolveLocalFileSystemURL(folder, function(dirEntry) {
        console.log('file system open: ' + dirEntry.name)
        createFile(dirEntry, fileName, blob)
    }, onErrorLoadFs)
}

/**
 * @desc Méthode permettant la création d'un fichier.
 * @param {string} dirEntry - Destination du fichier.
 * @param {string} fileName - Nom du fichier.
 * @param {Object} blob - Objet Blob.
 */
function createFile(dirEntry, fileName, blob) {
    dirEntry.getFile(fileName, {
        create: true,
        exclusive: false
    }, function(fileEntry) {
        writeFile(fileEntry, blob)
    }, onErrorCreateFile)
}

/**
 * @desc Méthode permettant l'écriture d'un fichier.
 * @param {string} fileName - Nom du fichier.
 * @param {Object} dataObj - Objet Blob.
 */
function writeFile(fileEntry, dataObj) {
    fileEntry.createWriter(function(fileWriter) {

        fileWriter.onwriteend = function() {
            //Notification mobile pour la création du document.
            cordova.plugins.notification.local.schedule({
                title: 'Document PDF créé',
                text: 'DDC_conditions-inscription_DSAnj\nDans le dossier Stockage interne/Download',
                smallIcon: 'res://n_icon.png',
                icon: 'res://screen.png'
            });
            console.log("Successful file write...");
        };

        fileWriter.onerror = function(e) {
            console.log("Failed file write: " + e.toString());
        };

        if (!dataObj) {
            dataObj = new Blob(['some file data'], {
                type: 'text/plain'
            });
        }

        fileWriter.write(dataObj)
    });
}

function onErrorLoadFs(error) {
    console.log(error)
}

function onErrorCreateFile(error) {
    console.log(error)
}