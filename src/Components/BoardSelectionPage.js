
import { Button, Card, Select , Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import useStateRef from "react-usestateref";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Helpers from "../Helpers";

function BoardSelection() {
  const [boardvalue, setboardvalue, ref] = useStateRef("");
  const [mediumvalue, setmediumvalue, refmedium] = useStateRef("");
  const [classvalue, setclassvalue, refclass] = useStateRef("");

  const navigate = useNavigate()
  const location = useLocation()

  const [data, setData , dataRef] = useStateRef(
    {
      "allBoard": [
        "State Board",
        "CBSE",
        "ICNERT"
    ],
    "allClass": [
        "class1th",
        "class2th",
        "class3th",
        "class4th",
        "class5th",
        "class6th",
        "class4th",
        "class5th",
        "class6th",
        "class7th",
        "class8th",
        "class9th",
        "class10th",
        "class11th",
        "class12th"
    ],
    "allMedium": [
        "Tamil Medium",
        "English Medium"
    ]
    }
  );

  /*
  {
      "allBoard": [
          "State Board",
          "CBSE",
          "ICNERT"
      ],
      "allClass": [
          "class1th",
          "class2th",
          "class3th",
          "class4th",
          "class5th",
          "class6th",
          "class4th",
          "class5th",
          "class6th",
          "class7th",
          "class8th",
          "class9th",
          "class10th",
          "class11th",
          "class12th"
      ],
      "allMedium": [
          "Tamil Medium",
          "English Medium"
      ]
  }
  */  

  const handleSend = () => {
    let data = {
      board: ref.current,
      medium: refmedium.current,
      class: refclass.current,
    };

    navigate('/subjectpage' , {state : data})
      
  };
  const handleChange = (e) => {
    setboardvalue(e.target.value);
  };
  const handleChangeMedium = (e) => {
    setmediumvalue(e.target.value);
  };
  const handleChangeClass = (e) => {
    setclassvalue(e.target.value);
  };

  const loadData = async () => {
    let prevData = location.state
    let result;
    await axios.post(Helpers().api + '/board_selection' , prevData).then(res => {
       result =  res.data
      console.log(result['message']);
   
    })
    // setData(result['message'])
  }

  useEffect(() => {
    // loadData()
  }, []);
  
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#D6E5FA",
        }}
      >
       <Card
          style={{
            width: 500,
            height: 500,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            paddingLeft: "50px",
            paddingRight: "50px",
            border: "2px solid #1ea5fc",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography style={{ flex: 1, fontWeight: "bold" }}>
              Board
            </Typography>
            <Select style={{ flex: 2 }} onChange={handleChange}>
              {dataRef.current.allBoard.map((text, index) => (
                <MenuItem value={text}>{text}</MenuItem>
              ))}
            </Select>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography style={{ flex: 1, fontWeight: "bold" }}>
              Medium
            </Typography>
            <Select style={{ flex: 2 }} onChange={handleChangeMedium}>
              {dataRef.current.allMedium.map((text, index) => (
                <MenuItem value={text}>{text}</MenuItem>
              ))}
            </Select>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography style={{ flex: 1, fontWeight: "bold" }}>
              Class
            </Typography>
            <Select style={{ flex: 2 }} onChange={handleChangeClass}>
              {dataRef.current.allClass.map((text, index) => (
                <MenuItem value={text}>{text}</MenuItem>
              ))}
            </Select>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              style={{ width: 100 }}
              onClick={() => handleSend()}
            >
              Next
            </Button>
          </div>
        </Card>    


      </div>
    </>
  );
}
export default BoardSelection;
