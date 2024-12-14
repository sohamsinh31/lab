import DashboardRoute from "@/Routes/Dashboard";
import LegalSubpage from "@/Routes/LegalRoutes";
import ServiceRoute from "@/Routes/ServiceRoute";
import EmailEditor from "../ui/Mail/Mailer";
import SurveyRoute from "@/Routes/SurveyRoute";
import CourseRoute from "@/Routes/CourseRoute";

export const Routes: any = {
    "dashboard": DashboardRoute,
    "services": ServiceRoute,
    "legal": LegalSubpage,
    "mail" : EmailEditor,
    "surveys": SurveyRoute,
    "test": CourseRoute,
    // "playground"
};