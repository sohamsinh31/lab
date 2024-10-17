import { username } from "../services/CookieData";

export const navbarData = [
    {
        label: 'Services',
        href: '#',
        dropdown: [
            { label: 'Web Development', href: '/services/web-development' },
            { label: 'Cloud Solutions', href: '/services/cloud' },
        ],
    },
    username ? {
        label: username, href: '#', dropdown: [
            { label: 'Manage', href: '#' },
            { label: 'LogOut', href: '/auth/logout' },
        ]
    } : { label: 'Login', href: '/auth/login' },
];
