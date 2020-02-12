// DOM nodes
const createBookBtn = document.querySelector(".create-book-btn");
const bookAuthorInput = document.querySelector(".book-author-input");
const bookTitleInput = document.querySelector(".book-title-input");
const bookPageNumInput = document.querySelector(".book-pagenum-input");
const isReadInput = document.querySelector("#is-read");

// Event listeners
createBookBtn.addEventListener('click', addBookToLibrary);

let myLibrary = [];

function Book(author, title, pageNum, isRead) {
    this.author = author;
    this.title = title;
    this.pageNum = pageNum;
    this.isRead = isRead;
}

function addBookToLibrary() {
    let author = bookAuthorInput.value;
    let title = bookTitleInput.value;
    let pagenum = bookPageNumInput.value;
    let isRead = isReadInput.checked;
    myLibrary.push(new Book(author, title, pagenum, isRead));
}