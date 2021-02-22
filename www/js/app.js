// // Login Screen Demo
// $$('#my-login-screen .login-button').on('click', function () {
//   var username = $$('#my-login-screen [name="username"]').val();
//   var password = $$('#my-login-screen [name="password"]').val();

//   // Close login screen
//   app.loginScreen.close('#my-login-screen');

//   // Alert username and password
//   app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
// });

// // Initialize Sketchpad
// var el = document.getElementById('sketchpad');
// var pad = new Sketchpad(el, {
//     line: {
//         color: '#f44335',
//         size: 5
//     }
// });
// function downloadPng() {
//   var data = pad.canvas.toDataURL("image/png");
//   $('#imageSketch').attr("src", data);
// }
// // resize
// window.onresize = function (e) {
//   pad.resize(el.offsetWidth);
// }

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

$("#ListRightItem").on("click", "#btnLogout", function() {
    localStorage.removeItem("isAdministrator");
    localStorage.removeItem("api_token");
    localStorage.removeItem("api_token_client");
    window.location.replace("connection.html")

});

$("#btnInscription").on("click", function() {
    var email = $("#inscriptionEmail").val();
    var firstname = $("#inscriptionFirstname").val();
    var secondname = $("#inscriptionSecondname").val();
    var password = $("#inscriptionPassword").val();
    inscription(email, firstname, secondname, password);
});

$("#btnConnection").on("click", function() {
    var email = $("#connectionEmail").val();
    var password = $("#connectionPassword").val();
    $(".alertlogin").hide();
    connection(email, password);
});

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
            showAlert("success", "Vous êtes maintenant connecté");
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


function showAlert(type, message) {
    html = "<div class='alertlogin alert alert-" + type + " alert-dismissible' role='alert'>" + message +
        "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button></div>"
    $('#alertPopUp').append(html);
}
