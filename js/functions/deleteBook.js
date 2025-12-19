async function deleteBook(id) {
    try {
        if (!id) return;
        const ok = confirm('Вы уверены, что хотите удалить книгу?');
        if (!ok) return;

        await ApiBooks.deleteBook(id);
        if (typeof loadBooks === 'function') {
            await loadBooks('data-container');
        }
    }
    catch (error) {
        console.error('Error deleting book:', error);
        alert('Ошибка при удалении книги. Проверьте консоль.');
    }
}
