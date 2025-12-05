async function createAuthor(formId = 'author-form') {
    const form = document.getElementById(formId);

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const author = {
            nickname: document.getElementById('nickname').value.trim(),
            name: document.getElementById('name').value.trim(),
            surname: document.getElementById('surname').value.trim()
        };

        try {
            await ApiAuthors.createAuthor(author);
            alert('Автор успешно добавлен.');
            window.location.href = 'authors-view.html';
        }
        catch (error) {
            console.error('Ошибка при создании автора:', error);
            alert('Не удалось добавить автора. Проверьте консоль.');
        }
    });
}