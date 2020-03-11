
import Orders from './container/Admin/orders/orders';
import Categories from './container/Admin/categories/categories';
import Customers from './container/Admin/customers/customers';
import AppFaqTopics from './container/Admin/app-faq-topics/app-faq-topics';
import AppFaq from './container/Admin/app-faq/app-faq';
import UserInquiries from './container/Admin/user-inquiries/user-inquiries';
import DriverContainer from './container/Admin/drivers';
import ServicesContainer from './container/Admin/services';
import VouchersContainer from './container/Admin/vouchers';

var dashRoutes = [
  {
    path: '/orders',
    name: 'Orders',
    icon: 'fas fa-shopping-basket',
    component: Orders,
    layout: '/admin'
  },
  {
    path: '/drivers',
    name: 'Drivers',
    icon: 'fa fa-truck',
    component: DriverContainer,
    layout: '/admin'
  },
  {
    path: '/services',
    name: 'Services',
    icon: 'fas fa-university',
    component: ServicesContainer,
    layout: '/admin'
  },
  {
    path: '/categories',
    name: 'Categories',
    icon: 'fas fa-th-list',
    component: Categories,
    layout: '/admin'
  },
  {
    path: '/customers',
    name: 'Customers',
    icon: 'fas fa-users',
    component: Customers,
    layout: '/admin'
  },
  {
    path: '/vouchers',
    name: 'Vouchers',
    icon: 'fas fa-tags',
    component: VouchersContainer,
    layout: '/admin'
  },
  {
    path: '/topics-app-faq',
    name: 'App FAQs Topics',
    icon: 'fas fa-question-circle',
    component: AppFaqTopics,
    layout: '/admin'
  },
  {
    path: '/app-faq',
    name: 'App FAQs',
    icon: 'fas fa-question',
    component: AppFaq,
    layout: '/admin'
  },
  {
    path: '/user-inquiries',
    name: 'User Inquiries',
    icon: 'fas fa-life-ring',
    component: UserInquiries,
    layout: '/admin'
  }
];
export default dashRoutes;
