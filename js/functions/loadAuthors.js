async function loadAuthors(containerId) {
    try {
        const authors = await ApiAuthors.getAuthors();
        UIRendererAuthors.renderAuthors(authors, containerId);
    }
    catch (error) {
        console.error('Error loading authors:', error);
    }
}