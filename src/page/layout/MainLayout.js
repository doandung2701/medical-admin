import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import SiderMenu from './SiderMenu';
import LayoutBanner from './LayoutBanner';
import './Style.less';
import RoutingList from '../../router/RoutingList';
import Loader from '../../component/Loader/Loader';
import Login from '../auth/login/Login';
import requireAuth from '../../hoc/requireAuth';

const { Content } = Layout;

function MainLayout() {
  const auth = useSelector(state => state.firebaseReducer.auth);
  const [collapsed, setCollapsed] = useState(false);
  const handleOnCollapse = () => {
    setCollapsed(prevState => !prevState);
  };

  return (
    <>
      {!auth.isLoaded ? (
        <Loader />
      ) : !auth.isEmpty ? (
        <Layout style={{ minHeight: '100vh' }}>
          <SiderMenu
            collapsed={collapsed}
            handleOnCollapse={handleOnCollapse}
          />
          <Layout>
            <LayoutBanner
              collapsed={collapsed}
              handleOnCollapse={handleOnCollapse}
            />
            <Content style={{ margin: '24px 16px 0' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 20 }}>
                <RoutingList />
              </div>
            </Content>
          </Layout>
        </Layout>
      ) : (
        <Login />
      )}
    </>
  );
}

export default MainLayout;
