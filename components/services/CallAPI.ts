import { getSession } from 'next-auth/react';
import { toast } from 'react-toastify';

// Fetch Data with JWT
export const fetchData = async (url: string) => {
    try {
        const session : any = await getSession();
        const jwtoken = session?.jwtToken;

        // console.log(session)

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtoken}`
            },
            credentials: 'include',
        });

        if (response.status === 403 || response.status === 401) {
            window.location.href = "/auth/login";
            return;
        }

        if (!response.ok) {
            // console.log(response.text())
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
        const session : any = await getSession();
        const jwtoken = session?.jwtToken;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtoken}`
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });

        if (response.status === 403 || response.status === 401) {
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
        const session : any = await getSession();
        const jwtoken = session?.jwtToken;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwtoken}`
            },
            credentials: 'include',
            body: data, // FormData should not be stringified
        });

        if (response.status === 403 || response.status === 401) {
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
        const session : any = await getSession();
        const jwtoken = session?.jwtToken;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtoken}`
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });

        if (response.status === 403 || response.status === 401) {
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
        const session : any = await getSession();
        const jwtoken = session?.jwtToken;

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtoken}`
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });

        if (response.status === 403 || response.status === 401) {
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
