async function loadAuthors() {
    try {
        const authors = await apiAuthors.getAuthors();
        uiRendererAuthors.renderAuthors(authors);
    }
    catch (error) {
        console.error('Error loading authors:', error);
    }
}