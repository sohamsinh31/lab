// pages/legal/[subpage].tsx

import { useRouter } from 'next/router';

const LegalTCSubpage = () => {
    const router = useRouter();
    const { subpage } = router.query; // Get the dynamic route parameter

    // Render different content based on the subpage
    switch (subpage) {
        case 'google':
            return <div>Google Terms and Conditions</div>;
        case 'tiser':
            return <div>General Terms and Conditions</div>;
        default:
            return <div>Error 404: Page Not Found on {subpage} </div>;
    }
};

export default LegalTCSubpage;
