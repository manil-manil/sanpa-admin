import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: Dashboard,
        layout: "/admin",
    },
    {
        path: "/user-list",
        name: "회원 목록",
        icon: "content_paste",
        layout: "/admin",
    },
    {
        path: "/category",
        name: "카테고리",
        icon: LibraryBooks,
        layout: "/admin",
    },
];

export default dashboardRoutes;
