export const sidebarData = [
    {
        title: 'Services',
        links: [
            { label: 'Dashboard', href: '/' },
            {
                label: 'Compute',
                href: '#',
                dropdown: [
                    { label: 'EC2', href: '/ec2' },
                    { label: 'Lambda', href: '/lambda' },
                ],
            },
            {
                label: 'Storage',
                href: '#',
                dropdown: [
                    { label: 'S3', href: '/s3' },
                    { label: 'EBS', href: '/ebs' },
                ],
            },
        ],
    },
    {
        title: 'Tools',
        links: [
            { label: 'CloudWatch', href: '/cloudwatch' },
            { label: 'IAM', href: '/iam' },
        ],
    },
];
