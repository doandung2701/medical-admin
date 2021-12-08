import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../page/dashboard/Dashboard';
import ShowCustomers from '../page/customer/ShowCustomers';
import ShowProducts from '../page/product/ShowProducts';
import AddProduct from '../page/product/AddProduct';
import { PrivateRoute } from './PrivateRoute';
import CategoryList from '../page/category/CategoryList';
import CategoryForm from '../page/category/CategoryForm';
import BrandList from '../page/brand/BrandList';
import BrandForm from '../page/brand/BrandForm';
import OriginList from '../page/origin/OriginList';
import OriginForm from '../page/origin/OriginForm';
import BannerForm from '../page/banner/BannerForm';
import ProductDetail from '../page/product/ProductDetail';
import OrderList from '../page/order/OrderList';
import OrderDetail from '../page/order/OrderDetail';
import BlogList from '../page/blog/BlogList';
import BlogForm from '../page/blog/BlogForm';
import NotificationForm from '../page/notification/NotificationForm';
import TagList from '../page/tag/TagList';
import TagForm from '../page/tag/TagForm';

const routes = [
  {
    path: '/',
    component: Dashboard,
    key: '/',
  },
  {
    path: '/customers',
    component: ShowCustomers,
    key: '/customers',
  },
  {
    path: '/products',
    component: ShowProducts,
    key: '/products',
  },
  {
    path: '/add-product',
    component: AddProduct,
    key: '/add-product',
  },
  {
    path: '/products/:id',
    component: ProductDetail,
    key: '/products/:id',
  },
  {
    path: '/categories',
    component: CategoryList,
    key: '/categories',
  },
  {
    path: '/categories/:id',
    component: CategoryForm,
    key: '/categories/:id',
  },
  {
    path: '/add-category',
    component: CategoryForm,
    key: '/add-category',
  },
  {
    path: '/brands',
    component: BrandList,
    key: '/brands',
  },
  {
    path: '/brands/:id',
    component: BrandForm,
    key: '/brands/:id',
  },
  {
    path: '/add-brand',
    component: BrandForm,
    key: '/add-brand',
  },
  {
    path: '/origins',
    component: OriginList,
    key: '/origins',
  },
  {
    path: '/origins/:id',
    component: OriginForm,
    key: '/origins/:id',
  },
  {
    path: '/add-origin',
    component: OriginForm,
    key: '/add-origin',
  },
  {
    path: '/banners',
    component: BannerForm,
    key: '/banners',
  },
  {
    path: '/orders',
    component: OrderList,
    key: '/orders',
  },
  {
    path: '/orders/:id',
    component: OrderDetail,
    key: '/orders/:id',
  },
  {
    path: '/blogs',
    component: BlogList,
    key: '/blogs',
  },
  {
    path: '/add-blog',
    component: BlogForm,
    key: '/add-blog',
  },
  {
    path: '/blogs/:id',
    component: BlogForm,
    key: '/blogs/:id',
  },
  {
    path: '/messaging',
    component: NotificationForm,
    key: '/messaging',
  },

  {
    path: '/tags',
    component: TagList,
    key: '/tags',
  },
  {
    path: '/tags/:id',
    component: TagForm,
    key: '/tags/:id',
  },
  {
    path: '/add-tag',
    component: TagForm,
    key: '/add-tag',
  },

];

function RoutingList() {
  return routes.map(item => {
    if (item.path.split('/').length === 2) {
      return (
        <PrivateRoute
          exact
          path={item.path}
          component={item.component}
          key={item.key}
        />
      );
    }
    return <Route path={item.path} component={item.component} key={item.key} />;
  });
}

export default RoutingList;
