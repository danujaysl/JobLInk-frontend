function fnReg() {
  let js_name = $("#txtname").val();
  let js_age = $("#txtage").val();
  let js_tele = $("#txttele").val();
  let js_username = $("#txtusername").val();
  let js_password = $("#txtpassword").val();
  let js_repassword = $("#textrepassword").val();

  if (js_password != js_repassword) {
    alert("Re-typed password is not match");
  }

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
      url: "http://localhost:8080/api/users/login", // API SHOULD BE CHANGED
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
