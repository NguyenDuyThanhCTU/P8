import Admin from "../Components/Admin/Admin";
import Contact from "../Components/Client/Contact/Contact";
import Home from "../Components/Client/Home/Home";
import Introduction from "../Components/Client/Introduction/Introduction";
import News from "../Components/Client/News/News";
import NewsDetail from "../Components/Client/News/NewsDetail";
import Video from "../Components/Client/Video/Video";
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
    path: "/tin-tuc",
    component: News,
    Layout: ClientLayout,
  },
  {
    path: "/tin-tuc/:id",
    component: NewsDetail,
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
];
