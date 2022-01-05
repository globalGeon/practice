/* 
1. submit
 - 입력값으로 구성된 book 인스턴스 생성
 - book을 list에 추가
 - book을 ls에 추가
 - book 추가 alert 표시

2. x 클릭 시
 - book을 list에서 제거
 - book을 ls에서 제거
 - book 제거 alert 표시

3. DOMContentLoadead
 - ls의 books를 list에 렌더링
*/

/* book list 렌더링 */
document.addEventListener('DOMContentLoaded', (e) => {
    var books = JSON.parse(localStorage.getItem('books'));
    books.forEach((book) => {
        var list = document.getElementById('book-list');
        var row = document.createElement('tr');
        row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td>
                    <a href="" class="btn delete">X</a>
                </td>
        `;
        list.appendChild(row);
    })
})

/* submit */
var bookForm = document.querySelector('#book-form');
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // book 객체 생성
    var book = {
        title: document.querySelector('#title').value,
        author: document.querySelector('#author').value,
        isbn: document.querySelector('#isbn').value
    }

    // list 추가
    var bookList = document.querySelector('#book-list');
    var row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>
            <a href="" class="btn delete">X</a>
        </td>
    `;
    bookList.appendChild(row);

    // ls 추가
    var books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));

    // alert
    var div = document.createElement('div');
    div.className = 'alert';
    div.appendChild(document.createTextNode('Book Added'));
    var container = document.getElementById('container');
    var form = document.getElementById('book-form');
    container.insertBefore(div, form);
    setTimeout(() => document.querySelector('.alert').remove(), 3000);

});

/* 
2. x 클릭 시
 - book을 list에서 제거
 - book을 ls에서 제거
 - book 제거 alert 표시
*/

document.querySelector('#book-list').addEventListener('click', (e) => {
    e.preventDefault();
    // list에서 제거
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove();
    }

    // ls에서 제거
    var books = JSON.parse(localStorage.getItem('books'));
    books.forEach((book, index) => {
        if (e.target.parentElement.previousElementSibling.textContent === book.isbn) {
            books.splice(index, 1);
        }
    });
    localStorage.setItem('books', JSON.stringify(books));
    
    // 제거 alert
    var div = document.createElement('div');
    div.className = 'alert remove';
    div.innerHTML = `Book removed`;
    var container = document.getElementById('container');
    var form = document.getElementById('book-form');
    container.insertBefore(div, form);
    setTimeout(() => {
        if(div.classList.contains('alert')) {
            div.remove();
        }
    },3000);
})