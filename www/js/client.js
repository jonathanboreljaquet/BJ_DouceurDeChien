$(function() {
    var api_token_client;
    var isAdministrator = localStorage.getItem("isAdministrator");
    if (isAdministrator == "1") {
        api_token_client = localStorage.getItem("api_token_client");
    } else {
        api_token_client = localStorage.getItem("api_token");
    }

    GetClient(api_token_client, isAdministrator);
});





function GetClient(token) {
    $.ajax({
        url: 'https://api-douceur-de-chien.boreljaquet.ch/api/user',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        type: 'GET',
        dataType: 'json',
        success: function(data, statut) {
            DisplayClientInformation(data);
        },
        error: function(resultat, statut, erreur) {
            showAlert("danger", "Vous n'avez pas bien remplis les champs");
        }
    });
}

function DisplayClientInformation(data, isAdministrator) {
    $("#firstname").text(data["firstname"]);
    $("#secondname").text(data["secondname"]);
    $("#email").text(data["email"]);
    if (isAdministrator = "1") {
        $("#parentButtonReturn").append($('<button id="btnReturn"class="btn btn-primary" type="button">Retour</button>'));
    }
}

$("#parentButtonReturn").on("click", "#btnReturn", function() {
    window.history.back();

});