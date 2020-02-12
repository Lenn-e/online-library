// DOM nodes
const createBookBtn = document.querySelector(".create-book-btn");
const bookTitleInput = document.querySelector(".book-title-input");

// Event listeners
createBookBtn.addEventListener('click', addBookToLibrary);

let myLibrary = [];

function Book(author, title, pageNum, isRead) {
    this.author = author;
    this.title = title;
}

function addBookToLibrary() {
    // do stuff here
    let title = bookTitleInput.value;
    console.log(title);
    myLibrary.push(new Book("placeholder", title));
}