async function loadBooks(containerId) {
    try {
        const books = await ApiBooks.getBooks();
        UiRendererBooks.renderBooks(books, containerId);
    }
    catch (error) {
        console.error('Error loading books:', error);
    }
}