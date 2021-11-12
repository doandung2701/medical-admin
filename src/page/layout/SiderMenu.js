import React from 'react';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import {
  DashboardOutlined,
  FundProjectionScreenOutlined,
  PartitionOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import './Style.less';

const { SubMenu } = Menu;

const { Sider } = Layout;

function SiderMenu({ handleOnCollapse, collapsed }) {
  const theme = 'light';

  const history = useHistory();

  const handleSiderMenuClick = action => {
    console.log('menu:', action);
    switch (action.key) {
      case 'dashboard':
        history.push('/');
        break;
      case 'categoryList':
        history.push('/categories');
        break;  
      case 'showProducts':
        history.push('/products');
        break;
      case 'addProduct':
        history.push('/add-product');
        break;
      case 'showCustomers':
        history.push('/customers');
        break;
      case 'addCustomer':
        history.push('/add-customer');
        break;
      case 'showBrands':
        history.push('/brands');
      case 'showOrigins':
        history.push('/origins');
        break;  
      default:
        history.push('/');
    }
  };

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="80"
      onCollapse={handleOnCollapse}
      collapsed={collapsed}
      width="256"
      theme={theme}
    >
      <a>
        <div className="menu-logo" />
      </a>
      <Menu mode="inline" theme={theme} onClick={handleSiderMenuClick}>
        <Menu.Item key="dashboard">
          <DashboardOutlined />
          <span className="nav-text">Dashboard</span>
        </Menu.Item>
        <SubMenu key="categories"
         title={
          <span>
            <PartitionOutlined />
            <span>Category</span>
          </span>
        }
        >
          <Menu.Item key="categoryList">
            <span className="nav-text">List category</span>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="products"
          title={
            <span>
              <PartitionOutlined />
              <span>Products</span>
            </span>
          }
        >
          <Menu.Item key="showProducts">
            <span className="nav-text">List Product</span>
          </Menu.Item>
          <Menu.Item key="addProduct">
            <span className="nav-text">Add Product</span>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="customers"
          title={
            <span>
              <TeamOutlined />
              <span>Customers</span>
            </span>
          }
        >
          <Menu.Item key="showCustomers">
            <span className="nav-text">Show Customers</span>
          </Menu.Item>
          <Menu.Item key="addCustomer">
            <span className="nav-text">Add Customer</span>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="brands"
          title={
            <span>
              <TeamOutlined />
              <span>Brands</span>
            </span>
          }
        >
          <Menu.Item key="showBrands">
            <span className="nav-text">List Brand</span>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="origins"
          title={
            <span>
              <TeamOutlined />
              <span>Origins</span>
            </span>
          }
        >
          <Menu.Item key="showOrigins">
            <span className="nav-text">List Origin</span>
          </Menu.Item>
        </SubMenu>
        {/* <Menu.Item key="settings">
          <SettingOutlined />
          <span className="nav-text">Settings</span>
        </Menu.Item>
        <Menu.Item key="reports">
          <FundProjectionScreenOutlined />
          <span className="nav-text">Reports</span>
        </Menu.Item> */}
      </Menu>
    </Sider>
  );
}

export default SiderMenu;
