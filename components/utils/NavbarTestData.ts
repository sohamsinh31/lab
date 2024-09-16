import { User } from "../services/CookieData";

export const navbarData = [
    {
        label: 'Services',
        href: '#',
        dropdown: [
            { label: 'Web Development', href: '/services/web-development' },
            { label: 'Cloud Solutions', href: '/services/cloud' },
        ],
    },
    User.username ? {
        label: User.username, href: '#', dropdown: [
            { label: 'Manage', href: '#' },
            { label: 'LogOut', href: '#' },
        ]
    } : { label: 'Login', href: '/auth/login' },
];
