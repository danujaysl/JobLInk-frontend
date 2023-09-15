function fncLogout() {
  if (confirm("Do you want to Logout?")) {
    location.href = "./login.html";
  }
}

function loadConsultants() {
  const country = document.getElementById("refcountry");
  const job = document.getElementById("refjobtype");

  if (country.value !== "" && job.value !== "") {
    fetch(
      "http://127.0.0.1:8080/api/consultant/get-consultatnts-by-availability",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          n_country: country.value,
          n_jobid: job.value,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const consultantsComboBox = document.getElementById("refconsultant");
        const consultants = data?.content;
        const optionsArray = consultants.map(
          (consultant) => `
       <option value="${consultant.n_consultantid}">${consultant.c_name}</option>
       `
        );
        consultantsComboBox.innerHTML = optionsArray.join("");
      })
      .catch((error) => console.error("Error:", error));
  }
}

function placeAppointment() {
  const country = document.getElementById("refcountry");
  const job = document.getElementById("refjobtype");
  const appointmentDate = document.getElementById("appointment-date");
  const appointmentTime = document.getElementById("appointment-time");

  const consultantsComboBox = document.getElementById("refconsultant");
  const userId = localStorage.getItem("userId");

  const appointmentDateTime =
    appointmentDate.value + " " + appointmentTime.value + ":00";

  fetch("http://127.0.0.1:8080/api/appointment/new", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      n_consultantid: consultantsComboBox.value,
      n_jobseekerid: userId,
      n_jobid: job.value,
      n_countryid: country.value,
      n_status: 3,
      d_datetime: appointmentDateTime,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "00") {
        country.value = "";
        job.value = "";
        appointmentDate.value = "";
        appointmentTime.value = "";
        consultantsComboBox.innerHTML = "";
        alert("New appointment placed!");
      }
    })
    .catch((error) => console.error("Error:", error));
}

//getting the latest oppointment
function getAppointment() {
  fetch("http://127.0.0.1:8080/api/appointment/new", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      n_consultantid: consultantsComboBox.value,
      n_jobseekerid: userId,
      n_jobid: job.value,
      n_countryid: country.value,
      n_status: 3,
      d_datetime: appointmentDateTime,
    }),
  }).then((response) => response.json());
}

function fncMyAppointment() {
  const userId = localStorage.getItem("userId");
  const url = "http://127.0.0.1:8080/api/vappointment/getvappbyID/" + userId;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("txtappointno").value = data.content.n_appointid;
      document.getElementById("txtagentname").value = data.content.c_consname;
      document.getElementById("txtjobtype").value = data.content.c_jobtype;
      document.getElementById("txtcountry").value = data.content.c_country;
      document.getElementById("txtstatus").value = data.content.c_statustype;
      document.getElementById("txtdate").value = data.content.d_datetime;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });

  
}

function fncMyDetails(){
  const userId = localStorage.getItem("userId");
  const url = "http://127.0.0.1:8080/api/users/getjsbyID/" + userId;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("txtusername").value = data.content.c_logname;
      document.getElementById("txtname").value = data.content.c_name;
      document.getElementById("txtage").value = data.content.n_age;
      document.getElementById("txttelephone").value = data.content.c_telephone;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}


if ($("#txtstatus").text() === "Pending") {
  $("#txtstatus").css("background", "#FFA500");
} else if ($("#txtstatus").text() === "Approve") {
  $("#txtstatus").css("background", "#008000");
} else if ($("#txtstatus").text() === "Reject") {
  $("#txtstatus").css("background", "#FF0000");
}

