// DOM nodes
const createBookBtn = document.querySelector(".create-book-btn");
const bookAuthorInput = document.querySelector(".book-author-input");
const bookTitleInput = document.querySelector(".book-title-input");
const bookPageNumInput = document.querySelector(".book-pagenum-input");
const isReadInput = document.querySelector("#is-read");
const bookDisplay = document.querySelector(".book-display");

// Event listeners
createBookBtn.addEventListener('click', addBookToLibrary);

let myLibrary = [];

myLibrary.push(new Book('qwer', 'asdf', 'zxcv', true));
myLibrary.push(new Book('ayy', 'lmao', 'buddy', true));
myLibrary.push(new Book('idk', 'random', 'text', false));

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

function bookToNode(book) {
    let outterContainer = document.createElement('div');
    outterContainer.classList.add('book-item');

    let titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');

    let titleDisplay = document.createElement('h2');
    titleDisplay.textContent = book.title;

    let authorDisplay = document.createElement('h3');
    authorDisplay.textContent = book.author;

    let pageNumDisplay = document.createElement('div');
    pageNumDisplay.textContent = book.pageNum;

    let isReadDisplay = document.createElement('div');
    if(book.isRead) {
        isReadDisplay.classList.add('read');
    } else {
        isReadDisplay.classList.add('unread');
    }

    outterContainer.appendChild(titleContainer);
    outterContainer.appendChild(pageNumDisplay);
    outterContainer.appendChild(isReadDisplay);
    titleContainer.appendChild(titleDisplay);
    titleContainer.appendChild(authorDisplay);

    return outterContainer;
}

function displayBooks() {
    myLibrary.forEach(book => {
        bookDisplay.appendChild(bookToNode(book));
    })
}

