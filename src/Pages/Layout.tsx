import React from "react";
import { Outlet } from "react-router";
import Header from "../Components/Header";

type LayoutProps = {};

const Layout = ({}: LayoutProps) => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
