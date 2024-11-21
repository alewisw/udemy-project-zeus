import React from "react";
import { Outlet } from "react-router";

type LayoutProps = {};

const Layout = ({}: LayoutProps) => {
  return (
    <div>
      <h1>Header</h1>
      <Outlet />
    </div>
  );
};

export default Layout;
