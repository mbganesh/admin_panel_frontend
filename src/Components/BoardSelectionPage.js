import { Button, Card, Select , Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import useState from "react-usestateref";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BoardSelection() {
  const navigate = useNavigate()
  const [boardvalue, setboardvalue, ref] = useState("");

  const [mediumvalue, setmediumvalue, refmedium] = useState("");

  const [classvalue, setclassvalue, refclass] = useState("");

  const data = {
    board: ["State Board", "CBSE", "NCERT"],

    medium: ["Tamil Medium", "English Medium"],

    class: [
      "1st",
      "2nd",
      "3rd",
      "4th",
      "5th",
      "6th",
      "7th",
      "8th",
      "9th",
      "10th",
      "11th",
      "12th",
    ],
  };
  
  const handleSend = () => {
    let data = {
      board: ref.current,
      medium: refmedium.current,
      class: "class"+refclass.current,
    };

    if(data.medium === ''){
      let filledData = {
        board: ref.current,
        medium: 'English Medium',
        class: "class"+refclass.current,
      };
      navigate('/subjectpage' , {state : filledData})
    }else{
      navigate('/subjectpage' , {state : data})
    }

    // let data = {
    //   board: ref.current,
    //   medium: refmedium.current,
    //   class: refclass.current,
    // };

   

  };

  const handleChange = (e) => {
    setboardvalue(e.target.value);
    setmediumvalue("");
    setclassvalue("");
   
  };

 

  const handleChangeMedium = (e) => {
    setmediumvalue(e.target.value);
  };

  const handleChangeClass = (e) => {
    setclassvalue(e.target.value);
    };

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
          <Card style={{display:'flex',flexDirection:'column',justifyContent:'space-evenly',width:500,height:500,padding:20,border:'1px solid #1ea5fc',borderRadius:20}}  >
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
  
              <Select
                style={{ flex: 2 }}
                value={boardvalue}
                onChange={handleChange}
              >
                {data.board.map((text, index) => (
                  <MenuItem value={text}>{text}</MenuItem>
                ))}
              </Select>
            </div>
            <div
              style={{
                display:
                  ref.current === "CBSE" || ref.current === "NCERT" ? "none" : "",
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
                  Medium
                </Typography>
                <Select
                  disabled={ref.current === "State Board" ? false : true}
                  style={{ flex: 2 }}
                  value={mediumvalue}
                  onChange={handleChangeMedium}
                >
                  {data.medium.map((text, index) => (
                    <MenuItem value={ref.current === "State Board" ? text : ""}>
                      {" "}
                      {text}{" "}
                    </MenuItem>
                  ))}
                </Select>
              </div>
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
              <Select
                value={classvalue}
                disabled={
                  ref.current === "State Board" ||
                  ref.current === "CBSE" ||
                  ref.current === "NCERT"
                    ? false
                    : true
                }
                style={{ flex: 2 }}
                onChange={handleChangeClass}
              >
                {data.class.map((text, index) => (
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
