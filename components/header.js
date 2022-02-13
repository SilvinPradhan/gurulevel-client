import { Menu } from "antd";
import Link from "next/link";
import { HomeFilled, LoginOutlined, UserAddOutlined } from "@ant-design/icons";

const { Item } = Menu;

const Header = () => {
  return (
    <Menu mode="horizontal">
      <Item key={1} icon={<HomeFilled />}>
        <Link href="/">
          <a>GuruLevel</a>
        </Link>
      </Item>

      <Item key={2} icon={<LoginOutlined />}>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </Item>

      <Item key={3} icon={<UserAddOutlined />}>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </Item>
    </Menu>
  );
};

export default Header;
