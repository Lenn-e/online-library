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


// Classes
class Library {
    constructor(books = []) {
        this.books = books;
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(bookNode) {
        // filter out the book with the given ID
        this.books = this.books.filter(book => book.DOMnode != bookNode);
    }

    displayAllBooks() {
        this.books.forEach(book => {
            book.displayBook();
        })
    }

    getBook(bookNode) {
        return this.books.find(bookToFind => bookToFind.DOMnode == bookNode);
    }

    get storedBooksNum() {
        return this.books.length;
    }
}

class Book {
    static COVER_COLORS = [
        {background: "#4b8b81", border: "#345e57"},
        {background: "#7E7F9A", border: "#535679"},
        {background: "#90a5b0", border: "#748690"},
        {background: "#d3a117", border: "#b18610"},
        {background: "#E0612A", border: "#c35322"},
        {background: "#723939", border: "#552a2a"},
        {background: "#cb6c89", border: "#a1576d"}
    ]

    constructor(author, title, pageNum, isRead) {
        this.author = author;
        this.title = title;
        this.pageNum = pageNum;
        this.isRead = isRead;
    }

    static getCoverColor() {
        let rand = Math.floor(Math.random() * this.COVER_COLORS.length);
        return this.COVER_COLORS[rand];
    }

    toggleRead() {
        this.isRead = !this.isRead;
    }

    displayBook() {
        const node = this.DOMnode;
        bookDisplay.appendChild(node);
        node.offsetWidth;
        node.classList.toggle("hidden");
    }

    set node(DOMnode) {
        this.DOMnode = DOMnode;
    }
}

// Event listener callbacks
function toggleAddBookModal() {
    addBookModal.classList.toggle("show-modal");
}

function removeBookFromLibrary() {
    let bookNode = this.parentNode.parentNode;
    myLibrary.removeBook(bookNode);

    bookNode.classList.toggle("hidden");
    setTimeout(removeBookDisplay, 500, bookNode);
}
function removeBookDisplay(bookNode) {
    bookDisplay.removeChild(bookNode);
}

function changeReadStatus() {
    const bookNode = this.parentNode.parentNode;
    myLibrary.getBook(bookNode).toggleRead();

    this.classList.toggle("read");
    this.childNodes[0].classList.toggle("hide");
}

function addBookToLibrary() {
    const book = createBook();
    
    myLibrary.addBook(book);
    book.displayBook();

    scrollToBook();
}

function createBook() {
    const author = bookAuthorInput.value;
    const title = bookTitleInput.value;
    const pagenum = bookPageNumInput.value;
    const isRead = isReadInput.checked;
    const book = new Book(author, title, pagenum, isRead);
    book.node = bookToNode(book);

    return book;
}

function scrollToBook() {
    addBookModal.classList.toggle("show-modal");
    if (!((window.innerHeight + window.scrollY) >= document.body.offsetHeight)) {
        window.scrollTo({ top: 10000, behavior: 'smooth' });
    }
}

// Should probably refactor at some point
function bookToNode(book) {
    let outterContainer = document.createElement('div');
    outterContainer.classList.add('book-item');

    let titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    let coverColor = Book.getCoverColor();
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

// display sample books
const sampleBooks = [
    new Book('Frank Herbert', 'Dune', '600', false, 1),
    new Book('Kurt Vonnegut', 'The Sirens of Titan', '300', true, 2),
    new Book('Blake Crouch', 'Recursion', '400', true, 3),
    new Book('Stuart Turton', 'The seven deaths of Evelyn Hardcastle','350', true, 4)
];

sampleBooks.forEach(book => {
    book.node = bookToNode(book);
});

let myLibrary = new Library(sampleBooks);

myLibrary.displayAllBooks();

