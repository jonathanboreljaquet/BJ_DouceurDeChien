/**
 * Auteur : Jonathan Borel-Jaquet - T.IS-E2A
 * Date : 01/03/21
 * Description : Script JavaScript pour la vue home.html
 */

$(function() {
    var api_token = localStorage.getItem("api_token");
    InitializeDataTableOfClients(api_token);
});

/**
 * @desc Méthode permettant d'afficher les clients de l'application.
 * @param {string} token - Token d'authentification de l'utilisateur.
 */
function InitializeDataTableOfClients(token) {
    $.ajax({
        url: 'https://api-douceur-de-chien.boreljaquet.ch/api/users',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        type: 'GET',
        dataType: 'json',
        success: function(data, statut) {
            var $table = $('#tableClient')
            $table.bootstrapTable({
                data: data,
            })
        },
        error: function(resultat, statut, erreur) {
            showAlert("danger", "Vous n'avez pas bien remplis les champs");
        }
    });
}

/**
 * @desc Méthode pour ajouter du contenue HTML dans le composant Bootstrap Table des clients.
 */
function operateFormatterClient(value, row, index) {
    return [
        '<a class="edit" href="javascript:void(0)" title="Edit">',
        '<i class="bi bi-pencil" style="font-size: 2rem;"></i>',
        '</a>  ',
    ].join('')
}

/**
 * @desc Événement click du bouton d'édition.
 */
window.operateEventsClient = {
    'click .edit': function(e, value, row, index) {
        localStorage.setItem("api_token_client", row["api_token"]);
        window.location.href = "client.html";
    }
}