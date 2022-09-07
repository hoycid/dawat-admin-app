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
import HistoryIcon from "@material-ui/icons/History";
import GroupIcon from "@material-ui/icons/Group";
import AssignmentReturnedRoundedIcon from "@material-ui/icons/AssignmentReturnedRounded";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import Code from "@material-ui/icons/Code";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,

    layout: "/admin",
  },
  {
    path: "/activity-log",
    name: "Activity Logs",
    icon: HistoryIcon,

    layout: "/admin",
  },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: Person,

  //   layout: "/admin",
  // },
  // {
  //   path: "/employee-list",
  //   name: "Employee List",
  //   icon: GroupIcon,

  //   layout: "/admin",
  // },
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
  {
    path: "/settings",
    name: "Settings",
    icon: Code,

    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: AssignmentReturnedRoundedIcon,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Icons",
  //   icon: AssignmentReturnedRoundedIcon,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: AssignmentReturnedRoundedIcon,
  //   layout: "/admin",
  // },
];

export default dashboardRoutes;
