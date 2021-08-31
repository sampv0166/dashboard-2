import React, { Fragment, useState } from "react";
import SideBar from "./SideBar";
import NavHader from "./NavHader";
import Header from "./Header";
import ChatBox from "../ChatBox";
import { useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const JobieNav = ({ title , history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const [toggle, setToggle] = useState("");
  const onClick = (name) => setToggle(toggle === name ? "" : name);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>error</Message>
      ) : (
        <>
          <NavHader />
          <SideBar  />
          <Header
            onNote={() => onClick("chatbox")}
            onNotification={() => onClick("notification")}
            onProfile={() => onClick("profile")}
            toggle={toggle}
            title={title}
            onBox={() => onClick("box")}
            history = {history}
          />
          <ChatBox onClick={() => onClick("chatbox")} toggle={toggle} />
        </>
      )}
    </Fragment>
  );
};

export default JobieNav;
