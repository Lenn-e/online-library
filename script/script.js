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

const COVER_COLORS = [
    {background: "#4b8b81", border: "#345e57"},
    {background: "#7E7F9A", border: "#535679"},
    {background: "#90a5b0", border: "#748690"},
    {background: "#d3a117", border: "#b18610"},
    {background: "#E0612A", border: "#c35322"},
    {background: "#723939", border: "#552a2a"},
    {background: "#cb6c89", border: "#a1576d"}
]

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

Book.prototype.getCoverColor = function() {
    let rand = Math.floor(Math.random() * COVER_COLORS.length);
    let length = COVER_COLORS.length;
    console.log("rand: " + rand, "array length: " + length)
    return COVER_COLORS[rand];
    /* return COVER_COLORS[Math.round(Math.random() * COVER_COLORS.length)]; */
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
    if (!((window.innerHeight + window.scrollY) >= document.body.offsetHeight)) {
        window.scrollTo({ top: 10000, behavior: 'smooth' });
    }
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
    this.childNodes[0].classList.toggle("hide");
}

function bookToNode(book) {
    let outterContainer = document.createElement('div');
    outterContainer.classList.add('book-item');
    outterContainer.setAttribute("id", book.ID);

    let titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    let coverColor = book.getCoverColor();
    titleContainer.style.background = coverColor.background;
    titleContainer.style["border-color"] = coverColor.border;

    let titleDisplay = document.createElement('h2');
    titleDisplay.textContent = book.title;

    let authorDisplay = document.createElement('h3');
    authorDisplay.textContent = book.author;

    let pageNumDisplay = document.createElement('div');
    pageNumDisplay.classList.add("page-num");
    pageNumDisplay.textContent = `${book.pageNum} pages`;

    let isReadDisplay = document.createElement('div');
    isReadDisplay.classList.add("read-display");
    let unText = document.createElement('span');
    let readText = document.createElement('span');
    unText.textContent = "UN";
    readText.textContent = "READ";
    unText.classList.add("un-text");
    isReadDisplay.appendChild(unText);
    isReadDisplay.appendChild(readText);

    if(book.isRead) {
        unText.classList.add("hide");
        isReadDisplay.classList.toggle("read");
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

