import Admin from "../Components/Admin/Admin";
import Contact from "../Components/Client/Contact/Contact";
import Cooperate from "../Components/Client/Cooperate/Cooperate";
import Home from "../Components/Client/Home/Home";
import Introduction from "../Components/Client/Introduction/Introduction";
import News from "../Components/Client/News/News";
import Process from "../Components/Client/Process/Process";

import Video from "../Components/Client/Video/Video";
import PostDetail from "../Components/Item/PostDetail";
import Login from "../Components/Login/Login";
import AdminLayout from "../Layout/AdminLayout/AdminLayout";
import ClientLayout from "../Layout/ClientLayout/ClientLayout";

export const AllRoutes = [
  {
    path: "/login",
    component: Login,
    Layout: AdminLayout,
  },
  {
    path: "/admin",
    component: Admin,
    Layout: AdminLayout,
  },
  {
    path: "/",
    component: Home,
    Layout: ClientLayout,
  },
  {
    path: "/video",
    component: Video,
    Layout: ClientLayout,
  },
  {
    path: "/tin-tuc-su-kien",
    component: News,
    Layout: ClientLayout,
  },
  {
    path: "/bai-viet/:id",
    component: PostDetail,
    Layout: ClientLayout,
  },
  {
    path: "/lien-he/",
    component: Contact,
    Layout: ClientLayout,
  },
  {
    path: "/gioi-thieu/",
    component: Introduction,
    Layout: ClientLayout,
  },
  {
    path: "/hop-tac/",
    component: Cooperate,
    Layout: ClientLayout,
  },
  {
    path: "/quy-trinh-san-xuat/",
    component: Process,
    Layout: ClientLayout,
  },
];
