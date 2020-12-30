// Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor
function UI() {}

UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');

    // Create tr
    const row = document.createElement('tr');

    // Insert Element
    row.innerHTML =`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;

    // Append
    list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function(msg, classNm){
    // Create div
    const div = document.createElement('div');
    // Add Class
    div.className = `alert ${classNm} `;
    // Text Node
    div.appendChild(document.createTextNode(msg));
    // Get parent
    const container = document.querySelector('.container');
    const form = document.getElementById('book-form')

    container.insertBefore(div, form);

    // Timeout
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },3000)
}

// Delete Books
UI.prototype.deleteBooks = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
   
}

// Clear Fields
UI.prototype.clearFields = function(){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}


// EVENT LISTENER TO ADD BOOK
document.getElementById('book-form').addEventListener('submit',function(e){

 // Get form values
    const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value

 // Instantiate book
 const book = new Book(title, author, isbn);
 
 // Instantiate ui
    const ui = new UI();

 // Validate
    if(title === '' || author === '' || isbn ===''){
    //Show alert
        ui.showAlert(`Please fill in all the fields`, 'error')
    }else{

    // Add Book to List
        ui.addBookToList(book);

    //Show alert 
    ui.showAlert('Book Added!', 'success');

    // Clear Fields
        ui.clearFields();
    }   
 

    e.preventDefault();
});

// ADD EVENT LISTENER TO DELETE BOOK

document.getElementById('book-list').addEventListener('click',function(e){

  // Instantiate ui
    const ui = new UI();

  //Delete Books  
    ui.deleteBooks(e.target);

  //Show Alert
    ui.showAlert('Book Removed!','success') ;


    e.preventDefault();
});





