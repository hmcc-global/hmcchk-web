import React from 'react';
import { chakra, useBreakpointValue } from '@chakra-ui/react';
import AdminHome from './admin/AdminHome';
import AdminUser from './admin/users/AdminUser';
import FormManager from './forms/FormManager';
import AdminGiving from './admin/AdminGiving';
import SidebarWithHeader from './admin/navigation/Sidebar';
import { useState } from 'react';
import AdminLogout from './admin/AdminLogout';
import PrivateRoute from './helpers/PrivateRoute';

const smVariant = { navigation: 'drawer', navigationButton: true };
const mdVariant = { navigation: 'sidebar', navigationButton: false };

const AdminContainer = (props) => {
  const { pageName } = props.match.params;

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  console.log(props)
  return (
    <chakra.main flexGrow={1} bg="#ffffff" overflowY="auto">
      <SidebarWithHeader
        {...props}
        variant={variants?.navigation}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      >
        {
          {
            home: (
              <PrivateRoute
                exact
                path="/home"
                permissions={['stewardship', 'admin', 't3ch']}
                component={AdminHome}
                {...props}
              />
            ),
            users: (
              <PrivateRoute
                exact
                path="/users"
                permissions={['stewardship', 'admin','t3ch']}
                component={AdminUser}
                {...props}
              />
            ),
            forms: (
              <PrivateRoute
                exact
                path="/forms"
                permissions={['stewardship', 'admin', 't3ch']}
                component={FormManager}
                {...props}
              />
            ),
            giving: (
              <PrivateRoute
                exact
                path="/giving"
                permissions={['stewardship','admin','t3ch']}
                component={AdminGiving}
                {...props}
              />
            ),
            logout: (
              <PrivateRoute
                exact
                path="/logout"
                permissions={['stewardship', 'admin', 't3ch']}
                component={AdminLogout}
                {...props}
              />
            ),
          }[pageName]
        }
      </SidebarWithHeader>
    </chakra.main>
  );
};

export default AdminContainer;
