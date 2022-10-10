import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import {Navigate} from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Train from '../Imgs/Train1.jpg';
import { UseLocalEmailStorage } from '../util/UseLocalEmailStorage';
import { UseLocalPasswordStorage } from '../util/UseLocalPasswordStorage';
import { UseLocalState } from '../util/UseLocalStorage';
import Validator from '../Validator/Validator';
//import { UseLocalNameStorage } from '../util/UseLocalNameStorage';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Railway Reservation
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
/*function Emailandpasswordvalue(evt)
{
    const [{email,setEmail},{password,setPassword}]=useState(()=>{
         setEmail(evt.get(email));
         setPassword (evt.get(password));
    
    });

    return [email,password];
}*/

const theme = createTheme();
const Login = () => {
  
const[jwt,setjwt] =UseLocalState("","jwt");
const[email,setEmail]=UseLocalEmailStorage("","email");
const[password,setPassword]=UseLocalPasswordStorage("","password");
const [validator, showValidationMessage] = Validator();


  function sendreq () {
   
   if(!jwt)
   {
   const req={
    adminPassword:password,
    adminEmail: email,
  
  };
  fetch("admin/auth/signin",{
    headers: {
     // Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: "post",
    body: JSON.stringify(req),
  })
  //.then((response)=> response.json())
  //.then((data)=>console.log(data));
  .then((response) =>
  {if(response.status===200) 
  {
      return Promise.all([response.json(),response.headers])
  }
  else
  {
      return Promise.reject("Creditials are wrong");
  }})
  .then(([body,headers]) => {
    setjwt(headers.get("authorization"));
    window.location.href = "/admindashboard";
   
   }).catch((message)=>{alert(message)});
  }}
  
  const handleSubmit = (evt) => {
           
    if (validator.allValid()) {
      console.log("form submitted");
      evt.preventDefault();
      sendreq();
    } else {
      // validator.showMessages();
      // rerender to show messages for the first time
      showValidationMessage(true);
    }

  }
  
    return (
      
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Train})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LoginTwoToneIcon/>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="adminEmail"
                label="Email Address"
                name="adminEmail"
                autoComplete="email"
                onChange={e => setEmail(e.target.value)}
                autoFocus
              />
              <span style={{ color: "red" }}> 
                {validator.message("adminEmail", email, 
              [
              "required",
              {min:15},
              {max:20},
               {regex:"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,})+$"},

              ],
              {
            messages: {
            required: "Email is required",
            min:"The Email should be atleast fifteen character length",
            max:"The Email should be atmost twenty character length",
            regex:"It should be in format abc@gmail.com",
        
        },
        }
      )}</span> 
              <TextField
                margin="normal"
                fullWidth
                name="adminPassword"
                label="Password"
                type="password"
                id="adminPassword"
                onChange={e => setPassword(e.target.value)}
              />
<span style={{ color: "red" }}>
            {validator.message("adminPassword", password, 
              [
              "required",
              {min:8},
              {max:20},
              {regex:"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$)"},
             
              ],
              {
            messages: {
            required: "Password is required",
            min:"The Password should be atleast eight character length",
            max:"The Password should be atmost twenty character length",
            regex:"The password should contain at least one digit, at least one upper case alphabet,atleast one lower case alphabet, at least one special character and doesnot contain any white space.",
        
        },
        }
      )}</span>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Copyright sx={{ mt: 8 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;