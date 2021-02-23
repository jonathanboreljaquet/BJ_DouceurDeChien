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

function DisplayClientInformation(data, isAdministrator) {
    $("#firstname").text(data["firstname"]);
    $("#secondname").text(data["secondname"]);
    $("#email").text(data["email"]);
    if (isAdministrator == "1") {
        $("#parentButtonReturn").append($('<button id="btnReturn"class="btn btn-primary" type="button">Retour</button>'));
        $("#toolbardog").append($('<button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addDogModal">Ajouter un chien</button>'));
        $("#toolbardocument").append($('<button id="btnMoveCreateFile" type="button" class="btn btn-secondary">Ajouter un document</button>'));
    }
}
$("#parentButtonReturn").on("click", "#btnReturn", function() {
    window.location.href = "home.html";
});
$("#toolbardocument").on("click", "#btnMoveCreateFile", function() {
    window.location.href = "index.html";
});

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

function downloadPDF(token, serial_number, type) {
    var blob = "";
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (this.status == 200) {
            blob = new Blob([xhr.response], { type: 'application/pdf' });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `DDC_${type}_${serial_number}.pdf`;
            link.click();
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


$("#btnAddDog").on("click", function() {
    var token = localStorage.getItem('api_token');
    var idUser = localStorage.getItem('idUser');
    var dogName = $("#dog_name_input").val();
    var dogChip_id = $("#dog_chip_id_input").val();
    AddDogForClient(token, idUser, dogName, dogChip_id);
});

function operateFormatterDocument(value, row, index) {
    return [
        '<a class="edit" href="javascript:void(0)" title="Edit">',
        '<i class="bi bi-download" style="font-size: 2rem;"></i>',
        '</a>  ',
    ].join('')
}

window.operateEventsDocument = {
    'click .edit': function(e, value, row, index) {
        var api_token_client;
        var isAdministrator = localStorage.getItem("isAdministrator");
        if (isAdministrator == "1") {
            api_token_client = localStorage.getItem("api_token_client");
        } else {
            api_token_client = localStorage.getItem("api_token");
        }
        downloadPDF(api_token_client, row["serial_number"], row["type"]);
    }
}