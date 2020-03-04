/*!

=========================================================
* Now UI Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Orders from "./container/Admin/orders/orders";

var dashRoutes = [
  {
    path: "/orders",
    name: "Orders",
    icon: "fas fa-shopping-basket",
    component: Orders,
    layout: "/admin"
  },
  {
    path: "/drivers",
    name: "Drivers",
    icon: "fa fa-truck",
    component: Orders,
    layout: "/admin"
  },
  {
    path: "/services",
    name: "Services",
    icon: "fas fa-university",
    component: Orders,
    layout: "/admin"
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "fas fa-th-list",
    component: Orders,
    layout: "/admin"
  },
  {
    path: "/locations",
    name: "Locations",
    icon: "fas fa-map-marker-alt",
    component: Orders,
    layout: "/admin"
  },
  {
    path: "/customers",
    name: "Customers",
    icon: "fas fa-users",
    component: Orders,
    layout: "/admin"
  },
  {
    path: "/vouchers",
    name: "Vouchers",
    icon: "fas fa-tags",
    component: Orders,
    layout: "/admin"
  },
  {
    path: "/app-faq-topics",
    name: "App FAQs Topics",
    icon: "fas fa-question-circle",
    component: Orders,
    layout: "/admin"
  },
  {
    path: "/app-faq",
    name: "App FAQs",
    icon: "fas fa-question",
    component: Orders,
    layout: "/admin"
  },
  {
    path: "/user-inquiries",
    name: "User Inquiries",
    icon: "fas fa-life-ring",
    component: Orders,
    layout: "/admin"
  }
];
export default dashRoutes;
