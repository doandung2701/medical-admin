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
    path: '/categories',
    component: CategoryList
  },
  {
    path: '/categories/:id',
    component: CategoryForm
  },
  {
    path: '/brands',
    component: BrandList
  },
  {
    path: '/brands/:id',
    component: BrandForm
  },
  {
    path: '/add-brand',
    component: BrandForm
  }
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
