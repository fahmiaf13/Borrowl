document.addEventListener("DOMContentLoaded", function () {
  const submitBook = document.getElementById("form");
  submitBook.addEventListener("submit", function (e) {
    e.preventDefault();
    addBooks();
  });
  const books = [];
  const RENDER_EVENT = "render-todo";

  function addBooks() {
    const generatedId = generateId();
    const titleBook = document.getElementById("title").value;
    const authorBook = document.getElementById("author").value;
    const yearBook = document.getElementById("year").value;

    function generateId() {
      return +new Date();
    }

    function generateBookToObject(id, title, author, year, unFinished) {
      return {
        id,
        title,
        author,
        year,
        unFinished,
      };
    }

    const bookObject = generateBookToObject(generatedId, titleBook, authorBook, yearBook, false);
    books.push(bookObject);

    function makeBook(bookObject) {
      const bookIcon = document.createElement("img");
      bookIcon.src = "img/book-logo.svg";

      const textTitle = document.createElement("div");
      textTitle.classList.add("fw-bold", "text-secondary");
      textTitle.innerText = bookObject.title;

      const textAuthor = document.createElement("div");
      textAuthor.innerText = bookObject.author;

      const textYear = document.createElement("div");
      textYear.innerText = bookObject.year;

      const contentWrap = document.createElement("div");
      contentWrap.classList.add("content-wrap");
      contentWrap.append(textTitle, textAuthor, textYear);

      const iconWrap = document.createElement("div");
      iconWrap.classList.add("icon-wrap");

      const container = document.createElement("div");
      container.classList.add("listBuku", "container");
      container.append(bookIcon, contentWrap, iconWrap);
      container.setAttribute("id", `book-${bookObject.id}`);

      if (bookObject.unFinished) {
        const undoButton = document.createElement("button");
        undoButton.classList.add("undoIcon-btn");

        undoButton.addEventListener("click", function () {
          undoBookFromCompleted(bookObject.id);
        });

        const trashButton = document.createElement("button");
        trashButton.classList.add("trashIcon-btn");

        trashButton.addEventListener("click", function () {
          removeBookFromCompleted(bookObject.id);
        });

        iconWrap.append(undoButton, trashButton);
      } else {
        const checkButton = document.createElement("button");
        checkButton.classList.add("checkIcon-btn");

        checkButton.addEventListener("click", function () {
          addBookToCompleted(bookObject.id);
        });

        iconWrap.append(checkButton);
      }

      return container;
    }
    // remove and undo function
    function removeBookFromCompleted(bookID) {
      const bookTarget = findBookIndex(bookID);

      if (bookTarget === -1) return;

      books.splice(bookTarget, 1);
      document.dispatchEvent(new Event(RENDER_EVENT));
    }

    function findBookIndex(bookID) {
      for (const index in books) {
        if (books[index].id === bookID) {
          return index;
        }
      }
      return -1;
    }

    function undoBookFromCompleted(bookID) {
      const bookTarget = findBook(bookID);

      if (bookTarget == null) return;

      bookTarget.unFinished = false;
      document.dispatchEvent(new Event(RENDER_EVENT));
    }

    ///////////////////////// end //////////////////

    function addBookToCompleted(bookID) {
      const bookTarget = findBook(bookID);

      if (bookTarget == null) return;

      bookTarget.unFinished = true;
      document.dispatchEvent(new Event(RENDER_EVENT));
    }

    function findBook(bookID) {
      for (const bookItem of books) {
        if (bookItem.id === bookID) {
          return bookItem;
        }
      }
      return null;
    }

    document.addEventListener(RENDER_EVENT, function () {
      console.log(books);
      const uncompletedBookList = document.getElementById("listBuku");
      uncompletedBookList.innerHTML = "";

      const compeletedBookList = document.getElementById("selesaiDibaca");
      compeletedBookList.innerHTML = "";

      for (const bookItem of books) {
        const bookListElement = makeBook(bookItem);
        if (!bookItem.unFinished) {
          uncompletedBookList.append(bookListElement);
        } else {
          compeletedBookList.append(bookListElement);
        }
      }
    });
    document.dispatchEvent(new Event(RENDER_EVENT));
  }
});

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
  helloUser.innerHTML = usernamePage.firstName + " " + usernamePage.lastName;
  userWrapMd.innerHTML = usernamePage.firstName + " " + usernamePage.lastName;
  nameWrapMd.innerHTML = usernamePage.userName;
});

function logOut() {
  window.sessionStorage.removeItem("sessionLogin");
  location.href = "index.html";
}

//tampilkan
