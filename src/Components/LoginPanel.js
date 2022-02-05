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
    <div>
    <div class="header">
      <div class="inner-header flex">
        <h1>GilGal Admin Panel</h1>
      </div>

      <div>
        <div>
          <svg
            class="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shape-rendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g class="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.7"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>
    </div>

    <div class="content flex">
      <div>
        <Card
          elevation={10}
          style={{
            display: "flex",
            flexDirection: "column",
            padding:'20px',
            marginTop:'50%'
          }}
        >
          <div style={{
            width:'30vw',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            margin:'25px'
          }}>
            <Typography style={{margin:'10px', fontWeight: "900", fontSize: 16 }}>
              Username
            </Typography>
            <TextField
              id="outlined-basic"
              size="small"
              variant="filled"
              fullWidth
              value={loginData.userName}
              onChange={(e) => handleUserName(e)}
            />
          </div>

          <div style={{
            width:'30vw',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            margin:'25px'
            
          }}>
            <Typography style={{margin:'10px', fontWeight: "900", fontSize: 16 }}>
              Password
            </Typography>
            <TextField
              id="outlined-basic"
              size="small"
              type="password"
              fullWidth
              variant="filled"
              value={loginData.passWord}
              onChange={(e) => handlePassWord(e)}
            />
          </div>

          <div style={{
            width:'30vw',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            margin:'25px'
          }}>
            <Button
              style={{
                width: "100%",
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
        </Card>
      </div>
    </div>
  </div>
  );
}
