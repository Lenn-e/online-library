// DOM nodes
const createBookBtn = document.querySelector(".create-book-btn");
const bookAuthorInput = document.querySelector(".book-author-input");
const bookTitleInput = document.querySelector(".book-title-input");
const bookPageNumInput = document.querySelector(".book-pagenum-input");
const isReadInput = document.querySelector("#is-read");
const bookDisplay = document.querySelector(".book-display");
const addBookBtn = document.querySelector(".add-book");
const addBookModal = document.querySelector(".modal");
const closeAddBookModalBtn = document.querySelector(".close-btn");

// Event listeners
createBookBtn.addEventListener('click', addBookToLibrary);
addBookBtn.addEventListener('click', toggleAddBookModal);
closeAddBookModalBtn.addEventListener('click', toggleAddBookModal);
window.addEventListener('click', event => {
    if(event.target === addBookModal) {
        toggleAddBookModal();
    }
});

let myLibrary = [];

myLibrary.push(new Book('Frank Herbert', 'Dune', '600', false, 1));
myLibrary.push(new Book('Kurt Vonnegut', 'The Sirens of Titan', '300', true, 2));
myLibrary.push(new Book('Blake Crouch', 'Recursion', '400', true, 3));
myLibrary.push(new Book('Stuart Turton', 'The seven deaths of Evelyn Hardcastle','350', true, 4));

function toggleAddBookModal() {
    addBookModal.classList.toggle("show-modal");
}

function Book(author, title, pageNum, isRead, ID) {
    this.author = author;
    this.title = title;
    this.pageNum = pageNum;
    this.isRead = isRead;
    this.ID = ID;
}

Book.prototype.toggleRead = function() {
    this.isRead = !this.isRead;
}

function addBookToLibrary() {
    let author = bookAuthorInput.value;
    let title = bookTitleInput.value;
    let pagenum = bookPageNumInput.value;
    let isRead = isReadInput.checked;
    let ID = title + pagenum + myLibrary.length;
    let book = new Book(author, title, pagenum, isRead, ID);
    myLibrary.push(book);
    displayBook(book);
    addBookModal.classList.toggle("show-modal");
    window.scrollTo({ top: 10000, behavior: 'smooth' });
}

function removeBookFromLibrary() {
    let bookNode = this.parentNode.parentNode;
    let bookID = bookNode.id;

    myLibrary = myLibrary.filter(book => book.ID != bookID);

    bookNode.classList.toggle("hidden");
    setTimeout(removeBookDisplay, 500, bookNode);
}

function removeBookDisplay(bookNode) {
    bookDisplay.removeChild(bookNode);
}

function changeReadStatus() {
    let bookNode = this.parentNode.parentNode;
    let bookID = bookNode.id;

    let book = myLibrary.find(bookToFind => bookToFind.ID == bookID);
    book.toggleRead();

    this.classList.toggle("read");
}

function bookToNode(book) {
    let outterContainer = document.createElement('div');
    outterContainer.classList.add('book-item');
    outterContainer.setAttribute("id", book.ID);

    let titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');

    let titleDisplay = document.createElement('h2');
    titleDisplay.textContent = book.title;

    let authorDisplay = document.createElement('h3');
    authorDisplay.textContent = book.author;

    let pageNumDisplay = document.createElement('div');
    pageNumDisplay.classList.add("page-num");
    pageNumDisplay.textContent = `${book.pageNum} pages`;

    let isReadDisplay = document.createElement('div');
    isReadDisplay.classList.add('read-indicator');
    if(book.isRead) {
        isReadDisplay.classList.add('read');
    }
    isReadDisplay.addEventListener("click", changeReadStatus);

    let removeButton = document.createElement('span');
    removeButton.innerHTML = "&times;";
    removeButton.classList.add("remove-btn");
    removeButton.addEventListener("click", removeBookFromLibrary);

    let metaContainer = document.createElement('div');
    metaContainer.classList.add('meta-container');

    outterContainer.appendChild(titleContainer);
    outterContainer.appendChild(metaContainer);
    metaContainer.appendChild(pageNumDisplay);
    metaContainer.appendChild(isReadDisplay);
    metaContainer.appendChild(removeButton);
    titleContainer.appendChild(titleDisplay);
    titleContainer.appendChild(authorDisplay);
    outterContainer.classList.toggle("hidden");

    return outterContainer;
}

function displayAllBooks() {
    myLibrary.forEach(book => {
        displayBook(book);
    })
}

function displayBook(book) {
    let bookNode = bookToNode(book);
    bookDisplay.appendChild(bookNode);
    bookNode.offsetWidth = bookNode.offsetWidth;
    bookNode.classList.toggle("hidden");
    
}

displayAllBooks();

