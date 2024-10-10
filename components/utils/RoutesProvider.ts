import DashboardRoute from "@/Routes/Dashboard";
import LegalSubpage from "@/Routes/LegalRoutes";
import ServiceRoute from "@/Routes/ServiceRoute";
import EmailEditor from "../ui/Mail/Editor";

export const Routes: any = {
    "dashboard": DashboardRoute,
    "services": ServiceRoute,
    "legal": LegalSubpage,
    "mail" : EmailEditor
};