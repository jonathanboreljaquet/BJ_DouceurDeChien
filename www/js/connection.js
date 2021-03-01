/**
 * Auteur : Jonathan Borel-Jaquet - T.IS-E2A
 * Date : 01/03/21
 * Description : Script JavaScript pour la vue connection.html
 */

/**
 * @desc Méthode permettant la connexion d'un utilisateur.
 * @param {string} email - Email de l'utilisateur.
 * @param {string} password - Mot de passe de l'utilisateur.
 */
function connection(email, password) {
    $.ajax({
        url: 'https://api-douceur-de-chien.boreljaquet.ch/api/login',
        type: 'POST',
        data: {
            "email": email,
            "password": password
        },
        dataType: 'json',
        success: function(code_html, statut) {
            localStorage.setItem("api_token", code_html.api_token);
            localStorage.setItem("isAdministrator", code_html.isAdministrator);
            if (code_html.isAdministrator == 1) {
                window.location.replace("home.html")
            } else {
                window.location.replace("client.html")
            }

        },
        error: function(resultat) {
            var allErrors = resultat.responseJSON;
            if ('errors' in allErrors) {
                $.each(allErrors.errors, function(index, value) {
                    showAlert("danger", value);
                });
            }
            if ('failed' in allErrors) {
                showAlert("danger", allErrors.failed);
            }
        }
    });
}

/**
 * @desc Événement click du bouton de connexion.
 */
$("#btnConnection").on("click", function() {
    var email = $("#connectionEmail").val();
    var password = $("#connectionPassword").val();
    $(".alertlogin").hide();
    connection(email, password);
});