class ApiAuthors {
    constructor(baseURL = 'http://localhost:8080/api/authors') {
        this.baseURL = baseURL;
    }

    async get(endpoint, params = {}) {
        try {
            const url = new URL(`${this.baseURL}${endpoint}`);

            Object.keys(params).forEach(key => {
                if (params[key] !== null && params[key] !== undefined) {
                    url.searchParams.append(key, params[key]);
                }
            });

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        }
        catch (error) {
            console.error('API Error: ', error);
            throw error;
        }
    }

    async getAuthors() {
        return await this.get('');
    }

    async getAuthorsById(id) {
        return await this.get(`/${id}`);
    }
}

const apiAuthors = new ApiAuthors();