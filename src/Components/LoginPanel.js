import React, { useEffect, useState } from "react";
import { Card, Typography, Button, TextField, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Helpers from "../Helpers";
import useStateRef from "react-usestateref";

export default function LoginPanel() {
  const [loginData, setLoginData] = useState({
    userName: "",
    passWord: "",
  });

  const handleUserName = (e) => {
    let text = e.target.value;
    setLoginData({ ...loginData, userName: text });
  };

  const handlePassWord = (e) => {
    let text = e.target.value;
    setLoginData({ ...loginData, passWord: text });
  };

  const handleLoginBtn = () => {
    if (loginData.userName !== "" || loginData.passWord !== "") {
      axios.post(Helpers().api + "/admin-login", loginData).then((res) => {
        let result = res.data;
        console.log(result);

        if (result["success"]) {
          navigate("/boardselection", { state: loginData });
        } else {
          alert(result["message"]);
        }
      });
    } else {
      alert("Fields Cannot be Empty.");
    }
  };

  const navigate = useNavigate();
  return (
    <div
      style={{ maxWidth: "100vw", height: "100vh", backgroundColor: "#9AD0EC" }}
    >

     <div
        style={{
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        ​
        <Card style={{ width: "400px", height: "450px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "13%",
            }}
          >
            <Typography
              style={{ fontWeight: "900", fontSize: 26, color: "#1C6DD0" }}
            >
              {" "}
              GILGAL ADMIN PANEL{" "}
            </Typography>
          </div>
          ​
          <div
            style={{
              margin: "13% 6% 0% 6%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "87%",
              justifyContent: "space-around",
            }}
          >
            <Typography style={{ fontWeight: "900", fontSize: 16 }}>
              Username
            </Typography>
            <TextField id="outlined-basic" size="small" variant="filled" value={loginData.userName} onChange={(e) => handleUserName(e)} />
          </div>
          ​
          <div
            style={{
              margin: "13% 6% 0% 6%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "87%",
              justifyContent: "space-around",
            }}
          >
            <Typography style={{ fontWeight: "900", fontSize: 16 }}>
              Password
            </Typography>
            <TextField
              id="outlined-basic"
              size="small"
              type="password"
              variant="filled"
              value={loginData.passWord} onChange={(e) => handlePassWord(e)} />
          </div>
          ​
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "13%",
            }}
          >
            <Button
              style={{
                width: "320px",
                backgroundColor: "#1C6DD0",
                height: "45px",
                color: "white",
                fontWeight: "900",
                fontSize: 18,
              }}
            onClick={() => handleLoginBtn()}
            >
              Login
            </Button>
          </div>
          ​
        </Card>
        ​
      </div>
    </div>
  );
}
