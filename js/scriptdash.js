function fncLogout() {
    if (confirm("Do you want to Logout?")) {
       location.href="./login.html";
    }
  }

  function loadConsultants(){
   const country = document.getElementById('refcountry');
   const job = document.getElementById('refjobtype');
 
   if(country.value !== "" &&  job.value !== ""){
     fetch("http://127.0.0.1:8080/api/consultant/get-consultatnts-by-availability", {
      method:"POST",
      headers:{
         'Content-type':'application/json'
      },
      body:JSON.stringify({
         "n_country": country.value,
         "n_jobid": job.value
      })
     })
     .then((response) => response.json())
     .then((data) => {
       const consultantsComboBox = document.getElementById('refconsultant');
       const consultants = data?.content;
       const optionsArray = consultants.map(consultant=>`
       <option value="${consultant.n_consultantid}">${consultant.c_name}</option>
       `)
       consultantsComboBox.innerHTML = optionsArray.join('');
 
 
     })
     .catch((error) => console.error("Error:", error));
 
 
   }
 
 }


 function placeAppointment(){
   const country = document.getElementById('refcountry');
   const job = document.getElementById('refjobtype');
   const consultantsComboBox = document.getElementById('refconsultant');
   
 }