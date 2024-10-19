import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { navbarData } from "@/components/utils/NavbarTestData";
import { sidebarData } from "@/components/utils/SidebarTestData";
import LegalSubpage from "@/Routes/LegalRoutes"

const LegalPage = () => {
    return (
        <div>
            <Navbar data={navbarData} />
            <div className='flex'>
                <Sidebar data={sidebarData} />
                <LegalSubpage />
            </div>
        </div>
    )
}

export default LegalPage;