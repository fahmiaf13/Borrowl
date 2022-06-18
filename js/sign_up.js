const signUp = function signUp(event) {
  let firstName = document.getElementById("firstname").value,
    lastName = document.getElementById("lastname").value,
    userName = document.getElementById("username").value,
    password = document.getElementById("password").value;
  isLogin = false;

  let formData = JSON.parse(localStorage.getItem("formData")) || [];
  // create variable formdata and get item from local storage named 'formdata'

  let exist =
    formData.length &&
    JSON.parse(localStorage.getItem("formData")).some(function (data) {
      return data.userName.toLowerCase() == userName.toLowerCase();
    });
  // create variable exist that contains to parsing between data input by user and data from local storage
  if (!exist) {
    formData.push({ firstName, lastName, userName, password, isLogin });
    localStorage.setItem("formData", JSON.stringify(formData));
    document.querySelector("form").reset();
    document.getElementById("username").focus();

    location.href = "index.html";
  } else {
    document.querySelector("form").reset();

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Username or Password are already used",
      footer: "Please use another name!",
      showConfirmButton: false,
      timer: 2000,
    });
  }

  event.preventDefault();
};
