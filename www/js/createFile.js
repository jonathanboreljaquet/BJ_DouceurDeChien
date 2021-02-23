// Initialize Sketchpad
var el = document.getElementById('sketchpad');
var pad = new Sketchpad(el, {
    line: {
        color: '#000000',
        size: 3
    }
});

//resize
window.onresize = function(e) {
    pad.resize(el.offsetWidth);
}
$("#btnCreateContract").on("click", function() {
    var token = localStorage.getItem("api_token");
    var idUser = localStorage.getItem("idUser");
    var signature_img_base64 = pad.canvas.toDataURL("image/png");
    var package = $("#package").find('option:selected').val();
    AddDocumentForClient(token, idUser, signature_img_base64, package);
});

$("#btnReturn").on("click", function() {
    window.location.href = "client.html";
});


// function downloadPng() {
//     var data = pad.canvas.toDataURL("image/png");
//     $('#imageSketch').attr("src", data);
// }




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