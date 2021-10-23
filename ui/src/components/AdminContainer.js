import React from "react";
import { chakra, useBreakpointValue } from "@chakra-ui/react";
import AdminHome from "./admin/AdminHome";
import AdminUser from "./admin/users/AdminUser";
import AdminForm from "./admin/AdminForm";
import AdminGiving from "./admin/AdminGiving";
import SidebarWithHeader from "./admin/navigation/Sidebar";
import { useState } from "react";
import AdminLogout from "./admin/AdminLogout";

const smVariant = { navigation: "drawer", navigationButton: true };
const mdVariant = { navigation: "sidebar", navigationButton: false };

const AdminContainer = (props) => {
  const { pageName } = props.match.params;

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

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
            home: <AdminHome {...props} />,
            users: <AdminUser {...props} />,
            forms: <AdminForm {...props} />,
            giving: <AdminGiving {...props} />,
            logout: <AdminLogout {...props} />,
          }[pageName]
        }
      </SidebarWithHeader>
    </chakra.main>
  );
};

export default AdminContainer;
