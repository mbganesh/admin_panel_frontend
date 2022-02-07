import React, { useEffect, useState } from "react";
import { Card, Typography, Button, TextField, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Helpers from "../Helpers";
import useStateRef from "react-usestateref";

export default function DeleteNow() {
 

  const handleText = (e) => {
    console.log(e.key);

    if(e.key === 'y' || e.key === 'Y'){
      alert('Yes!')
    }else if(e.key === 'n' || e.key === 'N'){
      alert('No?')
    }else if(e.key === 'Enter'){
      alert('Enter*')
    }
    
  }

  return (
 
      <div>
       <h5>Press :</h5>
       <small> Y for Yes or N for No</small>
       <TextField onKeyPress={handleText} />
      </div>
 
  );
}
