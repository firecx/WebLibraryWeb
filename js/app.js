async function loadAuthors(containerId) {
    try {
        const authors = await apiAuthors.getAuthors();
        uiRendererAuthors.renderAuthors(authors, containerId);
    }
    catch (error) {
        console.error('Error loading authors:', error);
    }
}

async function loadAuthor(containerId, id) {
    try {
        const authors = await apiAuthors.getAuthorsById(id);
        uiRendererAuthors.renderAuthors(authors, containerId);
    }
    catch (error) {
        console.error('Error loading authors:', error);
    }
}