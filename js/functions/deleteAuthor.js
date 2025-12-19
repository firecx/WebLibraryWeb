async function deleteAuthor(id) {
    try {
        if (!id) return;
        const ok = confirm('Вы уверены, что хотите удалить автора?');
        if (!ok) return;

        await ApiAuthors.deleteAuthor(id);
        // reload list
        if (typeof loadAuthors === 'function') {
            await loadAuthors('data-container');
        }
    }
    catch (error) {
        console.error('Error deleting author:', error);
        alert('Ошибка при удалении автора. Проверьте консоль.');
    }
}
