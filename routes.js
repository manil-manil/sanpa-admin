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
        path: "/user-profile",
        name: "User Profile",
        icon: Person,
        layout: "/admin",
    },
    {
        path: "/user-list",
        name: "회원 목록",
        icon: "content_paste",
        layout: "/admin",
    },
    {
        path: "/typography",
        name: "Typography",
        icon: LibraryBooks,

        layout: "/admin",
    },
];

export default dashboardRoutes;
