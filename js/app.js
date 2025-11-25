async function loadAuthors(containerId) {
    try {
        const authors = await apiAuthors.getAuthors();
        uiRendererAuthors.renderAuthors(authors, containerId);
    }
    catch (error) {
        console.error('Error loading authors:', error);
    }
}

async function loadBooks(containerId) {
    try {
        const books = await apiBooks.getBooks();
        uiRendererBooks.renderBooks(books, containerId);
    }
    catch (error) {
        console.error('Error loading books:', error);
    }
}