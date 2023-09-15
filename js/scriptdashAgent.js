function fncLogout() {
    if (confirm("Do you want to Logout?")) {
       location.href="./login.html";
    }
  }


function fncGetAppointment(){

   $.ajax({
      type: "POST",
      url: "http://localhost:8080/api/appointment/list",
      data: JSON.stringify({
         n_consultantid:  localStorage.getItem('userId'),
         n_status: 1,
      }),
      contentType: "application/json; charset=utf-8", // this
      dataType: "json", // and this
      success: function (response) {
       
         $('#myapp_tbody').html('');
         console.log(response);


         $.each( response.content,function(x,i){
            console.log(i)
            $('#myapp_tbody').append('<tr> <td>'+i[0]+' </td>'+
            '<td> '+i[4]+' </td>'+
            ' <td> '+i[8]+'    </td>'+
            '<td> '+i[6]+' </td>'+
            '<td>  '+i[11]+' </td>'+
            '<td><p> '+i[10]+'</p></td></tr>');
         })

       



      },
      error: function (response) {
        alert(response.message);
      },
    });
}



function fncGetPendingAppointment(){

   $.ajax({
      type: "POST",
      url: "http://localhost:8080/api/appointment/list",
      data: JSON.stringify({
         n_consultantid:  localStorage.getItem('userId'),
         n_status: 3,
      }),
      contentType: "application/json; charset=utf-8", // this
      dataType: "json", // and this
      success: function (response) {
         $('#tbody_pending_app').html('');

         console.log(response);


         $.each( response.content,function(x,i){
            console.log(i)
            $('#tbody_pending_app').append('<tr> <td>'+i[0]+' </td>'+
            '<td> '+i[4]+' </td>'+
            ' <td> '+i[8]+'    </td>'+
            '<td> '+i[6]+' </td>'+
            '<td>  '+i[11]+' </td>'+
            '<td> <p><button class="btnapr" onclick="changeStatusA('+i[0]+')">Approve</button><button  onclick="changeStatusR('+i[0]+')" class="btnrej">Reject</button></p> </tr>');
         })

       



      },
      error: function (response) {
        alert(response.message);
      },
    });
}


function changeStatusA(appId){
   $.ajax({
      type: "POST",
      url: "http://localhost:8080/api/appointment/change/status",
      data: JSON.stringify({
         n_appointid: appId,
         n_status: 1,
      }),
      contentType: "application/json; charset=utf-8", // this
      dataType: "json", // and this
      success: function (response) {
         fncGetPendingAppointment();

      },
      error: function (response) {
        alert(response.message);
      },
    });
}

function changeStatusR(appId){
   $.ajax({
      type: "POST",
      url: "http://localhost:8080/api/appointment/change/status",
      data: JSON.stringify({
         n_appointid: appId,
         n_status: 2,
      }),
      contentType: "application/json; charset=utf-8", // this
      dataType: "json", // and this
      success: function (response) {

         fncGetPendingAppointment();


      },
      error: function (response) {
        alert(response.message);
      },
    });
}


  
  