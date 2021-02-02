var api_token = localStorage.getItem("api_token");
if(api_token==""||api_token==null ||api_token=="null" || api_token=="undefined")
{
    window.location.replace("connection.html")
}


