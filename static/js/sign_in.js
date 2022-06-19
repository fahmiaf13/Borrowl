document.addEventListener("DOMContentLoaded", function userPage() {
  const formStr = sessionStorage.getItem("sessionLogin");
  const formObj = JSON.parse(formStr);
  let exist =
    formStr.length &&
    JSON.parse(sessionStorage.getItem("sessionLogin")).some(function (data) {
      return data.isLogin === true;
    });

  function findIndexUser() {
    for (const index in formObj)
      if (formObj[index].isLogin === true) {
        return formObj[index];
      }
    return false;
  }

  const usernamePage = findIndexUser();

  const nameOfUser = document.getElementById("user");
  const imgOfUserMd = document.getElementById("userImgMobile");

  const userWrap = document.getElementById("hello");
  const userWrapMd = document.getElementById("nameMobile");
  const nameWrapMd = document.getElementById("userNameMobile");

  const logInBtn = document.getElementById("loginBtn_mobile");
  const logOutBtn = document.getElementById("logoutBtn_mobile");
  const loginBtnWeb = document.getElementById("loginBtn");

  if (exist) {
    loginBtnWeb.classList.add("d-none");
    logOutBtn.classList.remove("d-none");
    logInBtn.classList.add("d-none");
    userWrap.classList.remove("d-none");
    imgOfUserMd.classList.remove("d-none");
  } else {
    loginBtnWeb.classList.remove("d-none");
    logInBtn.classList.remove("d-none");
    logOutBtn.classList.add("d-none");
    userWrap.classList.add("d-none");
    imgOfUserMd.classList.add("d-none");
    location.reload();
  }
  nameOfUser.innerHTML = usernamePage.userName;
  userWrapMd.innerHTML = usernamePage.firstName + " " + usernamePage.lastName;
  nameWrapMd.innerHTML = usernamePage.userName;
});

function signIn(Event) {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let dataLogin = JSON.parse(localStorage.getItem("formData"));

  if (!findUser()) {
    document.querySelector("form").reset();
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Wrong Username or Password!",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  } else {
    document.querySelector("form").reset();
    Swal.fire({
      icon: "success",
      title: "Great!",
      text: "Login Success",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    sessionStorage.setItem("sessionLogin", JSON.stringify(dataLogin));
    refreshafterlogin();
  }

  function findUser() {
    for (const index in dataLogin)
      if (dataLogin[index].userName === username && dataLogin[index].password === password) {
        console.log(dataLogin[index].isLogin);
        return (dataLogin[index].isLogin = true);
      }
    return false;
  }
  Event.preventDefault();
}

function refreshafterlogin() {
  setTimeout(function () {
    window.location.reload();
  }, 1500);
}

function logOut() {
  window.sessionStorage.removeItem("sessionLogin");
  location.reload();
}
