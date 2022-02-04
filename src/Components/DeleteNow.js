import { AppBar, Button, TextField, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useStateRef from "react-usestateref";

export default function DeleteNow() {
  const [myList, setMyList] = useState([]);

  const [myText, setMyText, myTextRef] = useStateRef("");

  const [myBool, setMyBool] = useState(false);

  const handleText = (e) => {
    let text = e.target.value;
    setMyText(text);
    console.log(myTextRef.current);
    // const findName = myList.filter(el => el.first_name === myTextRef.current)

    const findName = myList.some(
      (listData) => listData.first_name === myTextRef.current
    );

    findName ? setMyBool(true) : setMyBool(false);

    // if(findName.length === 0){
    //     setMyBool(false)
    // }else{
    //     setMyBool(true)
    // }
  };

  useEffect(() => {
    axios.get("https://reqres.in/api/users?page=2").then((res) => {
      let myData = res.data["data"];
      console.log(myData);
      setMyList(myData);
    });
  }, []);

  return (
  <div>
      <AppBar position="static">
          <Toolbar>
              <Typography variant="h5" > System Task </Typography>
          </Toolbar>
      </AppBar>
  </div>
  );
}

{
  /* <TextField label="First Name" value={myText} onChange={handleText} />

    <div>
    
    {
        myBool ? 
        <h1>True</h1> :
        <h1> False </h1>
    }
    
    </div> */
}
