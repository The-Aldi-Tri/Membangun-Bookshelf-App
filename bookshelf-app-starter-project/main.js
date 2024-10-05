const books = [];

const STORAGE_KEY = "books";
const RENDER_BOOKSHELF_EVENT = "render-bookshelf";

let isSearchOn = false;
let searchedBooks = [];

let isEditing = false;

function isStorageExist() {
  if (typeof Storage === "undefined") {
    alert("Local storage is not supported.");
    return false;
  }
  return true;
}

function loadDataFromStorage() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));

  data?.forEach((item) => {
    books.push(item);
  });

  document.dispatchEvent(new Event(RENDER_BOOKSHELF_EVENT));
}

function saveBooksToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  document.dispatchEvent(new Event(RENDER_BOOKSHELF_EVENT));
}

function generateId() {
  return new Date().getTime();
}

function addBookHandler() {
  const newBook = {
    id: generateId(),
    title: document.getElementById("bookFormTitle").value,
    author: document.getElementById("bookFormAuthor").value,
    year: parseInt(document.getElementById("bookFormYear").value),
    isComplete: document.getElementById("bookFormIsComplete").checked,
  };

  books.push(newBook);
  saveBooksToStorage();
}

function markHandler(bookId, isComplete) {
  const book = books.find((item) => item.id === bookId);
  if (book !== undefined) {
    book.isComplete = isComplete;
    saveBooksToStorage();
  }
}

function deleteHandler(bookId) {
  const book = books.find((item) => item.id === bookId);
  if (book !== undefined && confirm(`Are you sure to delete ${book.title}?`)) {
    books.splice(books.indexOf(book), 1);
    saveBooksToStorage();
  }
}

function editHandler(bookId, bookTitle, bookAuthor, bookYear, bookIsComplete) {
  if (isEditing) {
    alert("Hanya bisa edit satu buku dalam satu waktu");
    return;
  }
  isEditing = true;
  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "editTitle");
  titleLabel.textContent = "Judul";
  const titleInput = document.createElement("input");
  titleInput.setAttribute("id", "editTitle");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("required", "");
  titleInput.value = bookTitle;
  const titleContainer = document.createElement("div");
  titleContainer.setAttribute("id", "editInput");
  titleContainer.append(titleLabel, titleInput);

  const authorLabel = document.createElement("label");
  authorLabel.setAttribute("for", "editAuthor");
  authorLabel.textContent = "Penulis: ";
  const authorInput = document.createElement("input");
  authorInput.setAttribute("id", "editAuthor");
  authorInput.setAttribute("type", "text");
  authorInput.setAttribute("required", "");
  authorInput.value = bookAuthor;
  const authorContainer = document.createElement("div");
  authorContainer.setAttribute("id", "editInput");
  authorContainer.append(authorLabel, authorInput);

  const yearLabel = document.createElement("label");
  yearLabel.setAttribute("for", "editYear");
  yearLabel.textContent = "Tahun: ";
  const yearInput = document.createElement("input");
  yearInput.setAttribute("id", "editYear");
  yearInput.setAttribute("type", "number");
  yearInput.setAttribute("required", "");
  yearInput.value = bookYear;
  const yearContainer = document.createElement("div");
  yearContainer.setAttribute("id", "editInput");
  yearContainer.append(yearLabel, yearInput);

  const isCompleteLabel = document.createElement("label");
  isCompleteLabel.setAttribute("for", "editIsComplete");
  isCompleteLabel.textContent = "Selesai dibaca";
  const isCompleteInput = document.createElement("input");
  isCompleteInput.setAttribute("id", "editIsComplete");
  isCompleteInput.setAttribute("type", "checkbox");
  isCompleteInput.checked = bookIsComplete;
  const isCompleteContainer = document.createElement("div");
  isCompleteContainer.setAttribute("id", "editInputInline");
  isCompleteContainer.append(isCompleteLabel, isCompleteInput);

  const cancelButton = document.createElement("button");
  cancelButton.setAttribute("type", "button");
  cancelButton.setAttribute("id", "editCancelButton");
  cancelButton.textContent = "Batal";

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("id", "editSubmitButton");
  submitButton.textContent = "Simpan";

  const buttonContainer = document.createElement("div");
  buttonContainer.append(cancelButton, submitButton);

  const editForm = document.createElement("form");
  editForm.setAttribute("id", `editForm`);
  editForm.append(
    titleContainer,
    authorContainer,
    yearContainer,
    isCompleteContainer,
    buttonContainer
  );

  const bookItem = document.querySelector(`[data-bookid="${bookId}"]`);
  bookItem.innerHTML = "";
  bookItem.append(editForm);

  cancelButton.addEventListener("click", function () {
    bookItem.replaceWith(
      createBookItemElement({
        id: bookId,
        title: bookTitle,
        author: bookAuthor,
        year: bookYear,
        isComplete: bookIsComplete,
      })
    );
    isEditing = false;
  });

  editForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const book = books.find((item) => item.id === bookId);
    if (book !== undefined) {
      book.title = event.target.querySelector("#editTitle").value;
      book.author = event.target.querySelector("#editAuthor").value;
      book.year = parseInt(event.target.querySelector("#editYear").value);
      book.isComplete = event.target.querySelector("#editIsComplete").checked;
      saveBooksToStorage();
    }
    isEditing = false;
  });
}

function createBookItemElement(bookObject) {
  const { id, title, author, year, isComplete } = bookObject;

  const textTitle = document.createElement("h3");
  textTitle.innerText = title;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = `Penulis: ${author}`;

  const textYear = document.createElement("p");
  textYear.innerText = `Tahun: ${year}`;

  const isCompleteButton = document.createElement("button");
  isCompleteButton.innerText = isComplete
    ? "Belum selesai dibaca"
    : "Selesai dibaca";
  isCompleteButton.setAttribute("data-testid", "bookItemIsCompleteButton");
  isCompleteButton.setAttribute("class", "markButton");
  isCompleteButton.addEventListener("click", function () {
    markHandler(id, !isComplete);
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Hapus buku";
  deleteButton.setAttribute("data-testid", "bookItemDeleteButton");
  deleteButton.setAttribute("class", "deleteButton");
  deleteButton.addEventListener("click", function () {
    deleteHandler(id);
  });

  const editButton = document.createElement("button");
  editButton.innerText = "Edit buku";
  editButton.setAttribute("data-testid", "bookItemEditButton");
  editButton.setAttribute("class", "editButton");
  editButton.addEventListener("click", function () {
    editHandler(id, title, author, year, isComplete);
  });

  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "actionButton");
  buttonContainer.append(isCompleteButton, deleteButton, editButton);

  const bookItemContainer = document.createElement("div");
  bookItemContainer.setAttribute("data-bookid", id);
  bookItemContainer.setAttribute("data-testid", "bookItem");
  bookItemContainer.setAttribute("class", "bookItem");
  bookItemContainer.append(textTitle, textAuthor, textYear, buttonContainer);

  return bookItemContainer;
}

function searchBooksHandler() {
  const keyword = document.getElementById("searchBookTitle").value;
  if (!keyword) {
    alert("Kata kunci pencarian tidak boleh kosong");
    return;
  }

  searchedBooks = books.filter((book) => book.title.includes(keyword));
  isSearchOn = true;

  const clearSearchButton = document.createElement("button");
  clearSearchButton.setAttribute("id", "clearSearchButton");
  clearSearchButton.innerText = "Hapus pencarian";
  clearSearchButton.addEventListener("click", function () {
    isSearchOn = false;
    searchedBooks = [];
    searchResultContainer.remove();
    document.getElementById("searchBookTitle").value = "";
    document.dispatchEvent(new Event(RENDER_BOOKSHELF_EVENT));
  });

  const keywordElement = document.createElement("h3");
  keywordElement.setAttribute("id", "keyword");
  keywordElement.innerText = `Kata kunci: "${keyword}"`;

  const searchResultElement = document.createElement("h3");
  searchResultElement.innerText = `Hasil pencarian: ${searchedBooks.length} buku ditemukan`;

  document.querySelector("#searchResultContainer")?.remove();

  const searchResultContainer = document.createElement("div");
  searchResultContainer.setAttribute("id", "searchResultContainer");
  searchResultContainer.setAttribute("class", "searchResult");
  searchResultContainer.append(
    keywordElement,
    searchResultElement,
    clearSearchButton
  );

  const searchBookSection = document.querySelector(".searchBookSection");
  searchBookSection.append(searchResultContainer);

  document.dispatchEvent(new Event(RENDER_BOOKSHELF_EVENT));
}

document.addEventListener("DOMContentLoaded", function () {
  if (isStorageExist()) {
    loadDataFromStorage();
  }

  const bookForm = document.getElementById("bookForm");
  bookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    isEditing = false;
    isSearchOn = false;
    document.querySelector("#searchResultContainer")?.remove();
    addBookHandler();
  });

  const searchBookForm = document.getElementById("searchBook");
  searchBookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    searchBooksHandler();
  });

  const isCompleteCheckbox = document.getElementById("bookFormIsComplete");
  isCompleteCheckbox.addEventListener("change", function () {
    const bookFormSpan = document.getElementById("choice");
    if (isCompleteCheckbox.checked) {
      bookFormSpan.innerText = "Selesai dibaca";
    } else {
      bookFormSpan.innerText = "Belum selesai dibaca";
    }
  });
});

document.addEventListener(RENDER_BOOKSHELF_EVENT, function () {
  const completeBookList = document.getElementById("completeBookList");
  const incompleteBookList = document.getElementById("incompleteBookList");

  completeBookList.innerHTML = "";
  incompleteBookList.innerHTML = "";

  if (isSearchOn) {
    searchedBooks.map((book) => {
      const bookElement = createBookItemElement(book);
      if (book.isComplete) {
        completeBookList.append(bookElement);
      } else {
        incompleteBookList.append(bookElement);
      }
    });
  } else {
    books.map((book) => {
      const bookElement = createBookItemElement(book);
      if (book.isComplete) {
        completeBookList.append(bookElement);
      } else {
        incompleteBookList.append(bookElement);
      }
    });
  }
});
