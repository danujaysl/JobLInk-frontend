function fncLogout() {
    if (confirm("Do you want to Logout?")) {
       location.href="./login.html";
    }
  }



  function fncReport(){

   $.ajax({
      type: "POST",
      url: "http://localhost:8080/api/appointment/report",
      data: JSON.stringify({
         fromDate:  $('#from').val(),
         toDate:$('#to').val(),
      }),
      contentType: "application/json; charset=utf-8", // this
      dataType: "json", // and this
      success: function (response) {
         $('#tbody_report').html('');

   //       <tr>
   //       <td> 10 </td>
   //       <td> Anupa </td>
   //       <td> Australia </td>
   //       <td> Cleaner </td>
   //       <td> 2023-09-22 15:00:00 </td>
   //       <td> 
   //           <p>Approved</p> 
   //       </td>
   //   </tr>


         $.each( response.content,function(x,i){
            console.log(i)
            $('#tbody_report').append('<tr> <td>'+i[0]+' </td>'+
            '<td> '+i[4]+' </td>'+
            ' <td> '+i[8]+'    </td>'+
            '<td> '+i[6]+' </td>'+
            '<td>  '+i[11]+' </td>'+
            '<td>  <p>'+i[10]+'</p>  </tr>');
         })

       



      },
      error: function (response) {
        alert(response.message);
      },
    });
}
