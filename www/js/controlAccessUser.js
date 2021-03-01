/**
 * Auteur : Jonathan Borel-Jaquet - T.IS-E2A
 * Date : 01/03/21
 * Description : Script JavaScript de vérification des droits d'accès utilisateur
 */

var api_token = localStorage.getItem("api_token");
var isAdministrator = localStorage.getItem("isAdministrator");
if (api_token != "" && api_token != null && api_token != "null" && api_token != "undefined") {
    if (isAdministrator === "1") {
        window.location.href = "home.html";
    } else {
        window.location.href = "client.html";
    }

}