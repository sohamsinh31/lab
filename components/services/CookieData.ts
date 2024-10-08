import nookies from 'nookies';

export const getUserFromCookies = (ctx?: any) => {
    const cookies = nookies.get(ctx);
    return cookies.username || null;
};

// Call getUserFromCookies properly to get the username
export const username = typeof window !== 'undefined' ? getUserFromCookies() : null;