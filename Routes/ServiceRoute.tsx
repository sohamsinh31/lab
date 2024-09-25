import Sidebar from "@/components/Sidebar";
import { sidebarData } from "@/components/utils/SidebarTestData";

const ServiceRoute: React.FC = () => {

    const classes = "border-collapse border border-slate-500";

    return <div className='flex min-w-[95vw]'>
        <Sidebar data={sidebarData} />
        <div className="m-2 p-2">
            <div className="row m-2 p-2">
                <h2>Client Services,</h2>
            </div>
            <div className="row">
                <table className={`table-fixed ${classes} border-spacing-1 min-w-[80vw]`}>
                    <thead>
                        <tr>
                            <th className={`${classes}`}>Song</th>
                            <th className={`${classes}`}>Artist</th>
                            <th className={`${classes}`}>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                            <td>Malcolm Lockyer</td>
                            <td>1961</td>
                        </tr>
                        <tr>
                            <td>Witchy Woman</td>
                            <td>The Eagles</td>
                            <td>1972</td>
                        </tr>
                        <tr>
                            <td>Shining Star</td>
                            <td>Earth, Wind, and Fire</td>
                            <td>1975</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}

export default ServiceRoute;