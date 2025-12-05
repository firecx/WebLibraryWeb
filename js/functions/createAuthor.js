async function createAuthor(formId = 'author-form') {
    const form = document.getElementById(formId);

    if (!form) return;

    if (form.dataset.createAuthorAttached === 'true') return;
    form.dataset.createAuthorAttached = 'true';

    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nicknameEl = form.querySelector('[name="nickname"], #nickname');
        const nameEl = form.querySelector('[name="name"], #name');
        const surnameEl = form.querySelector('[name="surname"], #surname');

        const author = {
            nickname: nicknameEl ? nicknameEl.value.trim() : '',
            name: nameEl ? nameEl.value.trim() : '',
            surname: surnameEl ? surnameEl.value.trim() : ''
        };

        try {
            if (submitBtn) submitBtn.disabled = true;
            await ApiAuthors.createAuthor(author);
            alert('Автор успешно добавлен.');
            window.location.href = 'authors-view.html';
        }
        catch (error) {
            console.error('Ошибка при создании автора:', error);
            alert('Не удалось добавить автора. Проверьте консоль.');
        }
        finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}


document.addEventListener('DOMContentLoaded', () => createAuthor());