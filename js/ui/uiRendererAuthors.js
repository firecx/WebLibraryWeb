class UIRendererAuthors {
    static renderAuthors(authors, containerId) {
        const container = document.getElementById(containerId);

        if (!Array.isArray(authors)) {
            authors = [authors];
        }

        // Сортировка авторов по нику (алфавитно, регистронезависимо)
        try {
            authors.sort((a, b) => {
                const na = (a && a.nickname) ? a.nickname : '';
                const nb = (b && b.nickname) ? b.nickname : '';
                return na.localeCompare(nb, undefined, { sensitivity: 'base' });
            });
        }
        catch (e) {
            // В случае некорректной структуры просто продолжим рендер без сортировки
            console.warn('Authors sort failed:', e);
        }

        if (!authors || authors.length === 0) {
            container.innerHTML = '<p class="not-found">Not found</p>';
            return;
        }

        container.innerHTML = `
            <div class="authors-grid">
                ${authors.map(author => `
                    <div class="authors-card" onclick="selectAuthor(${author.id})">
                        <div class="authors-card-body">
                            <h3>${author.nickname}</h3>
                            <p>${author.surname}</p>
                            <p>${author.name}</p>
                        </div>
                        <div class="authors-card-actions">
                            <button class="btn btn-delete" onclick="event.stopPropagation(); deleteAuthor(${author.id})">Удалить</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}