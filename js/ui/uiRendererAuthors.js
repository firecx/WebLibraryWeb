class UIRendererAuthors {
    renderAuthors(authors, containerId) {
        this.container = document.getElementById(containerId);

        if (!Array.isArray(authors)) {
            authors = [authors];
        }

        if (!authors || authors.length === 0) {
            this.container.innerHTML = '<p>Not found</p>';
            return;
        }
        
        this.container.innerHTML = `
            <div class="authors-grid">
                ${authors.map(author => `
                    <div class="authors-card" onclick="selectAuthor(${author.id})">
                        <h3>${author.nickname}</h3>
                        <p>${author.surname}</p>
                        <p>${author.name}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

const uiRendererAuthors = new UIRendererAuthors();