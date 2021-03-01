/**
 * Auteur : Jonathan Borel-Jaquet - T.IS-E2A
 * Date : 01/03/21
 * Description : Script JavaScript pour la vue inscription.html
 */

/**
 * @desc Méthode permettant l'inscription d'un utilisateur.
 * @param {string} email - Email de l'utilisateur.
 * @param {string} firstname - Prénom de l'utilisateur.
 * @param {string} secondname - Nom de l'utilisateur.
 * @param {string} password - Mot de passe de l'utilisateur.
 */
function inscription(email, firstname, secondname, password) {
    $.ajax({
        url: 'https://api-douceur-de-chien.boreljaquet.ch/api/user',
        type: 'POST',
        data: {
            "email": email,
            "firstname": firstname,
            "secondname": secondname,
            "password": password
        },
        dataType: 'json',
        success: function(code_html, statut) {
            showAlert("success", "Vous êtes maintenant inscrit");
        },
        error: function(resultat, statut, erreur) {
            showAlert("danger", "Vous n'avez pas bien remplis les champs");
        }
    });
}

/**
 * @desc Événement click du bouton d'inscription.
 */
$("#btnInscription").on("click", function() {
    var email = $("#inscriptionEmail").val();
    var firstname = $("#inscriptionFirstname").val();
    var secondname = $("#inscriptionSecondname").val();
    var password = $("#inscriptionPassword").val();
    inscription(email, firstname, secondname, password);
});