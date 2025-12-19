async function createBook(formId = 'book-form') {
    const form = document.getElementById(formId);

    if (!form) return;

    if (form.dataset.createBookAttached === 'true') return;
    form.dataset.createBookAttached = 'true';

    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');

    const authorSelect = form.querySelector('[name="authorId"], #authorId');

    async function populateAuthors() {
        if (!authorSelect) return;

        try {
            const authors = await ApiAuthors.getAuthors();

            // clear existing
            authorSelect.innerHTML = '';

            if (!Array.isArray(authors) || authors.length === 0) {
                const opt = document.createElement('option');
                opt.value = '';
                opt.textContent = 'Авторы не найдены. Добавьте автора.';
                opt.disabled = true;
                opt.selected = true;
                authorSelect.appendChild(opt);
                if (submitBtn) submitBtn.disabled = true;
                return;
            }

            const placeholder = document.createElement('option');
            placeholder.value = '';
            placeholder.textContent = 'Выберите автора';
            placeholder.selected = true;
            placeholder.disabled = true;
            authorSelect.appendChild(placeholder);

            authors.forEach(a => {
                const opt = document.createElement('option');
                const realId = a.id ?? a.authorId ?? a._id ?? '';
                const realNick = a.nickname ?? `${a.name || ''} ${a.surname || ''}`.trim();
                // store id and nickname in data attributes; option.value holds nickname (server expects author.nickname)
                opt.value = realNick || '';
                if (realId) opt.dataset.authorId = realId;
                if (realNick) opt.dataset.nickname = realNick;
                opt.textContent = a.nickname ? `${a.nickname} (${a.name || ''} ${a.surname || ''})` : `${a.name || ''} ${a.surname || ''}`;
                authorSelect.appendChild(opt);
            });

            if (submitBtn) submitBtn.disabled = false;
        }
        catch (err) {
            console.error('Ошибка при загрузке авторов:', err);
            authorSelect.innerHTML = '';
            const opt = document.createElement('option');
            opt.value = '';
            opt.textContent = 'Ошибка загрузки авторов';
            opt.disabled = true;
            opt.selected = true;
            authorSelect.appendChild(opt);
            if (submitBtn) submitBtn.disabled = true;
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameEl = form.querySelector('[name="name"], #name');
        const authorIdEl = form.querySelector('[name="authorId"], #authorId');
        const seriesEl = form.querySelector('[name="series"], #series');
        const volumeEl = form.querySelector('[name="volume"], #volume');

        // determine selected option and author nickname (server expects author object with nickname)
        let selectedAuthorNickname = null;
        if (authorIdEl) {
            const selectedOption = authorIdEl.options ? authorIdEl.options[authorIdEl.selectedIndex] : null;
            const dataNick = selectedOption && selectedOption.dataset ? selectedOption.dataset.nickname : null;
            const val = authorIdEl.value;
            selectedAuthorNickname = dataNick || val || null;
        }

        const book = {
            name: nameEl ? nameEl.value.trim() : '',
            series: seriesEl ? seriesEl.value.trim() : '',
            volume: volumeEl ? volumeEl.value.trim() : '',
            author: selectedAuthorNickname ? { nickname: selectedAuthorNickname } : null
        };

        try {
            if (submitBtn) submitBtn.disabled = true;
            await ApiBooks.createBook(book);
            alert('Книга успешно добавлена.');
            window.location.href = 'books-view.html';
        }
        catch (error) {
            console.error('Ошибка при создании книги:', error);
            alert('Не удалось добавить книгу. Проверьте консоль.');
        }
        finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}


document.addEventListener('DOMContentLoaded', () => createBook());
document.addEventListener('DOMContentLoaded', () => {
    createBook();
    // populate authors when DOM is ready
    const form = document.getElementById('book-form');
    if (form) {
        const sel = form.querySelector('[name="authorId"], #authorId');
        if (sel) {
            // If ApiAuthors is available, populate; else, createBook() will still work
            if (typeof ApiAuthors !== 'undefined') {
                // call populateAuthors defined inside createBook by invoking createBook again
                // but to avoid complexity, directly fetch here
                (async () => {
                    try {
                        const authors = await ApiAuthors.getAuthors();
                        sel.innerHTML = '';
                        if (!Array.isArray(authors) || authors.length === 0) {
                            const opt = document.createElement('option');
                            opt.value = '';
                            opt.textContent = 'Авторы не найдены. Добавьте автора.';
                            opt.disabled = true;
                            opt.selected = true;
                            sel.appendChild(opt);
                            const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
                            if (submitBtn) submitBtn.disabled = true;
                            return;
                        }
                        const placeholder = document.createElement('option');
                        placeholder.value = '';
                        placeholder.textContent = 'Выберите автора';
                        placeholder.selected = true;
                        placeholder.disabled = true;
                        sel.appendChild(placeholder);
                        authors.forEach(a => {
                            const opt = document.createElement('option');
                            const realId = a.id ?? a.authorId ?? a._id ?? '';
                            const realNick = a.nickname ?? `${a.name || ''} ${a.surname || ''}`.trim();
                            opt.value = realNick || '';
                            if (realId) opt.dataset.authorId = realId;
                            if (realNick) opt.dataset.nickname = realNick;
                            opt.textContent = a.nickname ? `${a.nickname} (${a.name || ''} ${a.surname || ''})` : `${a.name || ''} ${a.surname || ''}`;
                            sel.appendChild(opt);
                        });
                    }
                    catch (err) {
                        console.error('Ошибка при загрузке авторов:', err);
                    }
                })();
            }
        }
    }
});
