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
      const textID = document.createElement("p");
      textID.innerText = bookObject.id;

      const textTitle = document.createElement("p");
      textTitle.innerText = bookObject.title;

      const textAuthor = document.createElement("p");
      textAuthor.innerText = bookObject.year;

      const textContainer = document.createElement("div");
      textContainer.classList.add("inner");
      textContainer.append(textID, textTitle, textAuthor);

      const container = document.createElement("div");
      container.classList.add("container");
      container.append(textContainer);
      container.setAttribute("id", `book-${bookObject.id}`);

      if (bookObject.unFinished) {
        const undoButton = document.createElement("button");
        undoButton.classList.add("btn", "btn-primary");
        undoButton.innerText = "Undo";

        undoButton.addEventListener("click", function () {
          undoBookFromCompleted(bookObject.id);
        });

        const trashButton = document.createElement("button");
        trashButton.classList.add("btn", "btn-primary");
        trashButton.innerText = " Delete";

        trashButton.addEventListener("click", function () {
          removeBookFromCompleted(bookObject.id);
        });

        container.append(undoButton, trashButton);
      } else {
        const checkButton = document.createElement("button");
        checkButton.classList.add("btn", "btn-primary");
        checkButton.innerText = "Finished";

        checkButton.addEventListener("click", function () {
          addBookToCompleted(bookObject.id);
        });

        container.append(checkButton);
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
      const uncompletedBookList = document.getElementById("bookList");
      uncompletedBookList.innerHTML = "";

      const compeletedBookList = document.getElementById("completed-todos");
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
  const userWrap = document.getElementById("userBadge");
  const loginBtn = document.getElementById("loginBtn");
  const helloUser = document.getElementById("helloUser");

  if (exist) {
    loginBtn.classList.add("d-none");
    userWrap.classList.remove("d-none");
  } else {
    loginBtn.classList.remove("d-none");
    userWrap.classList.add("d-none");
    location.reload();
  }
  nameOfUser.innerHTML = usernamePage.userName;
  helloUser.innerHTML = usernamePage.firstName + " " + usernamePage.lastName;
});

function logOut() {
  window.sessionStorage.removeItem("sessionLogin");
  location.href = "index.html";
}

//tampilkan
