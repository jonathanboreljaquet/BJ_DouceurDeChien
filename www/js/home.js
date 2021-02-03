
function getAllClient(token) {
    $.ajax({
      url: 'https://api-douceur-de-chien.boreljaquet.ch/api/users',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      type: 'GET',
      dataType: 'json',
      success: function (data, statut) {
        var $table = $('#table')
        $table.bootstrapTable({
          data: data,
          })
      },
      error: function (resultat, statut, erreur) {
        showAlert("danger", "Vous n'avez pas bien remplis les champs");
      }
    });
  }




$(function() {
  var api_token = localStorage.getItem("api_token");  
  getAllClient(api_token);
})