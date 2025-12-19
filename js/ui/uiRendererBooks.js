class UiRendererBooks {
    static renderBooks(books, containerId) {
        const container = document.getElementById(containerId);

        if (!Array.isArray(books)) {
            books = [books];
        }

        if (!books || books.length === 0) {
            container.innerHTML = '<p class="not-found">Not found</p>';
            return;
        }

        container.innerHTML = `
            <div class="books-grid">
                ${books.map(book => `
                    <div class="book-card" onclick="selectBook(${book.id})">
                        <div class="book-card-body">
                            <h3>${book.name}</h3>
                            <p>by ${book.author && book.author.nickname ? book.author.nickname : ''}</p>
                            <p>series: "${book.series}"</p>
                            <p>volume: "${book.volume}"</p>
                        </div>
                        <div class="book-card-actions">
                            <button class="btn btn-delete" onclick="event.stopPropagation(); deleteBook(${book.id})">Удалить</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}