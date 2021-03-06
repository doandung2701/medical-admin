import React from 'react';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import {
  DashboardOutlined,
  FundProjectionScreenOutlined,
  PartitionOutlined,
  SettingOutlined,
  TeamOutlined,
  DiffOutlined,
  FileImageOutlined,
  SnippetsOutlined,
  SwitcherOutlined,
  HddOutlined
} from '@ant-design/icons';
import './Style.less';

const { SubMenu } = Menu;

const { Sider } = Layout;

function SiderMenu({ handleOnCollapse, collapsed }) {
  const theme = 'light';

  const history = useHistory();

  const handleSiderMenuClick = action => {
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
        break;
      case 'showOrigins':
        history.push('/origins');
        break;
      case 'showBanners':
        history.push('/banners');
        break;
      case 'showOrder':
        history.push('/orders');
        break;
      case 'showBlogs':
        history.push('/blogs');
        break;
      case 'sendNotification':
        history.push('/messaging');
        break;
      case 'showTags':
        history.push('/tags');
        break;
      case 'showActiveElements':
        history.push('/activeElements');
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
              <span>Danh m???c</span>
            </span>
          }
        >
          <Menu.Item key="categoryList">
            <span className="nav-text">Danh s??ch danh m???c</span>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="products"
          title={
            <span>
              <HddOutlined />
              <span>S???n ph???m</span>
            </span>
          }
        >
          <Menu.Item key="showProducts">
            <span className="nav-text">Danh s??ch s???n ph???m</span>
          </Menu.Item>
          <Menu.Item key="addProduct">
            <span className="nav-text">Th??m s???n ph???m</span>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="brands"
          title={
            <span>
              <SwitcherOutlined />
              <span>Nh??n h??ng</span>
            </span>
          }
        >
          <Menu.Item key="showBrands">
            <span className="nav-text">Danh s??ch nh??n h??ng</span>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="origins"
          title={
            <span>
              <SnippetsOutlined />
              <span>Xu???t x???</span>
            </span>
          }
        >
          <Menu.Item key="showOrigins">
            <span className="nav-text">Danh s??ch xu???t x???</span>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="showBanners">
          <span>
            <FileImageOutlined />
            <span>???nh banner</span>
          </span>
        </Menu.Item>
        <Menu.Item key="showOrder">
          <span>
            <DiffOutlined />
            <span>????n h??ng</span>
          </span>
        </Menu.Item>
        <Menu.Item key="showBlogs">
          <span>
            <DiffOutlined />
            <span>Blog</span>
          </span>
        </Menu.Item>
        <Menu.Item key="showCustomers">
          <span>
            <DiffOutlined />
            <span>Kh??ch h??ng</span>
          </span>
        </Menu.Item>
        <Menu.Item key="sendNotification">
          <span>
            <DiffOutlined />
            <span>G???i th??ng b??o</span>
          </span>
        </Menu.Item>
        <Menu.Item key="showTags">
          <span>
            <DiffOutlined />
            <span>Qu???n l?? tag</span>
          </span>
        </Menu.Item>
        <Menu.Item key="showActiveElements">
          <span>
            <DiffOutlined />
            <span>Qu???n l?? ho???t ch???t</span>
          </span>
        </Menu.Item>
        
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
