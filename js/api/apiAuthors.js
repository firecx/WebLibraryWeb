class ApiAuthors {
    static baseURL = 'http://localhost:8080/api/authors';

    static async get(endpoint, params = {}) {
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

    static async post(endpoint, data = {}) {
        try {
            const url = new URL(`${this.baseURL}${endpoint}`);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            if (response.status === 204) {
                return null;
            }

            return await response.json();
        }
        catch (error) {
            console.error('API Error: ', error);
            throw error;
        }
    }

    static async getAuthors() {
        return await this.get('');
    }

    static async createAuthor(author) {
        return await this.post('', author);
    }

    static async getAuthorsById(id) {
        return await this.get(`/${id}`);
    }
}