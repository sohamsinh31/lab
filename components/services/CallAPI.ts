import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';

export const fetchData = async (url: string) => {
    try {
        const { token } = parseCookies();
        console.log("Parsing cookie:-", token)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': process.env.NEXT_PUBLIC_APIKEY || '',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
        });

        if (response.status == 401) {
            window.location.href = "/login";
            return;
        }

        // Check if response is OK
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse?.error);
        }

        // console.log(response.text())

        // Check if response Content-Type is JSON
        const contentType = response.headers.get('Content-Type');
        const isJSON = contentType && contentType.includes('application/json');

        if (!isJSON) {
            // Redirect to login page or handle HTML error response
            window.location.href = "/login";
            return;
        }

        return await response.json();
    } catch (error: any) {
        throw new Error('Error fetching data: ' + error.message);
    }
};

export const postData = async (url: string, data: any) => {
    try {
        const { token } = parseCookies();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': process.env.NEXT_PUBLIC_APIKEY || '',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: data,
        });
        // console.log(response.text())
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

export const postFormData = async (url: string, data: any) => {
    try {
        const { token } = parseCookies();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-Authorization': process.env.NEXT_PUBLIC_APIKEY || '',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: data,
        });
        // console.log(response.text())
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

export const putData = async (url: string, data: any) => {
    try {
        const { token } = parseCookies();
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': process.env.NEXT_PUBLIC_APIKEY || '',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });

        // console.log(response.text())

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

export const deleteData = async (url: string, data: any) => {
    try {
        const { token } = parseCookies();
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': process.env.NEXT_PUBLIC_APIKEY || '',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        // console.log(response.text())

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
