import { getServerSideUser as sd } from "../services/CookieData";

export const navbarData = [
    {
        label: 'Services',
        href: '#',
        dropdown: [
            { label: 'Web Development', href: '/services/web-development' },
            { label: 'Cloud Solutions', href: '/services/cloud' },
        ],
    },
    sd ? {
        label: sd.username, href: '#', dropdown: [
            { label: 'Manage', href: '#' },
            { label: 'LogOut', href: '/auth/logout' },
        ]
    } : { label: 'Login', href: '/auth/login' },
];
