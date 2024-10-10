// pages/legal/[subpage].tsx

import { useRouter } from 'next/router';
import PGen from '../components/ui/Policies/PGen';

const LegalSubpage = () => {
    const router = useRouter();
    const { subpage } = router.query; // Get the dynamic route parameter

    // Render different content based on the subpage
    switch (subpage) {
        case 'google':
            return <div>
                <PGen forPage={subpage} />
            </div>;
        case 'tiser':
            return <div>General Privacy and Policies</div>;
        default:
            return <div>Error 404: Page Not Found on {subpage} </div>;
    }
};

export default LegalSubpage;
