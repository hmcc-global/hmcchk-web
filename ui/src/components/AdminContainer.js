import React from 'react';
import { chakra, useBreakpointValue } from '@chakra-ui/react';
import AdminHome from './admin/AdminHome';
import AdminUser from './admin/users/AdminUser';
import FormManager from './forms/FormManager';
import AdminGiving from './admin/AdminGiving';
import SidebarWithHeader from './admin/navigation/Sidebar';
import { useState } from 'react';
import AdminLogout from './admin/AdminLogout';
import NoMatch from './errors/NoMatch';

const smVariant = { navigation: 'drawer', navigationButton: true };
const mdVariant = { navigation: 'sidebar', navigationButton: false };

const AdminContainer = (props) => {
  const { pageName } = props.match.params;

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const allowHome = () => {
    if(props.user.accessType === 'admin' || props.user.accessType === 'stewardship' || props.user.accessType === 't3ch'){
      return true;
    } else return false;
  }

  const allowUsers = () => {
    if(props.user.accessType === 'admin' || props.user.accessType === 'stewardship'){
      return true;
    } else return false;
  }

  const allowForms = () =>{
    if(props.user.accessType === 'admin' || props.user.accessType === 'stewardship' || props.user.accessType === 't3ch'){
      return true;
    } else return false;
  }

  const allowGiving = () => {
    if(props.user.accessType === 'admin' || props.user.accessType === 'stewardship' ){
      return true;
    } else return false;
  }

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
            home: ( allowHome() ? <AdminHome {...props} /> : <NoMatch />),
            users: (allowUsers() ?<AdminUser {...props} />: <NoMatch />),
            forms: (allowForms() ? <FormManager {...props} /> : <NoMatch /> ),
            giving: (allowGiving() ? <AdminGiving {...props} /> : <NoMatch />),
            logout: (<AdminLogout {...props} />),
          }[pageName]
        }
      </SidebarWithHeader>
    </chakra.main>
  );
};

export default AdminContainer;
