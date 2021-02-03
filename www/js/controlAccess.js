var api_token = localStorage.getItem("api_token");
var isAdministrator = localStorage.getItem("isAdministrator");
if(api_token==""||api_token==null ||api_token=="null" || api_token=="undefined")
{
    window.location.replace("connection.html")
}


