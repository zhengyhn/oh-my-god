import React from "react";
import { Menu } from "element-react";
import { NavLink } from "react-router-dom";
import "./Header.css";

type RouteType = {
  link: string;
  text: string;
};
type PropsType = {
  routes: RouteType[];
};
const Header = (props: PropsType) => {
  const { routes } = props;

  return (
    <div>
      <Menu
        theme="dark"
        defaultActive="0"
        className="el-menu-demo"
        mode="horizontal"
      >
        {routes.map((item, i) => (
          <Menu.Item index={`${i}`} key={item.link}>
            <NavLink to={item.link}>{item.text}</NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default Header;
