import CSDLRSSIndex from "../assets/csdl-rss-index.png"
import GCCSISDashboard from "../assets/gcc-sis-dashboard.png"
import IPIndex from "../assets/integrated-project-index.png"
import JPETAuth from "../assets/jpet-auth.png"
import type { Project } from "./types"

export const projects: Project[] = [{
  title: "Cake Hub",
  description: "A web application created using PHP + Laravel that allows users to order cakes and process orders.Uses role - based access control for admin, customer, and staff roles for security.",
  url: "https://github.com/ijagamino/ite400-finals-project",
  technologies: ["Blade", "PHP (Laravel)", "MySQL"],
  date: "2023",
}, {
  title: "CSDL RSS",
  description: "A web application created using Laravel as the backend API and Vue for frontend interactivity that allows users to create reports, make appointments and view upcoming appointments for their reports.",
  image: CSDLRSSIndex,
  url: "https://github.com/ijagamino/csdl-rss",
  technologies: ["Vue.js", "PHP (Laravel)", "MySQL"],
  date: "2024",
}, {
  title: "Point of Sale System",
  description: "Integrated project for ITE 307, ITE 314, and ITE 353. A point of sale system wherein users can create products, track the inventory and product stocks, and track sales",
  image: IPIndex,
  url: "https://github.com/ijagamino/integration-project",
  technologies: ["Vue.js (Quasar)", "Node.js (Express)", "MongoDB"],
  date: "2024",
}, {
  title: "Personal Expense Tracker",
  description: "A simple web application built using Vue.js (Quasar) and PostgresSQL (Supabase) to help users track their personal expenses. Deployed in vercel to automate the deployment process.",
  image: JPETAuth,
  url: "https://github.com/ijagamino/j-personal-expense-tracker",
  technologies: ["Vue.js (Quasar)", "TypeScript", "PostgreSQL (Supabase)"],
  date: "2025",
}, {
  title: "GCC SIS",
  description: "A web application with a dashboard to analyze student information. Handles student management, class management, and user management. Implemented JWT authentication and RBAC.",
  image: GCCSISDashboard,
  url: "https://github.com/nachtalia/SIS",
  technologies: ["Vue.js (Quasar)", "Node.js (Express)", "MongoDB"],
  date: "2025",
}]
