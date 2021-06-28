/*!

=========================================================
* * NextJS Material Dashboard v1.1.0 based on Material Dashboard React v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import HistoryIcon from '@material-ui/icons/History';
import GroupIcon from '@material-ui/icons/Group';
import AssignmentReturnedRoundedIcon from '@material-ui/icons/AssignmentReturnedRounded';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,

    layout: "/admin",
  },
  {
    path: "/table-list",
    name: "Activity Logs",
    icon: HistoryIcon,

    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: Person,

    layout: "/admin",
  },
  {
    path: "/employee-list",
    name: "Employee List",
    icon: GroupIcon,

    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: LibraryBooks,

    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: BubbleChart,

    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,

    layout: "/admin",
  },
  {
    path: "/inbound",
    name: "Inbound Documents",
    icon: AssignmentReturnedRoundedIcon,
    layout: "/admin",
  },
  {
    path: "/outbound",
    name: "Outbound Documents",
    icon: ExitToAppTwoToneIcon,
    layout: "/admin",
  },
];

export default dashboardRoutes;
