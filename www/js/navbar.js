/**
 * Auteur : Jonathan Borel-Jaquet - T.IS-E2A
 * Date : 01/03/21
 * Description : Script JavaScript pour la barre de navigation de l'application
 */

$(function() {
    var htmlLeftItem = "";
    var htmlRightItem = "";
    var api_token = localStorage.getItem("api_token");
    var isAdministrator = localStorage.getItem("isAdministrator");

    // Control if the user is connected
    if (api_token == "" || api_token == null || api_token == "null" || api_token == "undefined") {
        htmlLeftItem += "<li class='nav-item'>" +
            "<a class='" + (top.location.pathname == '/inscription.html' ? 'active' : "") + " nav-link' href='inscription.html'>Inscription</a>" +
            "</li>" +
            "<li class='nav-item'>" +
            "<a class='" + (top.location.pathname == '/connection.html' ? 'active' : "") + " nav-link' href='connection.html'>Connexion</a>" +
            "</li>";
    } else {
        // Control if the user is an administrator
        if (isAdministrator == "0" || isAdministrator == null || isAdministrator == "null" || isAdministrator == "undefined") {
            htmlLeftItem += "<li class='nav-item'>" +
                "<a class='" + (top.location.pathname == '/client.html' ? 'active' : "") + " nav-link' href='client.html'>Informations personnelles</a>" +
                "</li>";
        } else {
            htmlLeftItem += "<li class='nav-item'>" +
                "<a class='" + (top.location.pathname == '/home.html' ? 'active' : "") + " nav-link' href='home.html'>Gestion</a>" +
                "</li>";
        }
        htmlRightItem += "<li class='nav-item'>" +
            '<a id="btnLogout" class="btn btn-danger nav-link" role="button">Deconnexion</a>' +
            "</li>";
    }
    $("#ListLeftItem").append(htmlLeftItem);
    $("#ListRightItem").append(htmlRightItem);
});

/**
 * @desc Événement click du bouton de deconnexion.
 */
$("#ListRightItem").on("click", "#btnLogout", function() {
    localStorage.clear();
    window.location.replace("connection.html")

});

/**
 * @desc Méthode d'affichage des notification de l'application.
 */
function showAlert(type, message) {
    html = "<div class='alert-fix-bottom alert alert-" + type + " alert-dismissible' role='alert'>" + message +
        "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button></div>"
    $('#alertPopUp').append(html);
}