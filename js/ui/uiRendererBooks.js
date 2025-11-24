class UiRendererBooks {
    renderBooks(books, containerId) {
        this.container = document.getElementById(containerId);

        if (!Array.isArray(books)) {
            books = [books];
        }

        if (!books || books.length === 0) {
            this.container.innerHTML = '<p>Not found</p>';
            return;
        }

        this.container.innerHTML = `
            <div class="books-grid">
                ${books.map(book => `
                    <div class="book-card" onclick="selectBook(${book.id})">
                        <h3>${book.title}</h3>
                        <p>by ${book.authorNickname}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

const uiRendererBooks = new UiRendererBooks();