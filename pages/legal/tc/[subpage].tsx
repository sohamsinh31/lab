import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { navbarData } from "@/components/utils/NavbarTestData";
import { sidebarData } from "@/components/utils/SidebarTestData";
import LegalTCSubpage from "@/Routes/LegalTC";

const LegalPage = () => {
    return (
        <div>
            <Navbar data={navbarData} />
            <div className='flex'>
                <Sidebar data={sidebarData} />
                <LegalTCSubpage />
            </div>
        </div>
    )
}

export default LegalPage;