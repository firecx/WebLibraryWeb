async function loadAuthors(containerId) {
    try {
        const authors = await apiAuthors.getAuthors();
        uiRendererAuthors.renderAuthors(authors, containerId);
    }
    catch (error) {
        console.error('Error loading authors:', error);
    }
}