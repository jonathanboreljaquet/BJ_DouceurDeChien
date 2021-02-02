function getAllClient(email, firstname, secondname, password) {
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
      success: function (code_html, statut) {
        showAlert("success", "Vous êtes maintenant inscrit");
      },
      error: function (resultat, statut, erreur) {
        showAlert("danger", "Vous n'avez pas bien remplis les champs");
      }
    });
  }



var $table = $('#table')
$(function() {
  $table.bootstrapTable({data: data})
})