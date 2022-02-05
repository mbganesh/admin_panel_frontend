import React, { useEffect, useState } from "react";
import { Card, Typography, Button, TextField, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Helpers from "../Helpers";
import useStateRef from "react-usestateref";

export default function DeleteNow() {
 
  const [myList , setMyList , myListRef] =  useStateRef([])

  const [myObject , setMyObject , myObjectRef] =  useStateRef({
    num:'',
    text:''
  })


  const handleNum = (e) => {
    let str = e.target.value
    setMyObject({...myObject , num:str})    // num:str ==> let x = "ass"
  }

  const handleText = (e) => {
    let str = e.target.value
    setMyObject({...myObject , text:str})
  }

  const handleSave = () => {
    setMyList([...myList ,myObject])
    setMyObject({ num:'',
    text:''})
    console.log(myListRef.current);
  }


  return (
 
      <div>
        <h1>Test</h1>

        <TextField label="Num" value={myObject.num} onChange={handleNum} />
        <br/>
        <TextField label="Text" value={myObject.text} onChange={handleText} />
        <br/>
        <Button variant="contained" color="primary" onClick={() => handleSave()}> Save</Button>

        <div>
          {
            myListRef.current.map(data => (
              <Card style={{margin:'10px' , width:'250px' , backgroundColor:'orange'}}>
                <h3> {data.num} </h3>
                <h4> {data.text} </h4>
              </Card>
            ))
          }
        </div>
      </div>
 
  );
}
