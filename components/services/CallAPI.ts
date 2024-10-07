import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';

// Fetch Data with JWT
export const fetchData = async (url: string) => {
    try {
        const { jwtoken } = parseCookies();
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtoken}`
            },
            credentials: 'include',
        });

        if (response.status == 403 || response.status == 401) {
            // Redirect to login if token is expired or invalid
            window.location.href = "/auth/login";
            return;
        }

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse?.error);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error('Error fetching data: ' + error.message);
    }
};

// Post Data with JWT
export const postData = async (url: string, data: any) => {
    try {
        const { jwtoken } = parseCookies();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtoken}`
            },
            credentials: 'include',
            body: JSON.stringify(data), // Ensure the data is JSON stringified
        });

        if (response.status == 403 || response.status == 401) {
            window.location.href = "/auth/login";
            return;
        }

        if (response.ok) {
            return await response.json();
        } else {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error);
        }
    } catch (error: any) {
        throw new Error('Error posting data: ' + error.message);
    }
};

// Post Form Data with JWT
export const postFormData = async (url: string, data: any) => {
    try {
        const { jwtoken } = parseCookies();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwtoken}`
            },
            credentials: 'include',
            body: data, // FormData should not be stringified
        });

        if (response.status == 403 || response.status == 401) {
            window.location.href = "/auth/login";
            return;
        }

        if (response.ok) {
            return await response.json();
        } else {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error);
        }
    } catch (error: any) {
        throw new Error('Error posting form data: ' + error.message);
    }
};

// Put Data with JWT
export const putData = async (url: string, data: any) => {
    try {
        const { jwtoken } = parseCookies();
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtoken}`
            },
            credentials: 'include',
            body: JSON.stringify(data), // Ensure the data is JSON stringified
        });

        if (response.status == 403 || response.status == 401) {
            window.location.href = "/auth/login";
            return;
        }

        if (response.ok) {
            return await response.json();
        } else {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error);
        }
    } catch (error: any) {
        throw new Error('Error updating data: ' + error.message);
    }
};

// Delete Data with JWT
export const deleteData = async (url: string, data: any) => {
    try {
        const { jwtoken } = parseCookies();
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtoken}`
            },
            credentials: 'include',
            body: JSON.stringify(data), // Ensure the data is JSON stringified
        });

        if (response.status == 403 || response.status == 401) {
            window.location.href = "/auth/login";
            return;
        }

        if (response.ok) {
            return await response.json();
        } else {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error);
        }
    } catch (error: any) {
        throw new Error('Error deleting data: ' + error.message);
    }
};
