/**
 * Auteur : Jonathan Borel-Jaquet - T.IS-E2A
 * Date : 01/03/21
 * Description : Script JavaScript pour la vue createFile.html
 */

// Initialisation du composant Sketchpad
var el = document.getElementById('sketchpad');
var pad = new Sketchpad(el, {
    line: {
        color: '#000000',
        size: 3
    }
});

/**
 * @desc Événement click du bouton de création de contrat.
 */
$("#btnCreateContract").on("click", function() {
    if ($("#checkboxDocument").is(':checked')) {
        var token = localStorage.getItem("api_token");
        var idUser = localStorage.getItem("idUser");
        var signature_img_base64 = pad.canvas.toDataURL("image/png");
        var package = $("#package").find('option:selected').val();
        AddDocumentForClient(token, idUser, signature_img_base64, package);
    } else {
        showAlert("danger", "Veuillez lire et aprouvé le document.");
    }

});

/**
 * @desc Événement click du bouton retour.
 */
$("#btnReturn").on("click", function() {
    window.location.href = "client.html";
});

/**
 * @desc Événement click du bouton clear du Sketchpad.
 */
$("#btnClearPad").on("click", function() {
    pad.clear();
});

/**
 * @desc Méthode permettant la création d'un document pour un client.
 * @param {string} token - Token d'authentification de l'utilisateur.
 * @param {string} idUser - ID du client.
 * @param {string} signature_img_base64 - Signature du client en base64.
 * @param {string} package - Forfait de rendez-vous.
 */
function AddDocumentForClient(token, idUser, $signature_img_base64, $package) {
    $.ajax({
        url: `https://api-douceur-de-chien.boreljaquet.ch/api/document/${idUser}`,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        type: 'POST',
        dataType: 'json',
        data: { type: "conditions_inscription", signature_img_base64: $signature_img_base64, package: $package },
        success: function(data, statut) {
            showAlert("success", "Document créé");
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