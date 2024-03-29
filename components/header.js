import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  HomeFilled,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  UserOutlined,
  CarryOutFilled,
  TeamOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, SubMenu, ItemGroup } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
    console.log(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

  return (
    <Menu mode="horizontal" selectedKeys={[current]} className="mb-2">
      <Item key="/" onClick={(e) => setCurrent(e.key)} icon={<HomeFilled />}>
        <Link href="/">
          <a>GuruLevel</a>
        </Link>
      </Item>

      {user && user.role && user.role.includes("Instructor") ? (
        <Item
          key={`/instructor/course/create`}
          onClick={(e) => setCurrent(e.key)}
          icon={<CarryOutFilled />}
        >
          <Link href={`/instructor/course/create`}>
            <a>Create Course</a>
          </Link>
        </Item>
      ) : (
        <Item
          key={`/user/upgrade-to-instructor`}
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
        >
          <Link href={`/user/upgrade-to-instructor`}>
            <a>Become an Instructor</a>
          </Link>
        </Item>
      )}

      {user === null && (
        <>
          <Item
            key="/login"
            onClick={(e) => setCurrent(e.key)}
            icon={<LoginOutlined />}
          >
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Item>

          <Item
            key="/register"
            onClick={(e) => setCurrent(e.key)}
            icon={<UserAddOutlined />}
          >
            <Link href="/register">
              <a>Register</a>
            </Link>
          </Item>
        </>
      )}

      {user !== null && (
        <SubMenu
          key="submenu"
          icon={<UnorderedListOutlined />}
          title={user && user.name}
          style={{ marginLeft: "auto" }}
        >
          <ItemGroup>
            <Item
              style={{ marginLeft: "auto" }}
              key="/user"
              icon={<UserOutlined />}
            >
              <Link href="/user">
                <a>Dashboard</a>
              </Link>
            </Item>
            <Item
              style={{ marginLeft: "auto" }}
              key="/logout"
              onClick={logout}
              icon={<LogoutOutlined />}
            >
              <a>Logout</a>
            </Item>
          </ItemGroup>
        </SubMenu>
      )}

      {user && user.role && user.role.includes("Instructor") && (
        <Item
          key={`/instructor`}
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
        >
          <Link href={`/instructor`}>
            <a>Instructor</a>
          </Link>
        </Item>
      )}
    </Menu>
  );
};

export default Header;
