function fnReg() {
  let js_name = $("#txtname").val();
  let js_age = $("#txtage").val();
  let js_tele = $("#txttele").val();
  let js_username = $("#txtusername").val();
  let js_password = $("#txtpassword").val();
  let js_repassword = $("#textrepassword").val();

  if (js_password != js_repassword) {
    alert("Re-typed password is not match");
  } else if (js_age < 18) {
    alert("Sorry ! User should be older than 18!");
  } else {
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/api/users/saveJS",
      data: JSON.stringify({
        n_jobseekerid: "0",
        c_name: js_name,
        c_logname: js_username,
        c_password: js_password,
        n_age: js_age,
        c_telephone: js_tele,
      }),
      contentType: "application/json; charset=utf-8", // this
      dataType: "json", // and this
      success: function (response) {
        alert(response.message);
      },
      error: function (response) {
        alert(response.message);
      },
    });
  }
}
// LOGIN FROM HERE
function fncLogin() {
  let type = $("#styledCombo").val();
  let username = $("#txtusername").val();
  let password = $("#txtpassword").val();

  if (type == 1) {
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/api/users/login",
      data: JSON.stringify({
        type: type,
        c_logname: username,
        c_password: password,
      }),
      contentType: "application/json; charset=utf-8", // this
      dataType: "json", // and this
      success: function (response) {
        if (response.message == "11") {
          alert("User is not Exist! Check Username again.");
        } else if (response.message == "101") {
          alert("Password is incorrect!");
        } else if (response.message == "100") {
          const userObj = response.content
          localStorage.setItem('userId', userObj.n_jobseekerid);
          location.href = "./dashboard.html";
        } else {
          alert("Login error! Please contact Administrator!");
        }
      },
      error: function (response) {
        alert(response.message);
      },
    });
  } else if (type == 2) {
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/api/consultant/login",
      data: JSON.stringify({
        type: type,
        c_logname: username,
        c_password: password,
      }),
      contentType: "application/json; charset=utf-8", // this
      dataType: "json", // and this
      success: function (response) {
        if (response.message == "11") {
          alert("User is not Exist! Check Username again.");
        } else if (response.message == "101") {
          alert("Password is incorrect!");
        } else if (response.message == "200") {
          // localStorage.setItem('userId', userObj.n_jobseekerid); //set as consultant id
          location.href = "./dashboardAgent.html";
        } else {
          alert("Login error! Please contact Administrator!");
        }
      },
      error: function (response) {
        alert(response.message);
      },
    });
  } else if (type == 3) {
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/api/admin/login",
      data: JSON.stringify({
        type: type,
        c_name: username,
        c_password: password,
      }),
      contentType: "application/json; charset=utf-8", // this
      dataType: "json", // and this
      success: function (response) {
        if (response.message == "11") {
          alert("User is not Exist! Check Username again.");
        } else if (response.message == "101") {
          alert("Password is incorrect!");
        } else if (response.message == "300") {
          location.href = "./dashboardAdmin.html";
        } else {
          alert("Login error!");
        }
      },
      error: function (response) {
        alert(response.message);
      },
    });
  }
}

function fncSelectAgent() {

  let jobtype = $("#refjobtype").val();

  if (jobtype=null){

  }

  fetch("/combo/selectAgent")
    .then((response) => response.json())
    .then((data) => {
      // Populate the combo box with data
      const comboBox = document.getElementById("myComboBox");
      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id; // Set the value to match the data from the database
        option.textContent = item.name; // Set the text to display in the combo box
        comboBox.appendChild(option);
      });
    })
    .catch((error) => console.error("Error:", error));
}



