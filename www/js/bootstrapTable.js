var api_token = localStorage.getItem("api_token");
InitializeDataTableOfClients(api_token);

function InitializeDataTableOfClients(token) {
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


  function operateFormatter(value, row, index) {
    return [
      '<a class="edit" href="javascript:void(0)" title="Edit">',
      '<i class="bi bi-tools" style="font-size: 2rem;"></i>',
      '</a>  ',
    ].join('')
  }

  window.operateEvents = {
    'click .edit': function (e, value, row, index) {
      alert('You click like action, row: ' + JSON.stringify(row))
    }
  }