import { useState, useEffect } from 'react';
import axios from 'axios';

export const useSession = () => {
    const [user, setUser] = useState<null | { username: string; roles: any }>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const checkSession = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_JWS_URL + '/api/userinfo', { withCredentials: true });

            if (response.data && !response.data.error) {
                // If user info is returned, set the user state
                setUser({
                    username: response.data.username,
                    roles: response.data.roles,
                });
            } else {
                setUser(null); // No session or invalid session
            }
        } catch (err) {
            setError('Unable to check session.');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    return { user, loading, error, checkSession };
};
