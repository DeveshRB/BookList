class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{

    addBookToList(book){
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

    showAlert(msg, classNm){
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

    deleteBooks(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
       
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// LOCAL STORAGE
 class Store{
     static getBook(){
         let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
     }

     static displayBooks(){
        const books = Store.getBook();

        const ui = new UI;

        books.forEach(function(book){
            ui.addBookToList(book);
        });
     }

     static addBook(book){
        const books = Store.getBook();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
     }

     static removeBook(isbn){
        const books = Store.getBook();

        books.forEach(function(book, index){
            if(book.isbn == isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
     }
 }

// DOM LOAD EVENT
document.addEventListener('DOMContentLoaded', Store.displayBooks);

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

       //Add to LS
            Store.addBook(book);    
   
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

     //Remove Books From LS
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
   
     //Show Alert
       ui.showAlert('Book Removed!','success') ;
   
   
       e.preventDefault();
 });

