/**
 * Auteur : Jonathan Borel-Jaquet - T.IS-E2A
 * Date : 01/03/21
 * Description : Script JavaScript de vérification des droits d'accès administrateur
 */

var api_token = localStorage.getItem("api_token");
var isAdministrator = localStorage.getItem("isAdministrator");
if (api_token == "" || api_token == null || api_token == "null" || api_token == "undefined" || isAdministrator == "0" || isAdministrator == null || isAdministrator == "null" || isAdministrator == "undefined") {
    window.history.back();
}